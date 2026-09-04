---
title: AIGun AI 项目全景
icon: sitemap
order: 1
editLink: false
category:
  - 项目
  - AI
tag:
  - Python
  - 微服务
  - DAG
  - FastAPI
  - Kafka
  - Redis
---

# AIGun AI 项目全景

## 背景

AIGun AI 是一个处理社交媒体情报的 Python AI 微服务系统。它需要把一条情报拆成多个可独立演进的步骤：识别情报、查找标的、过滤候选、调用 Agent 分析，再把结果回传给上层产品。单体函数很难同时满足异步处理、可扩展、可追踪和故障隔离，因此系统采用 Monorepo 管理多个 FastAPI API 与 Worker，并用 DAG 和消息队列连接各个节点。

## 技术栈

| 层次 | 技术与职责 |
| --- | --- |
| API | FastAPI，提供任务、配置和调试接口 |
| 编排 | DAG 状态机，保存节点依赖与上下文 |
| 消息 | Kafka 为默认通道，同时兼容 RabbitMQ |
| Worker | 独立消费节点消息，执行 Handler 并发送回调 |
| 数据 | PostgreSQL、SQLAlchemy 2.x 异步会话、Pydantic 模型 |
| 缓存与状态 | Redis，用于幂等租约、任务状态和短期上下文 |
| AI 能力 | Agno Agent、工具调用、结构化输出、模型降级 |
| 观测 | Langfuse Trace、Prometheus 指标、阿里云 ARMS 告警、结构化日志 |

## 一条请求如何流动

```text
用户情报
   │
   ▼
API / DAG Engine ──创建任务与节点上下文──▶ Kafka / RabbitMQ
                                              │
                                              ▼
                                         Worker Consumer
                                              │
                                  解析 NodeMessage、幂等检查
                                              │
                                              ▼
                                          Node Handler
                                              │
                           查询数据库 / 调用工具 / 调用 LLM
                                              │
                                              ▼
                                   NodeCallbackMessage
                                              │
                                              ▼
                           DAG 合并结果、路由后续节点、展示
```

DAG 上下文是节点之间的共享数据载体。例如原始情报放在 `origin`，关键词命中结果、语义分析结果和代币过滤结果分别以节点 slug 为 key 写入 `context`。这样每个 Handler 只关心自己的输入和输出，不需要直接依赖其他 Handler 的内部实现。

## 三类节点

- `RuleNode`：执行相对稳定的投资逻辑规则。
- `CustomNode`：承载代币搜索、语义分析等定制业务处理。
- `ExclusiveGatewayNode`：根据条件选择下一条路径，不直接产生业务结果。

节点统一接收 `NodeMessage`，其中包含 `task_id`、`message_id`、节点标识、上下文、超时和重试信息；处理结束后返回 `NodeCallbackMessage`，携带状态、结果、后置动作和耗时。统一契约让消息可以在 Kafka 与 RabbitMQ 之间切换，也让 Trace、重试和监控有稳定的关联字段。

## 我在项目中的理解

刚接触项目时，我先从 README、架构文档和 DAG 流程图建立全局模型，再沿“语义输出 → 候选查询 → 过滤 → 最终优化 → 展示”的链路阅读代码。这个过程让我认识到，AI 系统的难点不只是模型调用，而是把模型输出放进一条可验证、可恢复、可观测的工程链路中：

1. 输入和输出必须有明确的数据模型。
2. 节点之间要通过稳定的消息契约解耦。
3. 每一次执行都需要有 Trace、日志和指标可以回溯。
4. 失败、超时、重复消费和模型不稳定都要有兜底策略。

## 小结

AIGun AI 的核心不是某一个模型或某一个接口，而是 DAG、消息队列、异步数据库、Agent 和观测系统共同组成的工程化平台。理解这张全景图后，后续排查一个“没有输出代币”或“结果展示不一致”的问题，才能知道应该检查哪个节点、哪份上下文以及哪条证据。
