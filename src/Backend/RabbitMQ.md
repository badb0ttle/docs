---
title: RabbitMQ消息队列
icon: 
order: 5
editLink: false
cover: 
timeline: false
category:
  - 知识点
tag:
  - 消息队列
  - 后端开发
  - 异步架构
---

# RabbitMQ 消息队列

> 环境：Docker `rabbitmq:3-management` + `aio-pika` 9.6.2 · Python 3.13

后端收到一个 AI 任务请求（比如代码审查），不能一直阻塞等结果——任务可能跑几分钟。消息队列把"接收请求"和"处理任务"解耦：

```text
HTTP POST /tasks  ──→  RabbitMQ  ──→  Worker 异步处理
     ↑                                     │
 立即返回 task_id                   更新状态到 Redis/DB
```

用户拿到 `task_id` 后可以通过轮询或 SSE 查询进度。这就是 **任务投递-异步执行-进度查询** 的经典模式。

## Producer, Exchange, Queue, Routing Key. Consumer

### 核心架构

```text
Producer ──→  Exchange  ──binding/routing_key──→  Queue  ──→  Consumer
              (交换机)                              (队列)       (消费者)
```

| 概念 | 作用 | 类比 |
|---|---|---|
| **Producer** | 发送消息的一方 | 寄件人 |
| **Exchange** | 消息的"路由器"，不存消息，只负责转发 | 快递分拣中心 |
| **Queue** | 消息的"缓冲区"，存储待消费的消息 | 快递柜 |
| **Binding** | Exchange 到 Queue 的连接，通过 routing_key 匹配 | 分拣规则 |
| **Routing Key** | 生产者发消息时指定，Exchange 用它决定投递到哪个 Queue | 快递单上的地址 |
| **Consumer** | 消费消息的一方 | 收件人 |

### Exchange 类型

| 类型 | 路由逻辑 | 类比 |
|---|---|---|
| **Direct** | routing_key 精确匹配 queue 的 binding key | 精准投递 |
| **Topic** | routing_key 支持 `*`（匹配一个词）和 `#`（匹配零或多个词） | 按主题订阅 |
| **Fanout** | 忽略 routing_key，广播给所有绑定的 queue | 大喇叭广播 |

### 声明交换机、队列、绑定

```python
# 声明交换机
exchange = await channel.declare_exchange(
    "tasks.exchange",
    aio_pika.ExchangeType.DIRECT,
    durable=True,
)

# 声明队列
queue = await channel.declare_queue(
    "tasks.high",
    durable=True,
)

# 绑定：通过 routing_key 连接 Exchange → Queue
await queue.bind(exchange, routing_key="high")
```

| 方法 | 返回值 | 说明 |
|---|---|---|
| `declare_exchange()` | Exchange 对象 | 如果已存在同名且参数相同则复用，否则报错 |
| `declare_queue()` | Queue 对象 | 同上 |
| `queue.bind(exchange, routing_key)` | None | 建立路由规则 |

> ⚠ 声明是幂等的——同名同参数不会重复创建，但参数不同会报错。这保证了基础设施的确定性。

### Consumer 消费流程

```text
consume message → parse JSON → process_task (3 steps) → update store → ack
```

每步更新 `status` 和 `progress`，添加 `events` 供 SSE 推送。

## Ack, Nack, Reject, Retry. Dead Letter Queue

### 消息确认机制（ACK / NACK）

RabbitMQ 默认是 **自动确认**——消息发出就删，不关心消费者是否处理成功。生产环境必须用 **手动确认**（manual ack），只有消费者说"我处理完了"才删除消息。

```python
# 手动确认（消费成功） —— with 块自动 ack
async with message.process():
    data = json.loads(message.body)
    await do_work(data)
    # 退出 with 块 → 自动 ack，消息从队列删除
```

### ACK / NACK / Reject 对比

