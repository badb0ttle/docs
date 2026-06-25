---
title: RabbitMQ消息队列
icon: 
order: 5
editLink: false
cover: 
category:
  - 知识点
tag:
  - 消息队列
  - 后端开发
  - 异步架构
---

# RabbitMQ 消息队列

>  环境：Docker `rabbitmq:3-management` + `aio-pika` 9.6.2 · Python 3.13

## 为什么需要消息队列？

后端收到一个 AI 任务请求（比如代码审查），不能一直阻塞等结果——任务可能跑几分钟。
消息队列把 "接收请求" 和 "处理任务" 解耦：

```text
HTTP POST /tasks  ──→  RabbitMQ  ──→  Worker 异步处理
     ↑                                     │
 立即返回 task_id                   更新状态到 Redis/DB
```

用户拿到 `task_id` 后可以通过轮询或 SSE 查询进度。这就是 **任务投递-异步执行-进度查询** 的经典模式。

## 核心概念

```text
Producer ──→  Exchange  ──binding/routing_key──→  Queue  ──→  Consumer
              (交换机)                              (队列)       (消费者)
```

| 概念 | 作用 | 类比 |
|---|---|---|
| **Exchange** | 消息的"路由器"，不存消息，只负责转发 | 快递分拣中心 |
| **Queue** | 消息的"缓冲区"，存储待消费的消息 | 快递柜 |
| **Binding** | Exchange 到 Queue 的连接，通过 routing_key 匹配 | 分拣规则 |
| **Routing Key** | 生产者发消息时指定，Exchange 用它决定投递到哪个 Queue | 快递单上的地址 |

### Exchange 类型

| 类型 | 路由逻辑 | 类比 |
|---|---|---|
| **Direct** | routing_key 精确匹配 queue 的 binding key | 精准投递 |
| **Topic** | routing_key 支持 `*`（匹配一个词）和 `#`（匹配零或多个词） | 按主题订阅 |
| **Fanout** | 忽略 routing_key，广播给所有绑定的 queue | 大喇叭广播 |

> Day 2 全部脚本使用 **Direct 类型**。

## 交换机、队列、绑定的声明

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

## 消息确认机制（ACK / NACK）

RabbitMQ 默认是 **自动确认**——消息发出就删，不关心消费者是否处理成功。
生产环境必须用 **手动确认**（manual ack），只有消费者说"我处理完了"才删除消息。

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

## 消息持久化（Durability）

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

Day 2 脚本实际验证了：RabbitMQ 重启后 Persistent 消息存活，Non-Persistent 消息丢失。

## 死信交换机（DLX — Dead Letter Exchange）

当消息在队列中"死掉"时（被 nack/reject 且不 requeue，或消息过期，或队列满了），可以自动转发到一个**专门的死信交换机**，然后进入**死信队列**。

### 为什么需要 DLX？

| 场景 | 不加 DLX | 加了 DLX |
|---|---|---|
| 消费失败 | 消息直接消失，无处追踪 | 自动进入死信队列，可排查 |
| 队列溢出 | 消息被丢弃 | 溢出的消息进 DLX |
| 消息过期（TTL） | 过期即消失 | 过期后进 DLX |

### 配置方式

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
dlx = await channel.declare_exchange(
    "tasks.dlx",
    ExchangeType.DIRECT,
    durable=True,
)
dead_q = await channel.declare_queue("tasks.dead", durable=True)
await dead_q.bind(dlx, routing_key="dead")
```

消息被 NACK 后自动出现在死信队列里，头信息包含 `x-death`（原队列、失败原因等）。

## 指数退避 + 幂等性

### 指数退避

不要失败后立即重试——可能下游还在故障中。逐次延长等待时间：

```text
第 1 次失败 → 等 2s  → 重试
第 2 次失败 → 等 4s  → 重试
第 3 次失败 → 等 8s  → 重试
超过最大次数 → nack(requeue=False) → DLX
```

实现方式：不直接 requeue，而是 publish 到**延迟队列**（`delay-2s`、`delay-4s`、`delay-8s`），由 TTL 过期后自动转入主队列重试。

### 幂等性

同一任务重试多次，结果应该一样（不会重复扣款、重复发送）。

在内存中用 `set` 记录已处理的任务 ID，Worker 处理前检查：

```python
processed_ids = set()

