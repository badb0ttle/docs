---
title: SQLAlchemy异步操作
icon: 
order: 6
editLink: false
cover: 
category:
  - 知识点
tag:
  - ORM
  - 数据库
  - 异步架构
  - 持久化
---

# SQLAlchemy 2.0 异步操作

> 环境：Docker `postgres:16-alpine` + `asyncpg` 0.30.0 + `SQLAlchemy` 2.0.42 · Python 3.13

## 为什么用 SQLAlchemy 异步模式？

FastAPI 本身是异步框架，如果 ORM 操作用同步的 `psycopg2`，每次数据库查询都会阻塞事件循环。SQLAlchemy 2.0 提供了完整的异步支持，搭配 `asyncpg` 驱动，所有数据库操作都是 `await` 的，不会阻塞其他请求。

```text
同步：请求 → 查 DB（阻塞，其他请求等着）→ 返回结果
异步：请求 → await 查 DB（事件循环去处理其他请求）→ I/O 完成 → 返回结果
```

## 核心概念

| 概念 | 作用 | 类比 |
|---|---|---|
| `create_async_engine` | 创建异步引擎，管理连接池 | 数据库连接池管理员 |
| `async_sessionmaker` | 创建异步 Session 的工厂 | 每次请求领一个临时工卡 |
| `AsyncSession` | 一次数据库会话，CRUD 的入口 | 你手上的那张工卡 |
| `DeclarativeBase` | 所有模型类的基类 | 表格模板 |
| `asyncpg` | PostgreSQL 的异步驱动 | 真正干活通信的司机 |

## 异步引擎配置

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = "postgresql+asyncpg://dev:devpass123@localhost:5432/ai_tasks"

engine = create_async_engine(
    DATABASE_URL,
    echo=False,               # True 可查看所有 SQL
    pool_size=10,             # 连接池常驻连接数
    max_overflow=20,          # 溢出连接数上限
    pool_pre_ping=True,       # 使用前 ping 一下（检测断连）
    pool_recycle=3600,        # 1 小时后回收连接
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,   # 提交后不过期对象（async 推荐）
)
```

> `expire_on_commit=False`：提交后对象属性不会过期，在 async 模式下尤其重要——否则访问属性时会触发 lazy load 去刷新，在 Python 3.13 的 greenlet 下会直接报错。

## 数据模型设计

为一次 AI Agent 请求的全链路设计 5 张表：

```text
Session (会话)
  │
  ├── Message (对话记录)  ──  user/assistant 的消息
  │
  └── Task (任务执行)
        │
        └── Step (执行步骤)
              │
              └── ToolCall (工具调用)
```

### Session — 会话表

```python
class Session(Base):
    __tablename__ = "sessions"
    __table_args__ = (
        Index("ix_sessions_status_created", "status", "created_at"),
    )
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255))
    status = Column(String(20), default="active")
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan", lazy="selectin")
    tasks = relationship("Task", back_populates="session", lazy="selectin")
```

### Message — 消息表

```python
class Message(Base):
    __tablename__ = "messages"
    __table_args__ = (
        Index("ix_messages_session_created", "session_id", "created_at"),
    )
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20))
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), default=func.now())
    
    session = relationship("Session", back_populates="messages")
```

### Task — 任务表

每个 Task 有一个 `idempotent_key`（幂等键），保证同一个操作不会被执行两次。

```python
class Task(Base):
    __tablename__ = "tasks"
    __table_args__ = (
        UniqueConstraint("idempotent_key"),
        Index("ix_tasks_status_created", "status", "created_at"),
    )
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("sessions.id", ondelete="SET NULL"))
    idempotent_key = Column(String(128), nullable=False, unique=True)
    type = Column(String(50))
    status = Column(String(20), default="pending")       # pending → running → success/failed
    progress = Column(Float, default=0.0)
    input_payload = Column(JSON)
    output_payload = Column(JSON)
    error_message = Column(Text)                         # 失败时记录原因
    error_type = Column(String(100))                     # 异常类型
    retry_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
