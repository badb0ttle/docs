---
title: Redis 与短期任务状态
icon: 
order: 7
editLink: false
cover: 
category:
  - 知识点
tag:
  - Redis
  - 缓存
  - 后端开发
  - 分布式
---

# Redis 与短期任务状态

> 环境：Docker `redis:7-alpine` + `redis-py` 8.0.1 · Python 3.13

Redis 在 AI Task Backend 里不是主存储，而是**性能层**。它的定位是：高频读写的临时状态放 Redis，需要持久化、复杂查询的数据落 PostgreSQL。本节把这条边界讲清楚。

```text
                用户请求
                   │
          ┌────────▼────────┐
          │   FastAPI API   │
          └────────┬────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
PostgreSQL      RabbitMQ       Redis
(真相来源)      (异步任务)     (性能层)
```

## String, Hash, List, Set

Redis 的数据结构不是"换个写法存数据"，而是**每种结构对应一种访问模式**。选对结构 = 性能好 + 代码少。

### String — 最灵活的结构

String 是 Redis 中使用频率最高的类型，本质是二进制安全的字节数组（最大 512MB），但通常用做：

- **缓存 JSON 序列化后的对象**
- **计数器（INCR/DECR）**
- **分布式锁的值（SETNX）**

```python
# SET / GET — 基本读写
await r.set("user:42:name", "Alice")
name = await r.get("user:42:name")   # b'Alice'

# INCR — 原子计数器
await r.set("counter:api_calls", "0")
await r.incr("counter:api_calls")    # → 1
await r.incr("counter:api_calls")    # → 2

# SETNX — 仅在不存在时设置（锁的基础）
locked = await r.setnx("lock:task:99", "worker-1")  # True（抢到锁）
locked = await r.setnx("lock:task:99", "worker-2")  # False（已锁）

# MGET — 批量获取，1 次网络往返拿 N 个 key
await r.mset({"k1": "v1", "k2": "v2", "k3": "v3"})
values = await r.mget("k1", "k2", "k3")
```

**思维映射：** Python `str` → Redis String —— 区别在于 Redis String 自带原子操作（INCR / SETNX），不需要你加锁。

### Hash — 按字段操作对象

Hash 适合存**需要部分更新**的对象。和「把整个 JSON 塞进 String」的区别：

| | JSON String | Hash |
|---|---|---|
| 更新一个字段 | 全量反序列化 → 修改 → 序列化 → 写回 | `HINCRBY` / `HSET` 只碰一个字段 |
| 读一个字段 | 全量读 + 反序列化 | `HGET` 只取那个字段 |
| 适合场景 | 一次读写整个对象 | 频繁修改个别字段 |

```python
# HSET mapping — 一次设多个字段
await r.hset("task:100:meta", mapping={
    "user_id": "42",
    "prompt": "Write a poem",
    "status": "pending",
})

# HGET — 只读一个字段
status = await r.hget("task:100:meta", "status")    # b'pending'

# HINCRBY — 对数字字段原子增减
await r.hset("task:100:meta", "retry_count", "0")
await r.hincrby("task:100:meta", "retry_count", 1)  # → 1

# HGETALL — 拿全部字段（小 Hash 可用，大 Hash 用 HSCAN）
all_fields = await r.hgetall("task:100:meta")
```

**场景：** 任务运行时状态（`status`, `progress`, `worker_id`, `last_heartbeat`）用 Hash 存，每个字段独立更新，不需要序列化开销。

### List — 双向链表

List 是**有序可重复**的字符串列表。

```python
# LPUSH / RPUSH — 左端/右端插入
await r.lpush("agent:log", "step-1")
await r.rpush("agent:log", "step-3")

# LRANGE — 范围读取
items = await r.lrange("agent:log", 0, -1)

# LTRIM — 裁剪到最近 N 条
await r.ltrim("recent:events", 0, 99)   # 只保留前 100 条
```

**场景：**
- 最近 50 条步骤日志（LTRIM 限制长度，SSE 实时推送）
- 简易消息队列（⚠️ 不可靠——消费失败消息丢失，正式场景用 RabbitMQ）

