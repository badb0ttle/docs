---
title: Docker 容器化交付
icon: 
order: 9
editLink: false
cover: 
category:
  - 知识点
tag:
  - Docker
  - Docker Compose
  - 后端开发
  - 容器化
---

# Docker 容器化交付

> 项目：AI Task Backend · Python 3.13 · 纯异步

一条 `docker compose up` 命令，五服务全启动。Docker 不只是打包工具——它改变了服务的启动顺序、网络拓扑、环境注入、持久化策略。本篇记录从零搭建 Docker 交付的每一步设计决策。

```text
User → POST /tasks → [API:8000] → [RabbitMQ] → [Worker] → Agent Loop
                              ↕          ↕            ↕
                         [PostgreSQL]  [Redis]    [LLM API]
```

## 1. 多阶段构建

多阶段构建的核心思想：把「构建依赖」和「运行时依赖」分开。

```dockerfile
# Stage 1: Build —— 安装 pip 包
FROM python:3.13-slim AS build
COPY pyproject.toml .
RUN pip install --user --no-cache-dir "fastapi>=0.115.0" ...

# Stage 2: Runtime —— 只要运行所需文件
FROM python:3.13-slim AS runtime
COPY --from=build /root/.local /root/.local  ← 只拷贝已安装的包
COPY app/ /app/app/
USER app  ← 非 root 用户降权
```

Build 阶段有 gcc 等编译工具，Runtime 阶段没有。镜像体积能从 800MB 砍到 250MB 左右。关键技巧：**先 COPY pyproject.toml 再 COPY app/**。如果顺序反了，每次改 `app/` 代码都会让 pip install 缓存失效，构建时间从秒级变成分钟级。

## 2. API 和 Worker 共用一个镜像

API（FastAPI HTTP 服务）和 Worker（RabbitMQ 消费者）跑的是同一个代码库，共享 `app/config.py`、`app/models.py` 等模块。为它们各写一个 Dockerfile 是浪费。

```yaml
# docker-compose.yml
api:
  build: .
  command: python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

worker:
  build: .
  command: python -m app.worker
```

同一个 `build: .` 构建一次镜像，两个容器的入口点不同。Docker Compose 会先构建镜像，然后为 api 和 worker 各启动一个容器——同一个镜像，不同的 `command`。

## 3. 健康检查与启动顺序

`depends_on` 只保证「容器启动了」，不保证「服务就绪」。PostgreSQL 容器启动后还要初始化数据目录，3-5 秒后才接受连接。

```yaml
api:
  depends_on:
    postgres:
      condition: service_healthy   ← 等 PG 的 healthcheck PASS
    redis:
      condition: service_healthy
    rabbitmq:
      condition: service_healthy
```

服务自带的健康检查命令：

| 服务 | 健康检查命令 |
|------|-------------|
| PostgreSQL | `pg_isready -U dev -d ai_tasks` |
| Redis | `redis-cli ping` |
| RabbitMQ | `rabbitmq-diagnostics check_port_connectivity` |
| API | `wget -qO- http://localhost:8000/health \| grep -q ok` |

时间参数设计：interval 10s / timeout 5s / retries 3 / start_period 15s——给慢启动的容器 15 秒缓冲，之后连续 3 次失败才标记 unhealthy。这样 RabbitMQ 初始化时间较长也不会被误判挂掉。

## 4. 环境变量注入策略

Docker Compose 有三种注入环境变量的方式，本项目用混合策略：

- **硬编码固定值**（数据库密码）：直接用 `environment:` 块——PostgreSQL 的密码是测试用，不需要每个开发者都设
- **从 `.env` 文件注入可变值**（LLM API Key）：用 `env_file: - .env`——`.env` 不在 Git 里，每个开发者有自己的

```
# .env.example（提交到 Git 的模板）
DATABASE_URL=postgresql+asyncpg://dev:devpass123@postgres:5432/ai_tasks
REDIS_URL=redis://redis:***@rabbitmq:5672/
```

`.env` 不提交 Git，已经在 `.gitignore` 里排除。每个开发者 `cp .env.example .env`，然后填入自己的 LLM_API_KEY。

## 5. 容器网络与服务发现

docker-compose 默认创建 bridge 网络，内置 DNS 解析。所有服务通过**容器名**互相访问：

```
postgres:5432     # api 容器里直接连
redis:6379        # worker 容器里直接连
rabbitmq:5672     # 不需要映射端口
```

这就是为什么 `config.py` 里数据库 URL 写的是 `@postgres:5432` 而不是 `@localhost:5432`。容器间通信不经过宿主机的端口映射——`ports: "5432:5432"` 只是给开发者终端提供入口。

## 6. 启动脚本与演示脚本

三个辅助脚本构成操作手册：

| 脚本 | 用途 |
|------|------|
| `scripts/start.sh` | 一键启动：检查 .env → 检查 Docker → 构建 → 启动 → 等待健康检查通过 |
| `scripts/demo.sh` | 演示验证：逐条 curl 请求展示系统状态 |
| `scripts/healthcheck.sh` | 最小健康检查：检测 API + 依赖 + 容器状态，exit code 非 0 即故障 |

`healthcheck.sh` 的 exit code 设计让它可以嵌入 CI/CD 管道：`bash scripts/healthcheck.sh && echo "部署成功"`。

## 核心决策复盘

回顾 Day 6 的每个技术决策，背后都有「如果不这样做会怎样」的考量：

**1. 为什么用 pip install 直接装而不是 poetry lock？**
项目依赖少（不到 10 个包），用 lock file 的收益不大。如果依赖增长到 20+，再引入 poetry/pip-tools。保持简单，按需加复杂度。

**2. 为什么用 slim 而不是 alpine？**
alpine 镜像更小（~5MB vs ~50MB），但它用 musl libc。asyncpg 等 C 扩展在 musl 上编译踩坑多。选 slim（Debian 基础）用几 MB 换稳定性，是经验教训。

**3. 为什么三个基础设施服务不用 docker compose 的 depends_on？**
基础设施之间没有依赖关系，可以并行启动。启动时间本来就够长的了，串行只会更慢。`depends_on` 是给有依赖的应用层服务用的。

**4. 为什么不在 Dockerfile 里写 HEALTHCHECK 指令？**
Dockerfile 的 HEALTHCHECK 会让 Docker daemon 自动重启不健康的容器。但我们的场景里，API 挂了更可能是配置问题而非进程问题——盲目重启解决不了问题。选择在 compose 层做健康检查，配合手动诊断。

这些决策没有哪一个绝对正确——每个都是在当前场景下的最优解。换一个项目（更复杂的依赖树、更严格的安全要求、更敏感的启动时间），答案都会不一样。Docker 教给开发者的核心能力，就是根据场景做选择，而不是记一条「最佳实践」。