| 操作 | 含义 | 消息去向 |
|---|---|---|
| `message.ack()` | 处理成功，可以删除 | 从队列移除 |
| `message.nack(requeue=True)` | 处理失败，放回去重试 | 重新入队，立即被再次消费 |
| `message.nack(requeue=False)` | 处理失败，丢弃 | 从队列移除（或进入 DLX） |
| `message.reject(requeue=False)` | 同 nack(requeue=False) | 同上（reject 只能拒绝单条） |

> ❌ 关键教训：`nack(requeue=True)` 不加限制 = 死循环。消息退回队列 → 立即又被消费 → 又 nack → 又退回 → 无限循环。**解决：要么加 DLX（死信交换机），要么加 max_retries 后 nack(requeue=False)。**

### 消息持久化（Durability）

```python
# 队列持久化
queue = await channel.declare_queue("myqueue", durable=True)

# 消息持久化
message = aio_pika.Message(
    body=data,
    delivery_mode=aio_pika.DeliveryMode.PERSISTENT  # 2 = 持久化
)
```

> ⚠ 两者必须**同时设置**才有意义：只设 queue durable → 队列不丢，但消息（非持久化）重启后会消失。只设 message persistent → 队列不持久化的话，队列都没了谈何消息。

### 死信交换机（DLX — Dead Letter Exchange）

当消息在队列中"死掉"时（被 nack/reject 且不 requeue，或消息过期，或队列满了），可以自动转发到一个**专门的死信交换机**，然后进入**死信队列**。

#### 为什么需要 DLX？

| 场景 | 不加 DLX | 加了 DLX |
|---|---|---|
| 消费失败 | 消息直接消失，无处追踪 | 自动进入死信队列，可排查 |
| 队列溢出 | 消息被丢弃 | 溢出的消息进 DLX |
| 消息过期（TTL） | 过期即消失 | 过期后进 DLX |

#### 队列参数（arguments / x-arguments）

| 参数名 | 作用 | 典型场景 |
|---|---|---|
| `x-message-ttl` | 设置队列中消息的生存时间（毫秒） | 临时性通知、自动清理陈旧任务 |
| `x-max-length` | 限制队列中的最大消息条数 | 防止队列无限增长 |
| `x-dead-letter-exchange` | 指定死信交换机 | 处理消费失败的消息、延迟重试 |
| `x-queue-type` | 指定队列类型（quorum / stream） | 核心业务需要更高可靠性 |
| `x-max-priority` | 开启消息优先级支持 | 紧急任务优先处理 |

#### 配置方式

```python
# 在声明主队列时指定 DLX
args = {
    "x-dead-letter-exchange": "tasks.dlx",
    "x-dead-letter-routing-key": "dead",
}
queue = await channel.declare_queue(
    "tasks.main",
    durable=True,
    arguments=args,
)

# 声明 DLX 和死信队列
dlx = await channel.declare_exchange("tasks.dlx", ExchangeType.DIRECT, durable=True)
dead_q = await channel.declare_queue("tasks.dead", durable=True)
await dead_q.bind(dlx, routing_key="dead")
```

消息被 NACK 后自动出现在死信队列里，头信息包含 `x-death`（原队列、失败原因等）。

### 指数退避重试

不要失败后立即重试——可能下游还在故障中。逐次延长等待时间：

```text
第 1 次失败 → 等 2s  → 重试
第 2 次失败 → 等 4s  → 重试
第 3 次失败 → 等 8s  → 重试
超过最大次数 → nack(requeue=False) → DLX
```

实现方式：不直接 requeue，而是 publish 到**延迟队列**（`delay-2s`、`delay-4s`、`delay-8s`），由 TTL 过期后自动转入主队列重试。

## 消息重复投递、消费失败、消息堆积、消费者重启

### 1. 消息重复投递

**是什么：** 同一条消息被 RabbitMQ 发送给消费者不止一次。

**为什么发生：** 由"确认机制"的网络延迟或超时引起。消费者处理完消息正准备发 ACK，但网络闪断，RabbitMQ 没收到 ACK → 认为消息未被消费 → 重新投递给另一个消费者。