### Set — 无序去重集合

Set 适合**去重 + 集合运算**。CRUD 之外，Redis Set 的价值在于交/并/差集。

```python
await r.sadd("workers:gpu", "worker-1", "worker-2", "worker-4")
await r.sadd("workers:cpu", "worker-2", "worker-3", "worker-5")

# SINTER — 交集（同时有 GPU 和 CPU 的 worker）
both = await r.sinter("workers:gpu", "workers:cpu")
# → {'worker-2'}

# SDIFF — 差集（有 GPU 但没 CPU）
gpu_only = await r.sdiff("workers:gpu", "workers:cpu")
# → {'worker-1', 'worker-4'}

# SISMEMBER — O(1) 成员检查
is_active = await r.sismember("active:workers", "worker-2")
```

**场景：**
- **在线 Worker 集合**（心跳注册 + 定期清理过期成员）
- **用户标签**（SINTER 找共同标签）
- **去重**（已处理的任务 ID Set）

### Sorted Set — 带分数的有序集合

ZSet 的每个成员有一个 `score`（double），按 score 排序。

```python
await r.zadd("leaderboard:throughput", {
    "worker-1": 95.5,
    "worker-2": 120.3,
    "worker-3": 87.0,
})

# ZREVRANGE — 按分数降序取 top-N
top2 = await r.zrevrange("leaderboard:throughput", 0, 1, withscores=True)
# → [(b'worker-2', 120.3), (b'worker-1', 95.5)]

# ZINCRBY — 原子增减分数
await r.zincrby("leaderboard:throughput", 10.0, "worker-3")
```

**场景：** 排行榜、延迟队列（score = 执行时间戳）、优先级队列。

---

## TTL、Pipeline、简单限流和分布式锁概念

这四项是 Redis 在工程中的「元操作」——不是存数据，而是**控制数据的行为**。

### TTL — 自动过期

Redis 里每个 key 都需要一个生命周期。不设 TTL = 内存泄漏。

```python
# SETEX — SET + EXPIRE 原子操作
await r.setex("otp:user-42", 120, "456789")   # 120 秒后自动删除

# SET ... EX — 更推荐（SET 原生支持）
await r.set("cache:profile:99", data, ex=300)  # 5 分钟过期

# EXPIRE — 对已有 key 设置过期
await r.expire("session:temp", 5)

# TTL — 查看剩余时间 (-1=永不过期, -2=已过期/不存在)
ttl = await r.ttl("session:temp")

# PERSIST — 移除过期时间
await r.persist("cache:profile:99")
```

**TTL 设计原则：**

| 场景 | 推荐 TTL | 理由 |
|---|---|---|
| 验证码 / OTP | 120s | 安全要求短期有效 |
| 幂等去重键 | 60s | 窗口内防重复即可 |
| 会话中间态 | 600s | 用户断开后合理保留 |
| 任务运行时状态 | 3600s | 任务完成后 1h 可查询 |
| 缓存数据 | 60-600s | 取决于数据新鲜度要求 |

### Pipeline — 批量命令减少 RTT

逐条发送命令 = N 次网络往返。Pipeline = 打包发送，1 次往返。

```python
pipe = r.pipeline()
for i in range(100):
    pipe.set(f"pipe:{i}", f"value-{i}")
results = await pipe.execute()   # 100 条 SET，1 次网络往返
```

**原理：** Pipeline 在客户端缓冲命令，一次性发送，Redis 顺序执行后批量返回。不是事务（不保证原子性），只是减少 RTT。

**场景：** 批量写入日志/指标、批量读取缓存、初始化大量键。

### 简单限流 — 固定窗口计数器

```python
async def rate_limiter(r, key, limit, window_seconds):
    now = int(time.time())
    window_id = now // window_seconds
    window_key = f"{key}:{window_id}"

    pipe = r.pipeline()
    pipe.incr(window_key)
    pipe.expire(window_key, window_seconds + 1)
    count, _ = await pipe.execute()

    return count <= limit, limit - count if count <= limit else 0
```

