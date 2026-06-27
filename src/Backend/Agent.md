---
title: Agent 服务化与工具调用
icon: 
order: 8
editLink: false
cover: 
timeline: false
category:
  - 知识点
tag:
  - Agent
  - 工具调用
  - 后端开发
  - LLM
---

# Agent 服务化与工具调用

> 项目：AI Task Backend · Python 3.13 · 纯异步

一个让用户可以提交任意任务的后端系统，核心是 **Agent 循环**。Agent 与 Chatbot 和 Workflow 的本质区别在于：谁来决定下一步。Agent 把这个决策权交给了模型——模型在运行时推理、选择工具、根据结果调整策略。前四天所学的基础设施（FastAPI、RabbitMQ、PostgreSQL、Redis）全部服务于这个循环。

```text
                User Input
                    │
        ┌───────────▼───────────┐
        │  Agent Loop (核心)     │
        │                       │
        │  Model Call ◄─────────┤
        │     │                 │
        │     ├─ text ──────► Response
        │     │                 │
        │     └─ tool_call ──► Execute Tool
        │           │           │
        │           └── result ─┘
        │           (back to Model Call)
        └───────────────────────┘
```

## Chatbot、Workflow、Agent 的边界

三个概念经常被混淆。用「**能不能自己决定下一步**」作为分界线：

| 维度 | Chatbot | Workflow | Agent |
|------|---------|----------|-------|
| 决策者 | 无决策 | 开发者（代码） | 模型（runtime） |
| 流程控制 | 单次调用 | 预定义 DAG | 动态推理 |
| 工具调用 | 无 | 固定工具 + 固定顺序 | 模型选工具 + 动态顺序 |
| 可预测性 | 极高 | 高 | 中（取决于模型） |
| 扩展性 | 低 | 低（新增步骤需改代码） | 高（加工具即可） |

**Chatbot** 是最简单形态：用户提问 → 模型回答。无状态、无工具、无循环。适合问答、翻译等单轮任务。

**Workflow** 的步骤顺序在代码中写死。比如「搜索 → 总结 → 翻译」，路由靠 `if/switch` 不靠模型推理。适合内容聚合、ETL、审批流等路径确定的任务。

**Agent** 的每一步都由模型决定：搜什么、用哪个工具、结果不满意要不要换关键词重搜——这些决策在运行时发生。Agent 和 Workflow 之间的那条「再搜一次」的路，在 Workflow 里需要改代码，在 Agent 里模型自己推理出来就执行了。

AI Task Backend 的定位是 **Agent**。用户提交的任务是开放的（「帮我查 XX 然后总结」），路径不可预知。同时保留 Workflow 入口——对已知路径的高频任务，用固定流程更快更稳定：

```text
POST /tasks         → Agent 模式（默认）
POST /workflows/{name}  → Workflow 模式（预定义模板）
```

## 固定流程 vs 动态 Agent — 何时用哪个

按三个条件判断：

**条件 1: 步骤顺序是否确定？**
- YES → Workflow。`if/else` 就能路由，不需要模型推理。
- NO → Agent。

**条件 2: 失败后的分支是否确定？**
- YES → Workflow。搜索失败直接返回错误。
- NO → Agent。搜索失败后模型决定「换关键词重试」或「用其他工具」。

**条件 3: 工具的组合方式是否只有 1~2 种？**
- YES → Workflow。路径永远不变。
- NO → Agent。搜索 → 读网页 → 发现需要代码 → 写代码 → 执行 → 分析结果——这种多工具动态组合只有 Agent 能做到。

额外判断：延迟敏感 + 路径确定 → Workflow，无模型推理开销；需要可审计 → Workflow + Agent fallback；用户意图开放不可预知 → Agent。

## 工具描述、参数 schema、结果与错误返回

Agent 的工具不是随便写的函数。模型需要知道：工具有什么功能、需要什么参数、成功后返回什么、失败时怎么告诉它。本节定义一套兼容 OpenAI function calling 的工具协议。

### 工具定义

```python
@dataclass
class ToolParam:
    name: str
    type: str          # "string" | "number" | "integer" | "boolean"
    description: str
    required: bool = True
    enum: list[str] | None = None

@dataclass
class ToolDefinition:
    name: str
    description: str
    parameters: list[ToolParam]
```

`to_openai_schema()` 和 `to_anthropic_schema()` 方法分别输出两种模型的工具格式——定义一次，多模型复用。

**关键原则：description 写得不够好，模型就会用错工具或不用。** 描述要告诉模型这个工具「做什么」和「什么时候该用」：

```text
✓ "Search the web for current information. Use when you need
   real-time data or facts you don't already know."
✗ "Search tool"
```

### 工具结果

工具执行后的返回值不能只是一个裸 JSON。模型需要结构化的信息来推理下一步。统一返回格式 `ToolResult`：