**核心应对策略：幂等消费。** 消息中携带全局唯一的 `message_id`，消费者根据此 ID 进行去重。

### 2. 消费失败

**是什么：** 消费者接收到消息，但在处理业务逻辑时抛出了异常。

**为什么发生：** 下游系统不稳定、数据格式错误、代码逻辑 Bug 等。

**分情况处理：**

| 错误类型 | 示例 | 处理方式 |
|---|---|---|
| 可重试 | 网络超时、DB 连接失败 | `nack(requeue=True)` + 指数退避 |
| 不可重试 | 数据格式错误、业务校验不通过 | `nack(requeue=False)` → 转入 DLX |

### 3. 消息堆积

**是什么：** 队列中积压了大量未处理的消息，生产速度远大于消费速度。

**为什么发生：**
- 消费者能力不足（处理速度慢，或实例太少）
- 消费者"罢工"（因 Bug 或异常而停止，但未正确关闭连接）
- 消息阻塞（某条消息处理极慢，阻塞了后续消息的消费）

**核心应对策略：**
- **增加消费者实例**（水平扩容），或提升单机处理性能
- **设置队列长度限制** (`x-max-length`)，防止无限制堆积
- **监控与告警**：设置队列长度/消费延迟告警
- **优化消费者逻辑**：将耗时任务异步化，避免阻塞

### 4. 消费者重启

**是什么：** 消费者进程因发布新版本、机器故障或内存溢出被关闭，随后重启恢复。

**核心应对策略：**

- **优雅关闭**：进程被 Kill 前主动关闭 Channel/Connection，让 RabbitMQ 知道消费者已下线 → 消息重新分配给其他消费者
- **自动恢复**：利用 `aio_pika.connect_robust()` 自动恢复 Channel 和 Queue 的消费状态
- **确保幂等**：消费者重启后可能会收到已处理但未确认的消息

### 消费者崩溃 → 消息重新投递（实战验证）

这是 **at-least-once 语义的根本原因**。消费者拿到消息、还没来得及 ack 就挂了——RabbitMQ 检测到连接断开，把消息重新入队，投递给下一个消费者。

```python
# 消费者 A：拿消息但不 ack，直接关闭连接（模拟崩溃）
crash_conn = await aio_pika.connect_robust(AMQP_URL)
crash_ch = await crash_conn.channel()
crash_q = await crash_ch.declare_queue("tasks.crash_test", durable=True, passive=True)

async def crash_handler(message: aio_pika.IncomingMessage):
    data = json.loads(message.body)
    print(f"Received msg{data['id']} — but CRASHING before ack!")
    await crash_conn.close()  # 不 ack，直接断开

await crash_q.consume(crash_handler)
# → 连接断开 → RabbitMQ 把消息 requeue → 重新投递

# 消费者 B：正常消费，能收到被 requeue 的消息
normal_conn = await aio_pika.connect_robust(AMQP_URL)
# ... 正常消费 → ack → 成功恢复
```

关键认知：
- RabbitMQ **不保证** exactly-once，只保证 at-least-once
- 消费者可能在处理完消息后、ack 之前崩溃
- **解决方案在消费者端：必须幂等消费**

### prefetch_count 与公平调度

控制每个消费者一次从队列拿多少条消息：

| 设置 | 行为 | 适用场景 |
|---|---|---|
| `prefetch_count=1` | 轮询公平分发，处理完一条再拿一条 | 多消费者均摊负载 |
| `prefetch_count=10` | 快的消费者拿得多，慢的拿得少 | 消费者处理速度差异大时让能者多劳 |

```python
# 公平分发：两个消费者，一个快（0.05s）一个慢（0.3s）
await channel.set_qos(prefetch_count=1)
# 结果：快消费者 ~3 条，慢消费者 ~3 条（各一半）

# 能者多劳：
await channel.set_qos(prefetch_count=10)
# 结果：快消费者 ~5 条，慢消费者 ~1 条（快者多拿）
```