```

### Step — 步骤表

每个 Step 的 `(task_id, sequence)` 唯一——同一任务的同一顺序位置只有一个步骤。

```python
class Step(Base):
    __tablename__ = "steps"
    __table_args__ = (
        UniqueConstraint("task_id", "sequence", name="uq_steps_task_sequence"),
        Index("ix_steps_task_status", "task_id", "status"),
    )
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    task_id = Column(String(36), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    sequence = Column(Integer)
    name = Column(String(100))                          # PARSE / EXECUTE / VERIFY
    status = Column(String(20), default="pending")
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    input_data = Column(JSON)
    output_data = Column(JSON)
    error_message = Column(Text)
    
    tool_calls = relationship("ToolCall", back_populates="step", cascade="all, delete-orphan", lazy="selectin")
    task = relationship("Task", back_populates="steps")
```

### ToolCall — 工具调用表

```python
class ToolCall(Base):
    __tablename__ = "tool_calls"
    __table_args__ = (
        Index("ix_toolcalls_step", "step_id"),
    )
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    step_id = Column(String(36), ForeignKey("steps.id", ondelete="CASCADE"), nullable=False)
    tool_name = Column(String(100))
    input_args = Column(JSON)
    output_result = Column(JSON)
    status = Column(String(20), default="pending")
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    error_message = Column(Text)
    
    step = relationship("Step", back_populates="tool_calls")
```

> 索引选择依据：为高频查询条件建立复合索引。`(status, created_at)` 覆盖"查最近失败任务"；`(task_id, status)` 覆盖"查某任务进行中的步骤"；`(session_id, created_at)` 覆盖"查某会话的消息时间线"。

## CRUD 操作（纯异步）

### INSERT

```python
async with AsyncSessionLocal() as db:
    session = Session(title="测试会话")
    db.add(session)
    await db.flush()        # flush 只发送 SQL，不提交事务
    print(f"session id: {session.id}")
    
    msg1 = Message(session_id=session.id, role="user", content="帮我写代码")
    msg2 = Message(session_id=session.id, role="assistant", content="好的")
    db.add_all([msg1, msg2])
    await db.commit()       # commit 提交事务
```

### SELECT

```python
async with AsyncSessionLocal() as db:
    stmt = select(Session).where(Session.id == session_id)
    result = await db.execute(stmt)
    s = result.scalar_one()
    
    # 统计
    count = await db.execute(select(func.count(Message.id)))
    total = count.scalar()
```

### UPDATE

```python
async with AsyncSessionLocal() as db:
    stmt = select(Session).where(Session.id == session_id)
    s = (await db.execute(stmt)).scalar_one()
    s.title = "新标题"
    s.status = "archived"
    await db.commit()
```

> 另一种方式是用 `update()` 语句直接 SQL 更新，适合批量修改或多行更新场景，不需要先把对象加载到内存。

### DELETE（级联）

```python
async with AsyncSessionLocal() as db:
    s = (await db.execute(select(Session).where(Session.id == session_id))).scalar_one()
    await db.delete(s)
    await db.commit()
    # 关联的 Message 自动级联删除（cascade="all, delete-orphan"）
```

## 事务边界与回滚

异步模式下事务的关键规则：

```python
async with AsyncSessionLocal() as db:
    session = Session(title="会被回滚")
    db.add(session)
    await db.flush()
    # flush 后数据已经发送到数据库，但在事务中不可见
    
    await db.rollback()     # 回滚：所有 flush 的内容撤销
    
    # 验证回滚生效
    check = await db.execute(
        select(Session).where(Session.id == session.id)
    )
    exists = check.scalar_one_or_none() is not None
    print(f"回滚后仍存在: {exists}")  # False
```

> `flush()` 只是把 SQL 发到数据库（在事务内），`commit()` 才真正持久化。如果 flush 后异常未捕获，事务会自动回滚。

## N+1 问题与 selectinload

这是 ORM 最常见的性能坑。查 1 个 Session 后遍历它的 Tasks，再遍历每个 Task 的 Steps——每一层都发 SQL，N 个关联对象就 N 次查询。

### N+1 问题演示

```python
async with AsyncSessionLocal() as db:
    # 第一次查询：查 Session
    s = (await db.execute(select(Session).where(Session.id == sid))).scalar_one()
    
    # 第二次查询：单独查 Tasks
    tasks = (await db.execute(select(Task).where(Task.session_id == sid))).scalars()
    for t in tasks:
        # 第三次查询：查 Steps ← 这里每个 Task 都查一次
        steps = (await db.execute(select(Step).where(Step.task_id == t.id))).scalars()
```

> 对 SQLAlchemy ORM 对象调用 `.tasks` 等关系属性，如果没有预加载，会触发一次 lazy load 查询。在异步模式下（Python 3.13），同步 lazy load 直接报 `MissingGreenlet` 错误。

### 用 selectinload 解决

```python
from sqlalchemy.orm import selectinload

async with AsyncSessionLocal() as db:
    stmt = (
        select(Task)
        .where(Task.id == task_id)
        .options(
            selectinload(Task.session),    # 预加载所属 Session
            selectinload(Task.steps)       # 预加载所有 Steps
            .selectinload(Step.tool_calls) # 嵌套预加载 ToolCalls
        )
    )
    task = (await db.execute(stmt)).scalar_one()
    # 此时 task.session、task.steps[0].tool_calls 全部已加载
    # 不再触发任何查询
```

| 方式 | 查询次数 | 何时用 |
|---|---|---|
| 不加 selectinload | 1 + N（每个关联查一次） | 不需要关联数据时 |
| `selectinload` | 1 + 1（IN 查询批量加载） | 需要关联数据，且关联数量可控 |
| `joinedload` | 1（JOIN 一次全查） | 一对一/一对少的关联 |

## 幂等 key 设计

### 为什么需要幂等

用户短时间内重试同一个请求，后端不能重复执行。幂等 key 就是请求的唯一标识——相同的 key 只处理一次。

### 唯一约束 + 捕获异常

```python
try:
    task = Task(idempotent_key="pr-42-review-v2", ...)
    db.add(task)
    await db.flush()
except IntegrityError:
    await db.rollback()
    raise ValueError(f"任务 {idempotent_key} 已存在")
```

### 幂等创建（先查后写）

```python
async def upsert_task(db, idempotent_key, **kwargs):
    existing = (
        await db.execute(select(Task).where(Task.idempotent_key == idempotent_key))
    ).scalar_one_or_none()
    
    if existing:
        print(f"⚠ 任务已存在（幂等返回）: {existing.id}")
        return existing
    
    task = Task(idempotent_key=idempotent_key, **kwargs)
    db.add(task)
    await db.flush()
    return task
```

> 在高并发场景下，"先查后写"仍有竞态条件。真正生产环境建议用 `INSERT ... ON CONFLICT (idempotent_key) DO NOTHING RETURNING *`，原子操作更安全。

## 状态流转

AI 任务的状态机：

```text
pending  →  running  →  success
                     →  failed → (retry) → running ...
```

### 实现

```python
# 创建任务
task = Task(status="pending")

# 开始执行
task.status = "running"
await db.flush()

# 执行步骤
step = Step(task_id=task.id, name="PARSE", status="success", ...)
db.add(step)

# 完成
task.status = "success"
task.progress = 100.0
await db.commit()
```

### 失败记录

```python
task.status = "failed"
task.error_type = "ConnectionError"
task.error_message = "部署失败：目标主机连接被拒绝"
task.retry_count += 1
await db.commit()
```

### 失败任务查询

```python
stmt = (
    select(Task)
    .where(Task.status == "failed")
    .order_by(Task.updated_at.desc())
)
failed_tasks = (await db.execute(stmt)).scalars()

# 按状态统计
counts = {}
for status in ["pending", "running", "success", "failed"]:
    cnt = await db.execute(
        select(func.count(Task.id)).where(Task.status == status)
    )
    counts[status] = cnt.scalar()
```

## 连接池监控

```python
pool = engine.pool
print(f"pool_size:        {pool.size()}")
print(f"overflow:         {pool.overflow()}")
print(f"checked_in:       {pool.checkedin()}")
print(f"checked_out:      {pool.checkedout()}")
print(f"total:            {pool.total()}")
```

| 指标 | 含义 |
|---|---|
| `size()` | 池中可用（空闲）连接数 |
| `overflow()` | 溢出连接数（超出 pool_size 的部分） |
| `checkedin()` | 已归还的连接数 |
| `checkedout()` | 正在使用的连接数 |
| `total()` | 全部连接 = size + overflow |

> `pool_pre_ping=True` 保证每次从池中取出连接前先 ping 一下，避免拿到已断开的连接（常见于数据库重启或网络闪断后）。

## 全链路复盘

从数据库还原一次 AI 任务的完整执行过程：

```python
async def full_trace(task_id):
    async with AsyncSessionLocal() as db:
        # 1. 任务 + Session
        stmt = select(Task).where(Task.id == task_id).options(selectinload(Task.session))
        task = (await db.execute(stmt)).scalar_one()
        
        # 2. 对话记录
        msgs = (await db.execute(
            select(Message).where(Message.session_id == task.session.id)
        )).scalars()
        
        # 3. 步骤 + 工具调用
        stmt = (
            select(Step)
            .where(Step.task_id == task_id)
            .options(selectinload(Step.tool_calls))
            .order_by(Step.sequence)
        )
        steps = (await db.execute(stmt)).scalars()
        
        # 输出报告...
```

输出效果：

```
══════════════════════════════════════════
📋 任务复盘报告
══════════════════════════════════════════

会话: 审查 PR #99 — 修复登录超时 Bug
状态: success  |  类型: code_review

📝 对话记录
  [user] 帮我 review PR #99
  [assistant] 好的，正在分析...

⚙ 执行步骤
  [0] PARSE — success
      🛠 read_file → success
  [1] EXECUTE — success
      🛠 run_tests → success
  [2] VERIFY — success
      🛠 lint_check → success
```

> 全链路复盘是运维利器：生产环境出了问题，不用去翻日志拼凑，直接查数据库就能还原"用户说了什么 → 系统做了什么 → 哪一步挂了"。

## Alembic 迁移

### 初始化

```bash
alembic init -t async alembic
```

`-t async` 生成异步模式的 `env.py`。

### 配置 env.py

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "learn/day3"))

from learn.day3.models import Base
target_metadata = Base.metadata

# 覆盖数据库 URL
config.set_main_option("sqlalchemy.url", "postgresql+asyncpg://dev:xxx@localhost:5432/ai_tasks")
```

### 生成迁移

```bash
# 删除所有表（包括 alembic_version），让 autogenerate 重新检测
alembic revision --autogenerate -m "initial: sessions,messages,tasks,steps,tool_calls"
alembic upgrade head
```

`--autogenerate` 比较 `Base.metadata` 和数据库当前状态，自动生成 DDL。

### 查看/回滚

```bash
alembic current          # 当前版本
alembic history          # 迁移历史
alembic downgrade -1     # 回滚一个版本
```

## Python 3.13 的 greenlet 坑

在 Python 3.13 + SQLAlchemy 2.0 async 环境下，访问未预加载的关系属性会直接报错：

```
sqlalchemy.exc.MissingGreenlet: greenlet_spawn has not been called;
can't call await_only() here. Was IO attempted in an unexpected place?
```

### 原因

SQLAlchemy 的同步 lazy load 需要 greenlet 支持才能在 async 环境中工作，但 Python 3.13 的 greenlet 实现有兼容问题。

### 解决方案

1. **所有关系使用 `selectinload` 预加载**（推荐）
   ```python
   stmt = select(Task).options(selectinload(Task.session), selectinload(Task.steps))
   ```

2. **关系定义时直接设置 `lazy="selectin"`**
   ```python
   steps = relationship("Step", lazy="selectin")
   ```

3. **不要访问未预加载的关系属性**
   如果需要关联数据，用显式的 `select` 查询代替 `obj.relation` 访问。

> 在 `models.py` 中设置 `expire_on_commit=False` 也能减少触发点——提交后对象属性不会过期，不会在你无意中触发刷新。

## 踩坑记录

| 问题 | 原因 | 解决 |
|---|---|---|
| `MissingGreenlet` 错误 | Python 3.13 greenlet 兼容问题，lazy load 在 async 下失败 | 全部用 `selectinload` 预加载 |
| Alembic 生成空迁移 | 表已存在，autogenerate 检测不到差异 | 先 `drop_all` 再 `revision --autogenerate` |
| 密码被终端脱敏 | Hermes 终端对 `***` 做了替换 | 用环境变量 `DB_PW` 传递密码 |
| `unique constraint` 冲突 | 同一 script 多次运行残留数据 | 每次运行前先 `_clean.py` 清理 |
| `fetchall()` 不能用 `await` | 异步模式下 fetchall() 是同步方法 | 用 `result.all()` 方法 |