if task_id in processed_ids:
    await message.ack()         # 已处理过，直接确认跳过
    return
processed_ids.add(task_id)
await do_work(data)
```

> ⚠ Day 4 会用 Redis 替换内存 set，以支持多 Worker 共享状态。

## 连接管理

### 连接字符串

```text
amqp://用户名:密码@主机:端口/vhost
```

Day 2 所有脚本统一使用：

```python
AMQP_URL = "amqp://dev:password@localhost/"
```

### 连接池

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

## Full Integration：FastAPI + RabbitMQ 任务分发器

`06_task_dispatcher.py` 是 Day 2 的整合验证脚本。

### 架构

```text
FastAPI (lifespan)
  ├── POST /tasks              → publish 到 RabbitMQ → Worker 异步消费
  ├── GET  /tasks/{task_id}    → 查询内存 TaskStore 状态
  └── GET  /tasks/{task_id}/stream → SSE 流式推送进度
```

### 关键设计

| 组件 | 实现 | 说明 |
|---|---|---|
| **Lifespan** | `@asynccontextmanager` | 启动时连接 RabbitMQ、声明拓扑、启动 Worker；关闭时取消 Worker、释放连接 |
| **连接** | `aio_pika.connect_robust()` | 支持自动重连 |
| **QoS** | `prefetch_count=1` | 同一时刻每个 Worker 只处理一条消息（公平调度） |
| **TaskStore** | 内存 `dict` | Day 4 替换为 Redis |
| **测试模式** | `uvicorn.Server` + `httpx` + 轮询验证 | 脚本自包含，不依赖外部 curl |

### Worker 流程

```text
consume message → parse JSON → process_task (3 steps) → update store → ack
```

每步更新 `status` 和 `progress`，添加 `events` 供 SSE 推送。

## 踩坑记录

### RabbitMQ 4.x 与 aio-pika 不兼容 ❌

- **现象**：brew 安装的 RabbitMQ 4.x 无法用 aio-pika 连接
- **原因**：aiormq 6.9.4（aio-pika 的底层）不兼容 RabbitMQ 4.x 的 AMQP 协议变更
- **解决**：用 Docker 拉取 `rabbitmq:3-management` 镜像，提供 RabbitMQ 3.x

### 删除非空队列报错 ❌

- **现象**：`await queue.delete()` 报 `PRECONDITION_FAILED - queue not empty`
- **原因**：aio-pika 不允许直接删除仍含消息的队列
- **解决**：删除前先 `await queue.purge()` 清空队列

### aio-pika 9.x API 变化 ⚠

- `queue.declare().message_count` → `queue.declare().declared_message_count`
- 9.6.2 版本部分属性名变更

### passwd 脱敏误导 ⚠

- **现象**：`write_file` 后读取文件，密码显示为 `***`
- **真相**：文件实际字节是正确的密码值（用 `xxd` 确认），只是输出脱敏

### SSE 解析不可靠 ⚠

- `aiter_lines()` 流式解析 SSE 时，单次读取可能拿到不完整的 JSON
- **改用轮询**：`GET /tasks/{task_id}` 每 0.3s 拉一次状态，10s 超时

### 异步取消的正常噪声 ⚠

- shutdown 时出现 `CancelledError`、`ChannelInvalidStateError` 是异步取消的正常清理噪声，不是 bug

## 命令行速查

```bash
# 启动 RabbitMQ 容器（Docker Desktop）
docker run -d --name rabbitmq-dev \
  -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin \
  rabbitmq:3-management

# 进入容器创建 dev 用户
docker exec -it rabbitmq-dev rabbitmqctl add_user dev <password>
docker exec -it rabbitmq-dev rabbitmqctl set_permissions -p / dev ".*" ".*" ".*"

# 管理界面
open http://localhost:15672

# 运行 Day 2 脚本
/opt/anaconda3/bin/python3 learn/day2/01_rabbitmq_concepts.py
/opt/anaconda3/bin/python3 learn/day2/02_producer_consumer.py
/opt/anaconda3/bin/python3 learn/day2/03_durability.py
/opt/anaconda3/bin/python3 learn/day2/04_error_handling.py
/opt/anaconda3/bin/python3 learn/day2/05_retry_idempotent.py
/opt/anaconda3/bin/python3 learn/day2/06_task_dispatcher.py
```