**固定窗口的缺点：** 窗口边界会出现「双倍突发」——最后一秒耗尽配额 + 下一秒窗口重置，短时间内可以通过 2×limit 的请求。生产环境建议用**滑动窗口**（ZSet 记录每次请求的时间戳，ZREMRANGEBYSCORE 清理过期记录），但固定窗口对于内部服务已经足够。

**在本项目中的使用：** AI Task Backend 的任务提交接口用 Redis 限流——同一用户 60 秒内最多提交 10 个任务，超过返回 429。

### 分布式锁

防止多个 Worker 同时处理同一个任务的关键机制。

```python
# 获取锁：SET key value NX EX ttl
got_lock = await r.set("lock:task:99", "worker-1", nx=True, ex=30)

# 释放锁：Lua 脚本保证原子性（只释放自己持有的锁）
script = """
if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
else
    return 0
end
"""
await r.eval(script, 1, lock_name, holder)
```

**三个关键点：**
1. `NX` — 只在 key 不存在时设置（原子判断+设置）
2. `EX` — 自动过期（Worker 崩溃不会死锁）
3. **释放时必须验证 holder** — 否则可能误删别人的锁

**⚠️ 生产环境建议：** 这个简化版没有锁续期。如果任务执行时间可能超过 TTL，用 Redlock 算法或 redis-py 的 `Lock` 类（内置看门狗自动续期）。

---

## 短期任务状态、请求去重、会话临时状态

这三项是 Redis 在 AI Task Backend 中的直接应用场景。

### 任务运行时状态（Hash + TTL）

任务执行期间的实时状态用 Hash 存储，任务完成 1 小时后自动清理：

```python
class TaskStateTracker:
    async def create(self, task_id, worker_id):
        await r.hset(f"task:{task_id}:state", mapping={
            "status": "queued",
            "progress": "0",
            "started_at": str(time.time()),
            "worker_id": worker_id,
        })

    async def update_status(self, task_id, status):
        await r.hset(f"task:{task_id}:state", "status", status)

    async def update_progress(self, task_id, progress):
        await r.hset(f"task:{task_id}:state", "progress", str(progress))

    async def finish(self, task_id):
        # 保留 1 小时供查询，之后自动过期
        await r.expire(f"task:{task_id}:state", 3600)
```

**为什么不用 DB？** 状态每秒更新一次，DB 行锁争用严重。任务结束后最终状态才落库。

### 请求去重（SETNX + TTL）

防止用户短时间内重复提交完全相同的请求：

```python
class RequestDeduplicator:
    async def is_duplicate(self, user_id, payload, ttl=60):
        payload_hash = hashlib.md5(payload.encode()).hexdigest()[:16]
        key = f"dedup:{user_id}:{payload_hash}"
        is_new = await r.setnx(key, str(time.time()))
        if is_new:
            await r.expire(key, ttl)
            return False   # 新请求
        return True         # 重复
```

**双重保障策略：**
- **短期（60s 窗口）：** Redis SETNX → 防止误触/双击
- **长期（永久幂等）：** DB 唯一约束 + 任务状态机 → 防止真正的重复处理

### 会话临时状态（SETEX）

分步对话中的中间态——用户确认工具调用时，需要暂存上下文：

```python
class SessionContextStore:
    async def set_context(self, session_id, data, ttl=600):
        await r.setex(f"session:{session_id}:context", ttl, json.dumps(data))

    async def consume_context(self, session_id):
        """读取后删除，一次性消费"""
        pipe = r.pipeline()
        key = f"session:{session_id}:context"
        pipe.get(key)
        pipe.delete(key)
        raw, _ = await pipe.execute()
        return json.loads(raw) if raw else None
```

**为什么放 Redis？** 这是瞬态数据——下一步就消费掉，用户断开 10 分钟后自动过期，不污染数据库。

---

## Redis 与数据库之间的数据边界

决定数据放哪，不是凭感觉，而是回答三个问题：

