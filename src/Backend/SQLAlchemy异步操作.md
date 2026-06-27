---
title: SQLAlchemy异步操作
icon: 
order: 6
editLink: false
cover: 
timeline: false
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

## 会话、消息、任务、执行步骤、工具调用的数据建模

一次 AI Agent 请求从用户输入到最终返回结果，经历了多个环节。我们要记录的不只是"最终答案"，而是整个过程的每一步——谁说了什么、系统做了什么、用了哪些工具、每一步用了多久、失败时是什么原因。

为此设计了 5 张表，形成三层嵌套关系：

```text
Session (会话)
  │
  ├── Message (对话记录)  ──  user/assistant/system 的逐条消息
  │
  └── Task (任务执行)
        │
        └── Step (执行步骤)
              │
              └── ToolCall (工具调用)
```

### Session —— 会话

一次对话的顶层容器。一个 Session 可以包含多条 Message（对话记录）和多个 Task（任务）。

```python
class Session(Base):
    __tablename__ = "sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255))
    status = Column(String(20), default="active")
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="session")
```

### Message —— 消息

会话中的每条对话记录。role 区分 `user`（用户输入）、`assistant`（AI 回复）、`system`（系统提示）。

```python
class Message(Base):
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20))       # user / assistant / system
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), default=func.now())

    session = relationship("Session", back_populates="messages")
```

### Task —— 任务

一次 AI 任务执行。这是系统最核心的表——承载了**幂等保护**（idempotent_key）、**状态追踪**（status/progress）、**输入输出**（input_payload/output_payload）和**失败记录**（error_message/error_type/retry_count）。

```python
class Task(Base):
    __tablename__ = "tasks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("sessions.id", ondelete="SET NULL"))
    idempotent_key = Column(String(128), nullable=False, unique=True)
    type = Column(String(50))                          # code_review / deploy / test
    status = Column(String(20), default="pending")     # pending → running → success/failed
    progress = Column(Float, default=0.0)
    input_payload = Column(JSON)
    output_payload = Column(JSON)
    error_message = Column(Text)
    error_type = Column(String(100))
    retry_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
```

### Step —— 执行步骤

每个 Task 拆解为多个 Step（如 PARSE → EXECUTE → VERIFY），每个 Step 记录其输入、输出、耗时和失败原因。`(task_id, sequence)` 唯一约束保证了同一任务的执行步骤不会重复。

```python
class Step(Base):
    __tablename__ = "steps"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    task_id = Column(String(36), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    sequence = Column(Integer)
    name = Column(String(100))          # PARSE / EXECUTE / VERIFY
    status = Column(String(20), default="pending")
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    input_data = Column(JSON)
    output_data = Column(JSON)
    error_message = Column(Text)

    tool_calls = relationship("ToolCall", back_populates="step", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("task_id", "sequence", name="uq_steps_task_sequence"),
    )
```

### ToolCall —— 工具调用

Step 中每个具体的工具调用——比如 `read_file("main.py")` → 返回文件内容。记录工具名、输入参数、输出结果和耗时。

```python
class ToolCall(Base):
    __tablename__ = "tool_calls"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    step_id = Column(String(36), ForeignKey("steps.id", ondelete="CASCADE"), nullable=False)
    tool_name = Column(String(100))
    input_args = Column(JSON)
    output_result = Column(JSON)
    status = Column(String(20), default="pending")     # pending → running → success/error/timeout
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    error_message = Column(Text)
```

> 5 张表的设计原则：**每一层只记录该层关心的字段**。Task 不需要关心 ToolCall 的工具名，Step 不需要管 Message 的 role。级联删除（`cascade="all, delete-orphan"`）保证删 Session 时其下的 Message/Task/Step/ToolCall 自动清理，不会留下孤儿记录。

## SQLAlchemy 2.0 async、AsyncSession、事务边界

### 为什么用异步模式

FastAPI 本身是异步框架，如果 ORM 操作用同步的 `psycopg2`，每次数据库查询都会阻塞事件循环。SQLAlchemy 2.0 提供了完整的异步支持，搭配 `asyncpg` 驱动，所有数据库操作都是 `await` 的，不会阻塞其他请求。