> ⚠ prefetch_count 过大时，消息在消费者本地 buffer 中堆积，如果消费者崩溃，所有这些消息都要 requeue——**小心放大 at-least-once 的影响面**。

## 幂等消费、去重 key、任务状态机

### 幂等性原理

同一任务重试多次，结果应该一样（不会重复扣款、重复发送）。在内存中用 `set` 记录已处理的任务 ID，Worker 处理前检查：

```python
processed_ids = set()

if task_id in processed_ids:
    await message.ack()         # 已处理过，直接确认跳过
    return
processed_ids.add(task_id)
await do_work(data)
```

> 一般会用 Redis 替换内存 set，以支持多 Worker 共享状态。生产环境更推荐用数据库 `idempotent_key` + unique constraint，重启后也不丢失。

### 完整幂等消费流程

```text
┌─────────────────────────────────────────────┐
│  Worker 消费一条消息                          │
│                                              │
│  1. 解析消息 → 提取 idempotent_key           │
│  2. SELECT WHERE idempotent_key = ?          │
│     ├─ 已存在 → ack() → return（跳过）        │
│     └─ 不存在 → 继续 ↓                        │
│  3. INSERT task (idempotent_key=?)           │
│     ├─ 成功 → 执行业务 → ack()               │
│     └─ IntegrityError（竞态）→ rollback → ack │
│                                              │
│  双重防线：                                   │
│  - 正常路径：应用层检查（步骤 2）              │
│  - 异常路径：DB unique constraint 兜底（步骤3）│
└─────────────────────────────────────────────┘
```

### 任务状态机

AI 任务的状态流转：从 `pending` 开始，经过若干中间步骤到达终态。

```text
pending  →  running  →  success
                     →  failed  →  (retry) →  running ...
                     →  cancelled
```

```python
# 创建任务
task = Task(status="pending")

# 开始执行
task.status = "running"
await db.flush()

# 执行步骤（实时更新步骤状态）
step = Step(task_id=task.id, sequence=0, name="PARSE", status="success")
db.add(step)

step2 = Step(task_id=task.id, sequence=1, name="EXECUTE", status="success")
db.add(step2)

# 完成
task.status = "success"
task.progress = 100.0
await db.commit()
```

### 消费者重启 + 持久队列

durable queue 的生命周期独立于消费者连接。

```python
# 消费者 1：消费 1 条后断开
await c1_q.consume(c1_handler)
# 处理 1 条 → ack → 关闭连接 → 队列剩余 2 条消息

# 消费者 2：重连，从断点继续
c2_conn = await aio_pika.connect_robust(AMQP_URL)
await c2_q.consume(c2_handler)
# → 收到剩余 2 条消息 → 无缝续接
```

这就是**生产者与消费者生命周期完全解耦**的体现：两者不需要同时在线，消息在 queue 中等候。

## 消息处理和数据库事务之间的一致性取舍

这是整个系统最核心的设计难题：**消息队列和数据库是两个独立的系统，没有分布式事务保证。** 你必须自己处理二者之间的状态一致性。

### 困境：ack 和 DB 写入谁先谁后？

```text
选项 A: 先 ack 再写 DB
  → 进程崩溃 → 消息已从队列删除，DB 没有记录 → 数据永久丢失 ❌

选项 B: 先写 DB 再 ack
  → 进程崩溃 → DB 有记录，消息还在队列 → 重复消费 ⚠（可接受）
```

**原则：永远先写 DB，后 ack。** 宁可重复处理，不可丢失数据。重复可以通过幂等解决，丢失无法恢复。

### 错误模式：ack 先于 DB（数据丢失）

```python
async def bad_handler(message: aio_pika.IncomingMessage):
    data = json.loads(message.body)
    await message.ack()          # ← 消息已从队列删除
    print("ACK'ed — message gone!")

    # 此时进程崩溃 ↓
    async with db_session() as db:
        task = DBTask(id=data["task_id"], ...)
        db.add(task)
        await db.commit()        # ← 永远不会执行
```

