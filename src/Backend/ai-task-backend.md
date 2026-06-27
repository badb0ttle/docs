---
title: AI Task Backend 项目总结
icon: 
order: 10
editLink: false
cover: 
category:
  - 项目
tag:
  - 系统设计
  - 微服务
  - Docker
  - Agent
  - FastAPI
  - 后端开发
---

# AI Task Backend 项目总结

> 仓库：[badb0ttle/hjh-ai-lol](https://github.com/badb0ttle/hjh-ai-lol)
>
> 零依赖启动：`docker compose up -d`，一行命令拉起全部服务。

这是一个**完整可复现的 AI 任务后端系统**。用户提交一句自然语言描述的任务，系统异步执行：调 LLM 推理 → 自主选择工具 → 根据结果调整策略 → 每一步可追溯。

前端一行没写。这个项目的重点是——把一次 AI 请求做成可异步执行、可查询状态、可处理失败、可本地复现的后端系统。

---

## 六层架构

```text
  ┌────────────────────────────────────────────┐
  │  接入层    FastAPI + uvicorn               │
  │           POST /chat · /chat/stream · /tasks │
  ├────────────────────────────────────────────┤
  │  队列层    RabbitMQ + 死信队列             │
  │           消息持久化 + Manual ACK           │
  ├────────────────────────────────────────────┤
  │  消费层    Worker (独立进程)               │
  │           与 API 解耦，故障不互相影响        │
  ├────────────────────────────────────────────┤
  │  引擎层    Agent ReAct Loop                │
  │           LLM → Tool → LLM → Tool → ...    │
  ├────────────────────────────────────────────┤
  │  存储层    PostgreSQL + SQLAlchemy async   │
  │           tasks / steps / tool_calls 三表    │
  ├────────────────────────────────────────────┤
  │  缓存层    Redis                            │
  │           任务状态缓存 + SET NX 幂等        │
  └────────────────────────────────────────────┘
```

每一层的选择都有取舍理由：

**接入层 — FastAPI + uvicorn**

为什么不是 Flask、Django、Spring Boot？因为目标明确：异步原生（一条 CPU 周期都不浪费在 I/O 等待上）、SSE 原生支持（一行 `StreamingResponse` 搞定流式）、Pydantic 类型校验（输入校验零额外代码）。

**队列层 — RabbitMQ + aio-pika**

为什么不是 Redis Pub/Sub、Kafka？RabbitMQ 三个特性刚好匹配：消息持久化到磁盘（crash 不丢任务）、手动 ACK（处理完才确认，不是消费即确认）、死信队列（失败 3 次自动进 DLQ，不无限重试拖死系统）。Kafka 适合日志流不适合任务队列，Redis Pub/Sub 不持久化。

**消费层 — 独立 Worker 进程**

为什么不是 FastAPI 后台任务（`BackgroundTasks`）、Celery？独立进程与 API 进程隔离：API 崩溃不影响正在执行的 Agent，Worker 重启不影响新请求接入。Celery 太重（Redis 天然支持的任务队列不需要额外编排框架），且 Python 多进程模型在某些场景下有序列化限制。

**引擎层 — 自实现 Agent ReAct Loop**

为什么不用 LangChain、AutoGPT？LangChain 适合快速原型，但 Agent 行为由框架控制，不在你手里。自实现不到 200 行，每步推理→工具调用→状态写入→响应输出，逻辑完全透明。出了问题不用钻进框架源码。

**存储层 — PostgreSQL + SQLAlchemy 2.0 async**

全链路审计意味着 `tasks`、`steps`、`tool_calls` 几乎每天都在膨胀。PostgreSQL 的关系型强一致性保证不丢数据，async engine 避免阻塞事件循环，Alembic 做版本化迁移。

**缓存层 — Redis**

轻量、内存操作、单线程原子命令。`SET NX` 天然幂等键，`LPUSH + LTRIM` 做实时日志轮转。不存业务数据——Redis 是缓存不是主存储。

---

## 关键设计决策

### 1. Agent 核心脱离 HTTP 框架

整个项目最重要的架构决策：Agent 引擎**不依赖 FastAPI、不依赖 RabbitMQ、不依赖任何 Web 框架**。

```python
class AgentCore:
    def __init__(
        self,
        llm: LLMProvider,       # 接口，不是具体实现
        tools: dict,
        state: StateStore,       # 接口
        output: OutputChannel,   # 接口
    ): ...
```

三个接口隔离了全部外部依赖。测试时注入 Mock 即可，生产时注入真实实现。同一个 AgentCore 可以在命令行、Worker 进程、pytest、Jupyter Notebook 中无差别运行——不是改代码适配场景，而是换接口实现。

### 2. 双文件环境变量

`.env.dev`（宿主机调试）和 `docker-compose.yml` override（容器内自动注入）分离了开发和生产的环境变量。不在代码里写 `if DEBUG` 判断地址，容器内外自动走正确路径：

```text
宿主机: POSTGRES_URL=postgresql+asyncpg://...@localhost:5432/...
容器内: POSTGRES_URL=postgresql+asyncpg://...@postgres:5432/...
```

### 3. 工具安全不是可选项

`run_command` 工具有三层防护，不是"建议"，是"不满足即拒绝"：

- **命令白名单**：只允许 `cat`、`head`、`wc`、`ls` 等 17 个只读命令
- **路径限制**：所有操作限制在 `/app/data/` 目录，拒绝绝对路径和 `..`
- **语法拒绝**：管道、重定向、分号、反引号一律拒绝

`calculate` 用 AST 白名单求值，`__builtins__` 设为 `{}`。`fetch_url` 10 秒超时 + 2000 字符截断。深度防御，不是赌 LLM 不会越狱。

### 4. 三类用例一条队列

同步 `/chat`、流式 `/chat/stream`、异步 `/tasks` 共享同一个 RabbitMQ 队列。根据 `response_type` 字段路由，Worker 按不同模式处理。不维护三条独立队列——只有 CPU 资源差异，不需要战术上的复杂性。

### 5. 死信队列自动降级

RabbitMQ 消息 NACK 3 次后自动路由到死信队列（DLQ），而不是无限重试阻塞后续消息。DLQ 消息保留 7 天，可手动检查或重新投递。

### 6. 全链路审计

`tasks` / `steps` / `tool_calls` 三张表记录整个任务生命周期。从提交到最终回复，每一步 LLM 推理和工具调用、每一次重试和超时、每一个中间状态变更——全链路可回溯。

---

## 遇到的坑

### 端口冲突连环撞

`docker compose up` 失败不是一次，是四次：Redis 6379 被 Mac 本地 Redis 占用 → 清理后 RabbitMQ 5672 被旧容器占用 → 清理后 PostgreSQL 5432 被 `postgres-dev` 容器占用 → 清理后 API 8000 被 `backend` 容器占用。

问题不在 Docker Compose 本身——`docker compose down` 只清理当前 compose 项目的容器。本机旧残留来自其他项目，需要手动 `docker stop/rm`。一朝没清干净，启动就撞车。教训：项目间的容器命名不要共用前缀。

### 脱敏陷阱

配置文件用 `[REDACTED]` 占位不是「懒得填」。Docker Compose 的环境变量会注入容器，配置写在文件里，读取后又写入其他地方——工具可能显示脱敏后的缓存内容，实际磁盘上已经是字面 `[REDACTED]`。需要用 `xxd` 做十六进制验证才能确认真实内容。

### 镜像过时问题

`docker cp` 把修复拷贝进容器 → 改完验证通过 → `docker compose down && up -d` → 问题复现。

原因：`down` 删容器，`up` 用旧的**镜像**重建。修复进了容器但没进镜像。正确流程是 `docker compose build --no-cache && up -d`，或用 volume 挂载源码目录做热更新。

---

## 三条请求路线

| 路线 | 接口 | 延迟 | 场景 |
|------|------|------|------|
| 同步 | `POST /chat` | 1-5s | 简单问答 |
| 流式 | `POST /chat/stream` | 流式输出 | 长文生成 |
| 异步任务 | `POST /tasks` | 30-120s | 多步工具调用 |

异步任务是核心：用户提交任务，Worker 接管执行，Agent 决定用哪些工具、按什么顺序——用户通过 `GET /tasks/{id}` 轮询进度和步骤记录。

---

## 可复现交付

```bash
git clone https://github.com/badb0ttle/hjh-ai-lol
cd hjh-ai-lol
cp .env.example .env.dev     # 填入 LLM_API_KEY
docker compose up -d          # 5 个容器启动
curl http://localhost:8000/health  # → {"status":"ok"}
```

一行 `docker compose up -d`，不需要装 Python、PostgreSQL、Redis、RabbitMQ。全部基础设施在容器里。

---

## 代码统计

| 组件 | 行数 | 职责 |
|------|------|------|
| `app/main.py` | ~280 | API 路由 + SSE 流式 |
| `app/agent_core.py` | ~250 | Agent ReAct 循环 + 工具定义 |
| `app/config.py` | ~60 | 环境变量 + Settings |
| `app/model.py` | ~85 | SQLAlchemy 模型 + 关系 |
| `app/db.py` | ~20 | async engine + session |
| `app/rabbitmq.py` | ~80 | 队列连接 + 消息发布 |
| `app/worker.py` | ~100 | 消息消费 + 状态管理 |
| `docker-compose.yml` | ~100 | 5 服务编排 |
| `Dockerfile` | ~30 | 多阶段构建 |
| **总计** | **~1000** | |

不到 1000 行代码实现了完整的六层异步任务系统。每一行都有它存在的理由。

---

## 文档

项目仓库包含：

- `README.md` — 项目定位、架构图、技术栈、工具清单、API 端点
- `docs/` — 架构说明、简化选择、生产化补齐路线
- `data/demo.txt` — 演示用文件（工具调用展示）
- `.env.example` — 环境变量模板

---

## 后续方向

当前版本是**完整可用的纯 API 后端**。可以继续补齐的方向包括：

- **认证** — JWT/OAuth2 鉴权，多租户隔离
- **速率限制** — per-user token bucket（Redis）
- **工具扩展** — 搜索引擎 API、代码执行沙箱、数据库查询
- **可观测性** — Prometheus 指标 + Grafana Dashboard
- **多语言工具** — i18n Tool Description 模板
- **优先级调度** — 多队列 + TTL 优先级
- **WebSocket 推送** — 替换轮询模式的进度通知

每一项都对应一个明确的生产级问题，而不是"为了做而做"。