```text
同步：请求 → 查 DB（阻塞，其他请求等着）→ 返回结果
异步：请求 → await 查 DB（事件循环去处理其他请求）→ I/O 完成 → 返回结果
```

### 核心组件

| 组件 | 作用 |
|---|---|
| `create_async_engine` | 创建异步引擎，管理连接池 |
| `async_sessionmaker` | 创建 `AsyncSession` 的工厂函数 |
| `AsyncSession` | 一次数据库会话，所有 CRUD 的入口 |
| `DeclarativeBase` | 所有模型类继承的基类 |
| `asyncpg` | PostgreSQL 的纯异步驱动 |

### 引擎配置

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
    expire_on_commit=False,   # 提交后不过期对象（async 下推荐）
)

class Base(DeclarativeBase):
    pass
```

> `expire_on_commit=False`：提交后对象属性不会过期，在 async 模式下尤其重要——否则访问属性时会触发 lazy load 去刷新，在 Python 3.13 的 greenlet 下会直接报错。

### CRUD 操作（纯异步）

**INSERT：**

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

**SELECT：**

```python
async with AsyncSessionLocal() as db:
    stmt = select(Session).where(Session.id == session_id)
    result = await db.execute(stmt)
    s = result.scalar_one()

    # 统计
    count = await db.execute(select(func.count(Message.id)))
    total = count.scalar()
```

**UPDATE：**

```python
async with AsyncSessionLocal() as db:
    stmt = select(Session).where(Session.id == session_id)
    s = (await db.execute(stmt)).scalar_one()
    s.title = "新标题"
    s.status = "archived"
    await db.commit()
```

**DELETE（级联）：**

```python
async with AsyncSessionLocal() as db:
    s = (await db.execute(select(Session).where(Session.id == session_id))).scalar_one()
    await db.delete(s)
    await db.commit()
    # 关联的 Message 自动级联删除（cascade="all, delete-orphan"）
```

### 事务边界与回滚

`flush()` 只是把 SQL 发到数据库（在事务内），`commit()` 才真正持久化。如果 flush 后异常未捕获，事务会自动回滚。

```python
async with AsyncSessionLocal() as db:
    session = Session(title="会被回滚")
    db.add(session)
    await db.flush()
    # flush 后数据已经发送到数据库，但在事务中对外不可见

    await db.rollback()     # 回滚：所有 flush 的内容撤销

    # 验证回滚生效
    check = await db.execute(
        select(Session).where(Session.id == session.id)
    )
    exists = check.scalar_one_or_none() is not None
    print(f"回滚后仍存在: {exists}")  # False
```

### N+1 问题与 selectinload

这是 ORM 最常见的性能坑。查 1 个 Session 后遍历它的 Tasks，再遍历每个 Task 的 Steps——每一层都发 SQL，N 个关联对象就 N 次查询。

```python
# ❌ N+1 问题
async with AsyncSessionLocal() as db:
    s = (await db.execute(select(Session).where(Session.id == sid))).scalar_one()
    tasks = (await db.execute(select(Task).where(Task.session_id == sid))).scalars()
    for t in tasks:
        steps = (await db.execute(select(Step).where(Step.task_id == t.id))).scalars()
        # ← 每个 Task 都查一次 Step = N 次额外查询
```

**用 `selectinload` 解决：**

```python
from sqlalchemy.orm import selectinload

async with AsyncSessionLocal() as db:
    stmt = (
        select(Task)
        .where(Task.id == task_id)
        .options(
            selectinload(Task.session),       # 预加载所属 Session
            selectinload(Task.steps)          # 预加载所有 Steps
            .selectinload(Step.tool_calls)    # 嵌套预加载 ToolCalls
        )
    )
    task = (await db.execute(stmt)).scalar_one()
    # 此时 task.session、task.steps[0].tool_calls 全部已加载，不再触发查询