> **Q1: 丢了会怎样？** 丢了没关系 → Redis / 丢了很麻烦 → DB
>
> **Q2: 访问模式？** 高频读、低延迟 → Redis / 复杂查询、JOIN → DB
>
> **Q3: 生命周期？** 短期（秒/分钟/小时）→ Redis / 长期（天/月/年）→ DB

### 必须落数据库的数据

| 数据 | 理由 |
|---|---|
| 用户账户/认证 | 不可丢失，需要索引查询 |
| 任务定义（prompt/参数） | 核心业务数据，关联查询 |
| 任务最终结果 | 用户产出，不可丢失 |
| 完整对话历史 | 分页/搜索/长期保留 |
| 步骤执行全量日志 | 调试/复现依赖全量记录 |
| 工具调用明细 | 审计需要 |

### 适合只放 Redis 的数据

| 数据 | 理由 |
|---|---|
| 任务运行时状态 | 高频更新（每秒 heartbeat），丢失可重建 |
| Worker 注册/健康检查 | 瞬态服务发现 |
| 请求去重键 | 60s 窗口有效，过期自动清理 |
| 会话中间态 | 消费一次即失效 |
| API 限流计数器 | 窗口过期自动清零 |
| 分布式锁 | 必须自动过期防死锁 |

### 双层存储的数据

| 数据 | Redis 角色 | DB 角色 |
|---|---|---|
| 最近 N 条步骤日志 | LTRIM 50 条，SSE 实时推 | steps 表全量，历史查询 |
| 缓存热门数据 | Cache-Aside，减轻 DB 压力 | Source of Truth |
| 配置热更新 | Hash 存运行时配置 | 存变更历史（可选） |

### 常见反模式

1. **任务结果只存 Redis → Redis 重启/Key 过期后结果永久丢失。** 结果必须先落 DB，Redis 只做缓存。
2. **高频计数器只存 DB → 行锁争用，高并发下性能崩溃。** 用 Redis INCR，定期或按需落库。
3. **Redis List 当消息队列 → 消费失败消息丢失，无确认机制。** 可靠消息用 RabbitMQ。
4. **Redis Key 不设 TTL → 内存泄漏。** 每个 key 都要有明确生命周期。
5. **DB 和 Redis 双写不一致 → 中间步骤失败导致两边数据不同。** 以 DB 为准（Write-Through），Redis 设 TTL 到期后从 DB 重建。

---

## 哪些状态适合放 Redis，哪些状态必须落数据库

最后的决策清单，写代码时随时对照。

### 自检清单

- □ 这条数据丢了用户会不会投诉？ → YES：必须先落 DB
- □ 需要复杂查询吗（JOIN, WHERE, ORDER BY, LIKE）？ → YES：必须用 DB
- □ 写入频率多高？ → 每秒几十次以上：Redis；每分钟几次：DB 可以
- □ 需要保留多久？ → < 1h：Redis ONLY；1h-1d：Redis + 可重建；> 1d：DB 必须存
- □ Redis 挂了能重建吗？ → YES：架构正确；NO：DB 必须是 truth source
- □ 每个 Redis key 有 TTL 吗？ → NO：加上！

### AI Task Backend 最终决策表

```text
Session            → DB     (会话记录，分页查询)
Message            → DB     (完整对话历史，搜索/分页)
Task 定义           → DB     (基本信息，关联查询)
Task 最终结果       → DB     (不可丢失)
Step 全量日志       → DB     (调试/复现)
Tool call 明细      → DB     (审计)

Task 运行时状态     → Redis  (Hash, TTL=3600s)
最近 50 条 step     → Redis  (List LTRIM, SSE 推送)
请求去重            → Redis  (SETNX, TTL=60s)
会话中间态          → Redis  (SETEX, TTL=600s)
Rate limit          → Redis  (INCR + EXPIRE)
Worker 注册         → Redis  (Set + TTL 心跳)
分布式锁            → Redis  (SET NX EX)
```

一句话总结：**DB 是账本，Redis 是草稿纸。账本不能丢，草稿纸可以撕。**