> ❌ 结果：队列空了，DB 也没有记录——消息永久丢失，无法追踪。

### 正确模式：DB 先于 ack + 幂等去重

```python
async def idempotent_handler(message: aio_pika.IncomingMessage):
    data = json.loads(message.body)
    ikey = data["idempotent_key"]  # 每条消息的唯一标识

    async with db_session() as db:
        # Step 1: 检查是否已处理（幂等判断）
        existing = await db.execute(
            select(DBTask).where(DBTask.idempotent_key == ikey)
        )
        if existing.scalar_one_or_none() is not None:
            print(f"DUPLICATE {ikey} — skipping")
            await message.ack()        # 已处理过，直接确认跳过
            return

        # Step 2: 写 DB + 执行业务逻辑（事务中）
        try:
            task = DBTask(
                id=data["task_id"],
                idempotent_key=ikey,   # ← 数据库 unique constraint 兜底
                status="processing",
            )
            db.add(task)
            await db.commit()          # ← 先持久化

            # Step 3: 确认 DB 写入成功后才 ack
            await message.ack()
        except IntegrityError:
            # 竞态场景：另一个 Worker 同时写入了同一条
            await db.rollback()
            await message.ack()        # 虽然我写失败了，但别人写成功了
```

```sql
-- 数据库层面：唯一约束作为最终防线
CREATE UNIQUE INDEX idx_tasks_idempotent_key ON tasks(idempotent_key);
```

> 核心结论：**ack 和 DB 写入之间没有原子性保证，但有实际上的 exactly-once 效果——通过「DB 先写 + 幂等去重」把 at-least-once 的重复投递消化掉。**

## aio-pika 的异步连接、channel、queue consume

### 连接字符串

```text
amqp://用户名:密码@主机:端口/vhost
```

Day 2 所有脚本统一使用：

```python
AMQP_URL = "amqp://dev:devpass123@localhost/"
```

### connect_robust

```python
conn = await aio_pika.connect_robust(AMQP_URL)
```

| 恢复步骤 | 说明 | 为什么重要 |
|---|---|---|
| 1. 自动重连 TCP | 不断尝试重新建立与 RabbitMQ 服务器的 TCP 连接 | 解决网络闪断或服务重启导致的连接断开 |
| 2. 重新创建 Channel | 重连成功后恢复之前创建的 Channel（包括 QoS 设置） | 省去手动重建 Channel 的麻烦 |
| 3. 重新绑定并恢复消费 | 重新声明队列、恢复绑定、自动重新开始消费 | **最关键！** 消费者进程无需重启就能从断开的地方继续处理消息 |

### 连接池 + QoS

```python
# connect_robust() 支持自动重连——网络闪断时自动恢复
connection = await aio_pika.connect_robust(AMQP_URL)

# 创建 channel（轻量级虚拟连接）
channel = await connection.channel()

# QoS：prefetch_count=1 确保公平调度
await channel.set_qos(prefetch_count=1)
```

| API | 作用 |
|---|---|
| `connect_robust()` | 创建连接，支持断线自动重连 |
| `connection.channel()` | 创建 channel（虚拟连接，一个 TCP 连接可多路复用多个 channel） |
| `channel.set_qos(prefetch_count=1)` | 每次只给 Worker 一条消息，处理完再发下一条（公平调度） |

## HTTP API 与后台 Worker 之间如何协作处理长任务

### 架构全景

```text
Client                          FastAPI (uvicorn)
  │                               │
  ├─ POST /tasks ────────────────→│  → DB: INSERT Task(PENDING)
  │  {type, payload,              │  → RabbitMQ: publish(task.new)
  │   idempotent_key}             │  → 返回 task_id（同步完成，<50ms）
  │                               │
  ├─ GET /tasks/{id} ────────────→│  → DB: SELECT Task
  │                               │  → 返回 status/progress
  │                               │
  ├─ GET /tasks/{id}/stream ─────→│  → SSE 循环 DB 轮询
  │  event: status_change         │    状态变化时推送事件
  │  event: done                  │
  │                               │
                                  Worker (asyncio task)
                                    │
                                    ├─ consume from RabbitMQ
                                    ├─ DB: Task(PARSING)   + Step 0
                                    ├─ DB: Task(EXECUTING) + Step 1
                                    ├─ DB: Task(VERIFYING) + Step 2
                                    ├─ DB: Task(SUCCESS)
                                    └─ RabbitMQ: ack
```