```

| 方式 | 查询次数 | 何时用 |
|---|---|---|
| 不加 selectinload | 1 + N（每个关联查一次） | 不需要关联数据时 |
| `selectinload` | 1 + 1（IN 查询批量加载） | 需要关联数据，且关联数量可控 |
| `joinedload` | 1（JOIN 一次全查） | 一对一/一对少的关联 |

### Python 3.13 greenlet 兼容问题

在 Python 3.13 + SQLAlchemy 2.0 async 环境下，访问未预加载的关系属性会直接报错：

```
sqlalchemy.exc.MissingGreenlet: greenlet_spawn has not been called;
can't call await_only() here. Was IO attempted in an unexpected place?
```

**解决方案（三选一，推荐 1）：**

1. **所有关系使用 `selectinload` 预加载**（最推荐）
   ```python
   stmt = select(Task).options(selectinload(Task.session), selectinload(Task.steps))
   ```

2. **关系定义时直接设置 `lazy="selectin"`**
   ```python
   steps = relationship("Step", lazy="selectin")
   ```

3. **不要访问未预加载的关系属性** —— 需要关联数据时用显式 `select` 查询代替 `obj.relation`

> `expire_on_commit=False` 也能减少触发点——提交后对象属性不会过期，不会在你无意中触发刷新。

## Alembic 迁移基本流程

Alembic 是 SQLAlchemy 官方的数据库迁移工具。每次模型变更（加表、改字段、加索引）都通过它生成版本化的迁移脚本，保证开发/测试/生产环境的 schema 一致。

### 初始化

```bash
pip install alembic
alembic init -t async alembic
```

`-t async` 生成异步模式的 `env.py` 模板，自动配置 `run_async` 和异步引擎。

### 配置 env.py

核心：让 Alembic 知道你的模型定义在哪里，以及用哪个数据库。

```python
import sys
from pathlib import Path

# 添加项目路径，让 Alembic 能 import 到 models
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "learn/day3"))

from learn.day3.models import Base

# 告诉 Alembic 对比哪个 metadata
target_metadata = Base.metadata

# 覆盖数据库 URL
config.set_main_option(
    "sqlalchemy.url",
    "postgresql+asyncpg://dev:xxx@localhost:5432/ai_tasks"
)
```

### 日常工作流

```bash
# 1. 修改 models.py（加字段、新建表等）

# 2. 生成迁移（自动对比 Base.metadata 和数据库当前状态）
alembic revision --autogenerate -m "add: task timeout column"

# 3. 应用迁移
alembic upgrade head

# 4. 查看状态
alembic current          # 当前版本
alembic history          # 迁移历史

# 5. 回滚（如果需要）
alembic downgrade -1     # 回滚一个版本
```

### 踩坑：生成空迁移

Alembic 对比的是 `Base.metadata` 和数据库中 `alembic_version` 表记录的当前版本。如果表已经存在但版本记录没有，autogenerate 检测不到差异 → 生成空迁移。

**解决方案：** 确保数据库干净（`drop_all` 后重建），让首次迁移从零开始检测。

### migration 文件解读

每次 `revision --autogenerate` 生成的迁移文件包含两个函数：

```python
def upgrade() -> None:
    """升级数据库：创建表、添加字段、创建索引"""
    op.create_table(
        'tasks',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('status', sa.String(20), default='pending'),
        ...
    )

def downgrade() -> None:
    """回滚数据库：删除表、删除字段、删除索引"""
    op.drop_table('tasks')