```python
@dataclass
class ToolResult:
    tool_name: str
    status: ToolResultStatus  # success | error | timeout | permission_denied
    data: Any | None
    error: str | None
    execution_time_ms: float
```

成功时告诉模型结果内容；失败时告诉模型为什么失败，让它能推理补救方案：

```json
{
    "status": "error",
    "tool": "web_search",
    "error": "Connection refused to search API",
    "suggestion": "检查网络连接或换用备用搜索 API"
}
```

### 错误返回的黄金法则

1. **不要只返回 "Error"**：模型看不懂，下一次调用还是一样出错
2. **告诉模型「为什么」失败**：参数错误 → 修正参数；超时 → 缩小范围；权限不足 → 告知用户
3. **统一错误格式**：不要每个工具自己定义，用 `ToolResult` 统一
4. **区分可重试和不可重试**：超时/网络错误/API 限流可重试；参数校验失败/权限不足不可重试
5. **错误返回到 conversation history**：模型需要「看到」错误，下一次推理时才能调整

### 工具注册表

`ToolRegistry` 管理所有可用工具，提供：
- `get_all_schemas()` — 给模型的工具列表
- `execute(tool_name, **args)` — 执行工具，带超时控制和重试

## Agent Run、Step、Tool Call 的记录方式

Agent 执行必须可审计。如果用户问「为什么调了 8 次搜索？为什么结果不对？」你需要能回溯每一步。

### 三层记录模型

```text
AgentRunRecord (1) ──→ AgentStepRecord (N) ──→ ToolCallRecord (0~1 per step)
  tasks 表              steps 表                 tool_calls 表
```

**ToolCallRecord**（最细粒度）：工具名称、参数、结果/错误、状态、开始/结束时间戳、重试次数。

**AgentStepRecord**（中层）：步序号、模型的 thought、关联的 ToolCallRecord（如有）、最终 response、模型调用次数。

**AgentRunRecord**（顶层）：用户输入、状态、所有步骤、最终回复、token/费用统计、时间戳。

### 状态枚举

每一步都有明确状态：`RunStatus` 有 queued → running → completed/failed/cancelled/max_steps/timeout。`StepStatus` 有 running → completed/failed。`ToolCallStatus` 有 pending → executing → success/error/timeout。

### 存储策略（混合模式）

1. **运行时状态 → Redis**：`task:{id}:state` 存进度和 heartbeat，`task:{id}:steps` 存最近 50 条步骤（`LPUSH` + `LTRIM`）
2. **每步记录 → 内存 list**
3. **任务结束 → 批量 INSERT DB**：写 steps 表和 tool_calls 表
4. **关键检查点（每 5 步）→ 强制 flush DB**：防止 crash 丢记录

## 最大循环次数、超时、重试、降级和终止条件

Agent 是「自主」的——但绝不能是「失控」的。5 道护栏确保执行永远在可控范围。

### 护栏配置

```python
@dataclass
class GuardrailConfig:
    max_steps: int = 20               # 最多 20 步
    step_timeout_seconds: float = 60   # 单步最多 60 秒
    run_timeout_seconds: float = 300   # 整体最多 5 分钟
    max_retries_per_tool: int = 2      # 每个工具最多重试 2 次
    max_consecutive_errors: int = 3    # 连续 3 次错误 → 强制终止
```

每一步执行前调用 `check_before_step()` 检查：步数上限 → 整体超时 → 连续错误计数 → 取消信号。任一触发即返回 `TerminationResult`，终止循环。

### 五种终止方式

按宽松 → 严格排序：

1. **正常完成**：模型输出文本，对话自然结束
2. **用户取消**：工人检测 Redis 取消标志或接收取消信号
3. **最大步数**：Agent 陷入工具循环，`max_steps` 兜底
4. **连续错误**：连续 3 次工具调用都失败，继续执行不会好转
5. **整体超时**：任务跑满 5 分钟未结束

生产中还要加上系统级保障：Docker/K8s 的 `terminationGracePeriodSeconds`，SIGTERM → 优雅停止 → SIGKILL 强制杀。

### 重试策略

不是所有错误都值得重试：

总结：可重试 — 网络超时、API 限流、服务暂时不可用；不可重试 — 参数校验失败、权限不足、资源不存在、业务逻辑错误。重试采用指数退避 + 抖动：等待 `base_delay × 2^N + random(0, 1)s`。

### 工具降级

当工具不可用时，降级策略保证 Agent 不完全卡死：

- `FAIL_FAST`：直接报错（默认）
- `CACHED_RESULT`：返回上次缓存结果
- `ALTERNATIVE_TOOL`：换一个功能相近的备用工具
- `SKIP`：跳过此工具，告知模型
- `RETRY_ONLY`：只重试不降级

降级策略**不隐藏给模型**：模型需要知道「我用的是备用工具」，以便在结果质量不够时做出正确判断。

## 模型调用、工具调用、状态写入和响应输出之间的执行顺序

Agent 循环的单步有严格不可调换的四阶段流水线：