### Lifespan 管理连接生命周期

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时：建立连接 + 声明拓扑 + 启动 Worker
    app.state.rabbit_conn = await aio_pika.connect_robust(AMQP_URL)
    app.state.rabbit_ch = await app.state.rabbit_conn.channel()
    await app.state.rabbit_ch.set_qos(prefetch_count=1)

    task_ex = await app.state.rabbit_ch.declare_exchange(...)
    task_q = await app.state.rabbit_ch.declare_queue(...)
    await task_q.bind(task_ex, routing_key="task.new")

    worker = asyncio.create_task(run_worker())  # 后台消费

    yield  # ← 服务运行中

    # 关闭时：取消 Worker + 关闭连接
    worker.cancel()
    await app.state.rabbit_conn.close()
```

### POST /tasks：写 DB + 发布消息

```python
@app.post("/tasks")
async def create_task(task: dict):
    task_id = str(uuid.uuid4())
    idempotent_key = task.get("idempotent_key", f"api-{uuid.uuid4().hex[:8]}")

    async with db_session() as db:
        # 幂等检查
        existing = await db.execute(
            select(DBTask).where(DBTask.idempotent_key == idempotent_key)
        )
        if existing.scalar_one_or_none():
            return {"task_id": existing.id, "note": "already exists"}

        db.add(DBTask(id=task_id, idempotent_key=idempotent_key, status="pending"))
        await db.commit()

    await app.state.task_ex.publish(...)  # 发布到 RabbitMQ
    return {"task_id": task_id, "status": "pending"}
```

### Worker：消费 → 多步骤处理 → 每步写入 DB

```python
async def process_task(task_data: dict):
    steps = [("PARSING", "解析参数"), ("EXECUTING", "AI处理"), ("VERIFYING", "验证结果")]

    for i, (status, desc) in enumerate(steps):
        async with db_session() as db:
            task = (await db.execute(select(DBTask).where(DBTask.id == tid))).scalar_one()
            task.status = status
            task.progress = (i + 1) / len(steps) * 100

            db.add(Step(task_id=tid, sequence=i, name=status, status="success", ...))
            await db.commit()

    # 最终状态
    task.status = "success"
    task.progress = 100.0
    task.output_payload = {"summary": "task completed"}
```

### SSE 流式追踪

```python
@app.get("/tasks/{task_id}/stream")
async def stream_task(task_id: str):
    async def event_stream():
        last_status = None
        for _ in range(30):  # 最多轮询 30 次
            async with db_session() as db:
                task = (await db.execute(select(DBTask).where(DBTask.id == task_id))).scalar_one()

            if task.status != last_status:
                yield f"event: status_change\ndata: {json.dumps({'status': task.status, 'progress': task.progress})}\n\n"
                last_status = task.status

            if task.status in ("success", "failed"):
                yield f"event: done\ndata: {json.dumps({'status': task.status})}\n\n"
                return

            await asyncio.sleep(0.3)  # 300ms 轮询间隔

    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

### 与纯内存方案的对比

| 特性 | 纯内存（06_task_dispatcher） | DB 持久化（09_api_worker_db） |
|---|---|---|
| 服务重启 | 任务状态全部丢失 | 持久化，重启后可恢复 |
| 多 Worker | 不支持（内存 set 无法共享） | 支持（共享 PostgreSQL） |
| 幂等 | 内存 set（重启丢失） | DB unique constraint（永久） |
| 查询历史 | 不支持 | 支持（SQL 查询历史任务和步骤） |
| 复杂度 | 简单，100 行 | 更高，但生产可用 |