```

`upgrade()` 和 `downgrade()` 必须对称——upgrade 做什么，downgrade 就撤销什么。

## PostgreSQL 表设计、索引、唯一约束、连接池

### 表设计决策

| 设计点 | 选择 | 理由 |
|---|---|---|
| 主键类型 | `String(36)` UUID | 分布式友好，API 层可直接使用，不泄露自增顺序 |
| 时间字段 | `DateTime(timezone=True)` | 多时区部署时避免时间错乱 |
| 消息内容 | `Text`（无长度限制） | AI 回复可能很长，不适合用 `VARCHAR(n)` |
| JSON 字段 | PostgreSQL 原生 `JSON` 类型 | 支持 JSONB 查询（`WHERE input_payload->>'key' = 'value'`），比存 TEXT 后反序列快 |
| 级联删除 | `ondelete="CASCADE"` | 删 Session 时 Message/Task/Step/ToolCall 自动清理 |
| 关系加载 | 默认不设 `lazy`，需要时 `selectinload` | 避免隐式 lazy load 触发 N+1 |

### 索引设计

索引不是越多越好——每次写入都要更新索引。只为**高频查询条件**建索引，且优先用**复合索引**覆盖多个列。

```text
┌────────────────────────────────┬──────────────────────────────────────┐
│ 索引                            │ 覆盖的查询场景                        │
├────────────────────────────────┼──────────────────────────────────────┤
│ ix_sessions_status_created     │ "查最近活跃会话"                       │
│ (status, created_at)           │ WHERE status='active' ORDER BY        │
│                                │ created_at DESC                       │
├────────────────────────────────┼──────────────────────────────────────┤
│ ix_messages_session_created    │ "查某会话的消息时间线"                   │
│ (session_id, created_at)       │ WHERE session_id=? ORDER BY           │
│                                │ created_at                            │
├────────────────────────────────┼──────────────────────────────────────┤
│ ix_tasks_status_created        │ "查最近失败的任务"                      │
│ (status, created_at)           │ WHERE status='failed' ORDER BY         │
│                                │ created_at DESC                       │
├────────────────────────────────┼──────────────────────────────────────┤
│ ix_steps_task_status           │ "查某任务进行中的步骤"                  │
│ (task_id, status)              │ WHERE task_id=? AND status='running'  │
├────────────────────────────────┼──────────────────────────────────────┤
│ ix_toolcalls_step              │ "查某步骤的工具调用"                    │
│ (step_id)                      │ WHERE step_id=?                       │
└────────────────────────────────┴──────────────────────────────────────┘
```

```python
# 在表定义中声明
__table_args__ = (
    Index("ix_sessions_status_created", "status", "created_at"),
    Index("ix_messages_session_created", "session_id", "created_at"),
    Index("ix_tasks_status_created", "status", "created_at"),
    Index("ix_steps_task_status", "task_id", "status"),
    Index("ix_toolcalls_step", "step_id"),
)
```

> 复合索引的列顺序很重要：**先等值条件列，后范围/排序列**。例如 `(task_id, status)` 先按 task_id 定位，再按 status 过滤。

### 唯一约束

两处唯一约束：

```python
# 1. Task 表：idempotent_key 必须唯一
idempotent_key = Column(String(128), nullable=False, unique=True)
# → 应用层：先查后写；数据库层：IntegrityError 兜底