```text
Phase 1: MODEL_CALL  →  Phase 2: TOOL_CALL  →  Phase 3: STATE_WRITE  →  Phase 4: RESPONSE_OUT
```

### Phase 1: MODEL_CALL

输入 messages + tools schema，输出 `text` 或 `tool_call`。失败则记录错误，超出重试上限后终止。如果输出是 `text`，跳过 Phase 2 直接到 Phase 3。

### Phase 2: TOOL_CALL

执行工具，带超时控制（`asyncio.timeout`）+ 重试 + 降级。结果追加到 messages 中——让模型在下一轮推理中看到。工具失败不等于 Agent 失败：模型看到「搜索超时了」后决定「换短查询重试」，这正是 Agent 优于 Workflow 的弹性。

### Phase 3: STATE_WRITE

- **Redis**：更新实时状态 `task:{id}:state`，追加步骤日志 `task:{id}:steps`
- **DB**：每 5 步批量写 steps + tool_calls 表，任务结束强制 flush

Redis 写入失败不阻塞（告警即可）；DB 写入失败重试 3 次，仍失败写本地 fallback 日志。

### Phase 4: RESPONSE_OUT

中间步骤推 SSE 进度事件，最终步骤推 `final` 事件并关闭流。SSE 推送失败不阻塞——客户端可轮询 `GET /tasks/{id}/status` 重新获取。

### 为什么这个顺序不能改

- **STATE_WRITE 放 MODEL_CALL 之前？** — 还没拿到模型输出，不知道写什么
- **RESPONSE_OUT 放 STATE_WRITE 之前？** — 用户看到完成但 DB 写入失败，数据丢了
- **TOOL_CALL 放 MODEL_CALL 之前？** — 还没推理就执行，Workflow 可以，Agent 不行

正确顺序保证：必须先推理再执行（模型是大脑，工具是手）；必须先执行再记录（记录真实发生的事）；必须先记录再通知（用户看到的状态永远 ≤ 真实状态）。

### 失败场景处理

失败处理遵循一个原则：每一阶段的失败不影响已完成的阶段，也不阻止后续阶段继续（除非是致命错误）。

**MODEL_CALL 失败**：重试后仍失败 → 终止 run，通知用户。**TOOL_CALL 失败**：错误追加到 messages，让模型推理下一步，连续错误超阈值才终止。**STATE_WRITE 失败**：Redis 失败不阻塞；DB 失败重试后写本地日志。**RESPONSE_OUT 失败**：不阻塞，客户端轮询恢复。

## 核心逻辑脱离 HTTP 层独立运行

这是整个架构最关键的设计决策：**Agent 核心不依赖 FastAPI、不依赖 RabbitMQ、不依赖任何 Web 框架。** 它是一个纯异步的可执行单元，通过依赖注入接入外部系统。

### 接口抽象

```python
class LLMProvider(ABC):
    async def chat(messages, tools) -> dict: ...

class StateStore(ABC):
    async def set_task_state(task_id, state) -> None: ...
    async def get_task_state(task_id) -> dict: ...

class OutputChannel(ABC):
    async def send_progress(task_id, step_no, action) -> None: ...
    async def send_final(task_id, response) -> None: ...
```

AgentCore 只依赖这三个接口。生产和测试只需换注入的实现：

```python
# 开发/测试 — 内存实现
agent = AgentCore(
    llm=MockLLMProvider([...]),
    state=InMemoryStateStore(),
    output=PrintOutputChannel(),
    tools={"search_web": mock_fn},
)

# 生产 — 真实实现
agent = AgentCore(
    llm=OpenAIProvider(api_key="...", model="gpt-4"),
    state=RedisStateStore(redis_url="..."),
    output=SSEOutputChannel(sse_manager),
    tools=real_tools,
)
```

### 复用场景

无需改任何代码，AgentCore 可以在这些场景复用：

- **命令行调试**：`python3 06_agent_core.py`，快速验证循环逻辑
- **Worker 进程 + MQ**：`result = await agent.run(msg["user_input"], task_id=msg["task_id"])`
- **pytest 单元测试**：Mock 所有依赖，验证 max_steps/error handling/cancel 逻辑
- **Jupyter Notebook**：交互式调试验证单步推理
- **批量评测**：遍历 benchmark 数据集，逐个 `agent.run()`

关键设计原则：Agent 核心是一个「库」，不是一个「服务」。FastAPI 是接收请求的适配器，RabbitMQ 是分发任务的传输层，Agent 核心才是真正执行任务的引擎。

## 小结

Day 5 是整个 AI Task Backend 项目的核心——Agent 循环的工程化实现。从 Chatbot/Workflow/Agent 的边界出发，到工具协议、记录方式、护栏机制、执行顺序，最后落到核心逻辑的独立性和可复用性。Day 6 和 Day 7 将把这些碎片组装起来，接入 Docker Compose，形成完整的交付产物。