# 2. Step 表：(task_id, sequence) 组合唯一
__table_args__ = (
    UniqueConstraint("task_id", "sequence", name="uq_steps_task_sequence"),
)
# → 同一任务的同一顺序位置只能有一个步骤
```

### 连接池配置与监控

```python
engine = create_async_engine(
    DATABASE_URL,
    pool_size=10,             # 常驻连接数
    max_overflow=20,          # 超出 pool_size 后最多再创建 20 个
    pool_pre_ping=True,       # 使用前先 ping（检测断连）
    pool_recycle=3600,        # 1 小时回收连接
    pool_timeout=30,          # 等待可用连接的超时秒数
)
```

| 参数 | 含义 | 建议值 |
|---|---|---|
| `pool_size` | 池中常驻连接数 | CPU 核数 × (2~4) |
| `max_overflow` | 溢出连接数上限 | 总连接 = pool_size + overflow，不超过 DB 的 `max_connections` |
| `pool_pre_ping` | 取出连接前 ping 一下 | **生产环境必须 True**——数据库重启后连接会断开 |
| `pool_recycle` | 连接最大存活时间 | 设得比数据库的 `connection_timeout` 小 |
| `pool_timeout` | 等待可用连接的超时 | 30s 是默认值，高峰时可能需要调大 |

**实时监控连接池状态：**

```python
pool = engine.pool
print(f"空闲连接:       {pool.size()}")
print(f"溢出连接:       {pool.overflow()}")
print(f"已归还:         {pool.checkedin()}")
print(f"使用中:         {pool.checkedout()}")
print(f"全部连接:       {pool.total()}")
```

> `pool_pre_ping=True` 是最重要的生产环境配置。数据库重启后，池中的连接全部断开，如果不 ping，下次查询直接报 `connection closed`——ping 检测到断连后自动重新建立连接。

## 幂等 key、状态流转、失败原因记录

### 幂等 key 设计

用户短时间内重试同一个请求，后端不能重复执行。幂等 key 就是请求的唯一标识——相同的 key 只处理一次。

```python
# Task 表中
idempotent_key = Column(String(128), nullable=False, unique=True)
```

**双重防护机制：**

```python
async def upsert_task(db, idempotent_key, **kwargs):
    # 第一层：应用层检查（快速路径）
    existing = (
        await db.execute(select(Task).where(Task.idempotent_key == idempotent_key))
    ).scalar_one_or_none()

    if existing:
        print(f"⚠ 任务已存在（幂等返回）: {existing.id}")
        return existing

    try:
        task = Task(idempotent_key=idempotent_key, **kwargs)
        db.add(task)
        await db.flush()
        return task
    except IntegrityError:
        # 第二层：数据库层兜底（竞态场景）
        await db.rollback()
        return (
            await db.execute(select(Task).where(Task.idempotent_key == idempotent_key))
        ).scalar_one()
```

> 在高并发场景下，"先查后写"仍有竞态条件。`IntegrityError` 捕获作为最终防线。生产环境可直接用 PostgreSQL 的 `INSERT ... ON CONFLICT (idempotent_key) DO NOTHING RETURNING *`，原子操作更安全。

### 状态流转

AI 任务的状态机：从 `pending` 开始，经过若干中间步骤到达终态。

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
step = Step(task_id=task.id, sequence=0, name="PARSE", status="success", ...)
db.add(step)

step2 = Step(task_id=task.id, sequence=1, name="EXECUTE", status="success", ...)
db.add(step2)

# 完成
task.status = "success"
task.progress = 100.0
await db.commit()
```

### 失败原因记录

当任务或步骤失败时，必须记录足够的信息用于后续排查——不只是"失败了"，而是"为什么失败"。

```python
# Task 失败
task.status = "failed"
task.error_type = "ConnectionError"
task.error_message = "部署失败：目标主机 10.0.1.5:22 连接被拒绝，已重试 3 次"
task.retry_count += 1

# Step 失败
step.status = "failed"
step.error_message = "EXECUTE 阶段：调用 openai.chat.completions.create 超时（60s）"

# ToolCall 失败
tool_call.status = "timeout"
tool_call.error_message = "read_file: 文件 /path/to/large.log 读取超时（>30s）"
```

**失败任务查询：**

```python
# 查最近失败的任务
stmt = (
    select(Task)
    .where(Task.status == "failed")
    .order_by(Task.updated_at.desc())
    .limit(20)
)
failed_tasks = (await db.execute(stmt)).scalars()

# 按状态统计（仪表盘用）
for status in ["pending", "running", "success", "failed"]:
    cnt = await db.execute(
        select(func.count(Task.id)).where(Task.status == status)
    )
    print(f"{status}: {cnt.scalar()}")
```

**排查工作流：**

```text
查任务状态 → 如果 failed：
  1. task.error_type, task.error_message  ← 宏观原因
  2. 查 Steps WHERE task_id=? ORDER BY sequence
     → 找到 status='failed' 的步骤    ← 哪个阶段挂了
  3. 查 ToolCalls WHERE step_id=?
     → 找到失败的工具调用           ← 具体哪个操作失败
```

> 三层失败记录（Task → Step → ToolCall）让排查从宏观到微观逐层下钻，不需要翻日志就能定位到具体工具调用的具体参数和返回值。

## 如何通过数据库记录复盘一次完整执行过程

从数据库还原一次 AI 任务的**完整执行过程**——用户说了什么、系统分解成了哪些步骤、每一步调用了哪些工具、每一步的输入输出和耗时。

### 查询代码

```python
async def full_trace(task_id: str):
    async with AsyncSessionLocal() as db:
        # 1. 查任务 + 所属会话
        stmt = select(Task).where(Task.id == task_id).options(
            selectinload(Task.session)
            .selectinload(Session.messages)
        )
        task = (await db.execute(stmt)).scalar_one()

        session = task.session
        messages = session.messages

        # 2. 查执行步骤 + 工具调用（嵌套预加载）
        stmt = (
            select(Step)
            .where(Step.task_id == task_id)
            .options(selectinload(Step.tool_calls))
            .order_by(Step.sequence)
        )
        steps = (await db.execute(stmt)).scalars()

        # 3. 组装报告...
```

### 复盘报告输出

```text
══════════════════════════════════════════
📋 任务复盘报告
══════════════════════════════════════════

会话: 审查 PR #99 — 修复登录超时 Bug
状态: success  |  类型: code_review
创建: 2026-06-25 14:30:00+08:00  |  耗时: 2.3s

────────────────────────────────────────
📝 对话记录
────────────────────────────────────────
  [14:30:00] user     帮我 review PR #99，重点看登录超时的修复
  [14:30:01] assistant 好的，正在拉取 PR 并分析 diff...

────────────────────────────────────────
⚙ 执行步骤
────────────────────────────────────────
  [0] PARSE — success (0.4s)
      🛠 read_file("src/auth/login.py") → success (0.1s)
      🛠 read_file("src/auth/session.py") → success (0.1s)
  [1] EXECUTE — success (1.2s)
      🛠 run_tests("test_auth.py") → success (0.8s)
      🛠 lint_check("src/auth/") → success (0.2s)
  [2] VERIFY — success (0.5s)
      🛠 compare_diff("PR#99", base="main") → success (0.3s)

────────────────────────────────────────
📊 统计
────────────────────────────────────────
  对话数: 2  |  步骤数: 3  |  工具调用: 5
  成功: 3/3 步骤, 5/5 工具调用
```

> 全链路复盘是运维利器：生产环境出了问题，不用去翻日志拼凑，直接查数据库就能还原"用户说了什么 → 系统分解成了哪些步骤 → 每一步调了什么工具 → 哪一步挂了、为什么"。

### 关键 SQL

如果不用 ORM，用原生 SQL 也能实现同样的复盘效果：

```sql
-- 查任务全链路（一条 SQL 返回全部执行细节）
SELECT
    t.id AS task_id, t.type, t.status, t.progress,
    t.error_message, t.created_at,
    s.sequence, s.name AS step_name, s.status AS step_status,
    s.input_data, s.output_data, s.error_message AS step_error,
    tc.tool_name, tc.input_args, tc.output_result, tc.status AS tool_status
FROM tasks t
JOIN steps s ON s.task_id = t.id
LEFT JOIN tool_calls tc ON tc.step_id = s.id
WHERE t.id = $1
ORDER BY s.sequence, tc.id;
```

这条 SQL 一条查询返回任务的全部执行细节——从 Task 到 Step 到 ToolCall，扁平化为一张宽表，可以直接导出用于分析。

## 踩坑记录

| 问题 | 原因 | 解决 |
|---|---|---|
| `MissingGreenlet` 错误 | Python 3.13 greenlet 兼容问题，lazy load 在 async 下失败 | 全部用 `selectinload` 预加载 |
| Alembic 生成空迁移 | 表已存在，autogenerate 检测不到差异 | 先 `drop_all` 再 `revision --autogenerate` |
| 密码被终端脱敏 | Hermes 终端对 `***` 做了替换 | 用环境变量传递密码 |
| `unique constraint` 冲突 | 同一 script 多次运行残留数据 | 每次运行前先 `_clean.py` 清理 |
| `fetchall()` 不能用 `await` | 异步模式下 fetchall() 是同步方法 | 用 `result.all()` 替代 |
