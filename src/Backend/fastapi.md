---
title: fastapi
icon: 
order: 4
editLink: false
cover: 
category:
  - 知识点
tag:
  - 后端框架
---
# Python 异步
## asyncio 事件循环、协程、Task、Future
### asyncio是什么?
是 Python 内置的异步 I/O 框架，用一个事件循环同时跑多个协程，遇到 I/O 等待就切走，不等。
| 概念 | 是什么 | 类比 |
|--------|--------|--------|
| 协程对象（Coroutine） | `async def` 的返回值，还没开始执行 | 写在纸上的待办事项 |
| Task（Future 的子类） | 协程被 `create_task()` 包装并提交给事件循环 | 待办事项已经交到调度员手里了 |
| Future（通用） | 任何"未来才会有结果"的占位符，可以手动 `set_result()` | 取货单——谁都可以往里放结果 |

> Task 是 Future 的子类：Task = Future + 包装协程 + 已调度到事件循环。所以 Task 既是 Future，也是一个正在跑的协程的句柄。
### 协程 (coroutine)
用`async def `定义的函数，调用它返回一个 coroutine 对象，不会立即执行
#### 调试工具：tracemalloc（追踪内存分配）
可以用来追踪对象是在哪一行代码被创建的，常用于调试"协程未 await"等内存相关警告。
``` python
import tracemalloc
tracemalloc.start()
```
#### 串行&并发
`await f(1);await f(2)`串行
`await asyncio.gather(f(1),f(2))`并发
### Task
正在后台执行的协程
`asyncio.create_task()`:
1. 包装：把 协程包装成一个 Task 对象
2. 调度：告诉事件循环"这个任务可以开始跑了"
3. 立即返回：不等任务完成，立刻返回 Task 对象给你
#### raise
手动触发（抛出）一个异常，让程序进入异常处理流程。

> `raise` 是 Python 通用关键字，不属于 asyncio 专属功能。这里提它是因为 Task 取消（`task.cancel()`）本质上就是向协程注入 `CancelledError` 异常。
### 事件循环是什么?
事件循环是 asyncio 的核心引擎，负责：
1. 调度和执行所有协程
2. 管理哪些任务在运行、哪些在等待
3. 处理 I/O 事件和定时器
可以把它理解为一个"调度员"，手里拿着所有任务的清单，决定谁先跑、谁等待。

**`asyncio.run()`** — Python 3.7+ 的标准入口：创建事件循环 → 运行协程 → 关闭循环。一个线程只应调用一次。
### Future：手动控制结果
Future 是一个"承诺未来的结果"的容器，就像一张"欠条"或"取货单"。
`get_running_loop()`:
获取当前正在运行的事件循环（Event Loop）
1. 只能从协程内部调用	必须在 async 函数中使用
2. 没有运行中的 loop 会报错	如果没在 asyncio.run() 内运行，会抛出 RuntimeError
3. 获取的是"当前"的 loop	每个线程只能有一个运行中的事件循环
`create_future()`
创建一个 Future 对象（占位符）
```python
result = await future  # 阻塞直到有人调用 future.set_result() 或 future.set_exception()
```
### 什么时候用 asyncio，什么时候不用？
用 asyncio：
- 大量 I/O 等待（HTTP 请求、数据库查询、消息队列）
- 不需要 CPU 密集计算
- FastAPI就是典型场景 —— FastAPI 处理请求、Worker 消费消息、调用 LLM API，全是 I/O
不用 asyncio：
- CPU 密集计算（图像处理、模型推理）→ 用线程池或进程池
- 简单脚本，不需要并发 → 同步代码更简单
## await 、 async with 、 async for 、异步生成器
### await
`await`:暂停当前协程，让出控制权给事件循环，等待后面的对象完成，然后取回结果(后面必须是 "可等待对象":coroutine、task、future)
### async with
`async with`管理异步资源（数据库连接、网络会话）
async with 帮你自动做了 try...finally，保证无论任务成功还是报错，都会释放。
### 与 async with 直接相关的方法：

| 方法 | 触发时机 | 作用 |
|----------|----------|------|
| `__aenter__` | `async with` 进入时 | 异步进入，返回值赋给 `as` 后的变量 |
| `__aexit__` | `async with` 退出时 | 异步退出，自动释放资源 |

> **注意区分**：`__init__`、`__str__`、`__add__` 是 Python 通用的魔术方法（构造/转字符串/运算符），与 `async with` 协议无关。放在一起容易混淆，以为它们也是 async 特有的。

```python
async with ... as conn:
```
`...`创建实例，实例上定义了 __aenter__ 和 __aexit__
`as conn`把 __aenter__ 的返回值赋给变量，方便调用其方法
### async for
`async for` 是异步版的 for 循环，用于遍历异步生成器（async generator）或异步可迭代对象（async iterable）。
每次进入循环前，都会隐式执行 await
#### 迭代变量（常见命名：`chunk`）
每次 `async for` 循环时，异步生成器 `yield` 出来的值赋给这个变量。

> `chunk` **只是一个变量名**，不是 Python 关键字——叫 `x`、`data`、`item` 都一样。之所以在流式/SSE 代码中常见，是因为它暗示"这是一个数据片段"。
#### yield
`yield` 是 Python 中"产出"或"吐出一个值"的关键字，它让函数变成一个生成器（Generator）——可以分多次返回值，而不是一次性返回所有结果。
总之，让函数可以分多次返回值，且每次返回后暂停（生成器）
### 异步生成器
异步生成器 = async def + yield 的组合体。
既有异步能力，又能分多次产出值的函数    
## 超时控制、取消传播、并发限制、锁、信号量
### 超时控制
`wait_for`:
result = await asyncio.wait_for(可等待对象, timeout=秒数)
超时时抛出 asyncio.TimeoutError
### 并发控制常用策略

> 注意：这些不是同一层次的概念。Semaphore 是真正的"限流"机制；as_completed 改变的是"结果处理顺序"；Queue+Worker 是"架构模式"；连接池是"资源管理"。各管各的层面，不能互相替换。

| 场景 | 手段 | 层面 |
|------|------|------|
| 限制同时运行的任务数 | `asyncio.Semaphore(n)` | 并发限流 |
| 分批处理，批次间有边界 | 分批执行（Batch Processing） | 任务组织 |
| 谁先完成先处理结果 | `asyncio.as_completed()` | 结果处理顺序 |
| 大量任务持续流入 | `asyncio.Queue` + Worker 协程 | 架构模式 |
| 复用昂贵资源（如 HTTP 连接） | 连接池（Connection Pool） | 资源管理
### 信号量
`semaphore`(信号量)限制同时运行的任务数量
### 锁
锁确保同一时间只有一个协程能执行 读→等待→写 这三步，其他协程必须排队。
| 操作 | 写法 |
|------|------|
| 创建 | `lock = asyncio.Lock()` |
| 获取 | `await lock.acquire()` 或 `async with lock:` |
| 释放 | `lock.release()` 或离开 `async with` 代码块 |
### 取消传播
`shield`保护的是协程本身，不是外部 task
`cancel()` 被屏蔽，协程照常执行
`await asyncio.shield(op)`:即使被取消也会执行完op
# FastAPI

FastAPI 是基于 Starlette 的现代 Python Web 框架，核心卖点：
- **原生异步** — 所有路由天然支持 `async def`，与 asyncio 生态无缝衔接
- **Pydantic 类型驱动** — 请求/响应自动校验、自动生成 OpenAPI 文档
- **依赖注入** — `Depends()` 复用逻辑、注入资源、鉴权

## 请求生命周期（一次完整调用）
1. 前端发起 REST 请求调 `/chat` 接口
2. 请求经过 **中间件**：保安拦住，登记 `request_id`，开始计时
3. 中间件通过 `call_next` 放行
4. 请求进入 `/chat` 路由（相当于 Spring 的 `@PostMapping`），执行依赖注入 → 路由处理 → 返回 `ChatResponse`
5. 响应经过 **中间件** 的后半段：保安在 Headers 贴上耗时标签
6. 前端收到完整的 REST 响应
## 路由 / 依赖注入 / 中间件 / 生命周期
### 生命周期管理
`lifespan` 是 FastAPI 的应用级启动/关闭钩子，用 `@asynccontextmanager`（来自 `contextlib`）实现：

- **`yield` 之前** → 启动时执行（创建连接池、加载模型、预热缓存）
- **`yield` 之后** → 关闭时执行（释放连接、清理资源）

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # ═══ 启动：yield 之前 ═══
    ...
    yield  # ← 应用运行中
    # ═══ 关闭：yield 之后 ═══
    ...
```
```python
app.state.httpx_client = httpx.AsyncClient(
        timeout=httpx.Timeout(10.0),
        limits=httpx.Limits(max_connections=20),
    )
```
`app.state`全局对象
`httpx.AsyncClient(...)`：创建了一个异步的 HTTP 客户端连接池
`app=FastAPI()`：
```python
app = FastAPI(
    # 文档信息
    title="我的超牛 AI 平台",
    summary="一键生成复杂业务的 AI 后端",
    description="""
    ## 欢迎使用本系统！
    * 所有请求需在 Header 中携带 `X-Token`
    * 速率限制：每个 IP 每分钟最多 100 次
    """,
    version="2.0.4",
    
    # 文档路径安全（防扫描）
    docs_url="/my-secret-swagger-path-999",  # Swagger UI
    redoc_url=None,                          # 关闭 ReDoc
    
    # 多环境配置
    servers=[
        {"url": "https://api.production.com", "description": "生产环境"},
        {"url": "http://127.0.0.1:8000", "description": "本地开发"},
    ],
    
    # 全局依赖（所有接口默认需 Token 验证）
    dependencies=[Depends(verify_global_token)]
)
```
| 参数 | 作用 |
|--------|--------|
| `title` / `summary` / `description` / `version` | API 文档基本信息，用于展示项目名称、简介和版本号 |
| `docs_url` | Swagger UI 访问路径（可修改默认值以减少被扫描风险） |
| `redoc_url` | ReDoc 文档访问路径（设置为 `None` 可关闭） |
| `servers` | 配置多个环境地址（开发、测试、生产等） |
| `dependencies` | 全局依赖项，所有接口自动生效（如鉴权、日志、限流等） |
### 依赖注入
FastAPI 的依赖注入系统用 Depends 实现
可以共享逻辑、验证权限、注入资源
#### 函数式依赖
```python
def get_httpx_client(request: Request):
    """注入全局 httpx 客户端"""
    return request.app.state.httpx_client
```
#### 可复用式依赖
```python
def get_session_id(session_id: str | None = Query(None)):
    """如果没有 session_id，生成一个新的"""
    import uuid
    return session_id or str(uuid.uuid4())[:8]
```
#### 类依赖
```python
class RequestTimer:
    """统计请求耗时的依赖 —— 用在有副作用的场景"""

    def __init__(self): #初始化状态
        self.start: float = 0

    async def __call__(self, request: Request):  #类可调用
        self.start = time.perf_counter()
        yield  # 暂停，等路由处理完后再继续执行下面代码
        elapsed = (time.perf_counter() - self.start) * 1000
        print(f"   [{request.method} {request.url.path}] {elapsed:.1f}ms")

```
### 中间件
双向拦截。一个 `HTTP` 请求在到达你写的业务路由之前，必须由外向内穿过中间件；路由处理完后，生成的响应在返回给客户端之前，又必须由内向外再次穿过中间件。
你可以把中间件想象成大楼的保安（物业管家），把路由函数想象成办公室里的业务员：

外层拦截（请求进来）：
有访客（请求）来到大楼。保安在前台拦住他，让他刷身份证、登记信息，并给他贴上一个访客胸牌（`request.state.request_id`）。同时，保安看了一眼手表，记录下他进楼的时间（`start`）。

放行递交（`call_next`）：
保安挥挥手说：“行了，你上 3 楼找业务员吧。”这就是代码里的 `response = await call_next(request)`。请求此时才真正上楼去找路由函数办业务。

内层拦截（响应出去）：
业务员办完事，给访客塞了一份合同（`response`）。访客下楼准备离开大楼。

外层收尾（最终返回）：
保安在门口再次拦住访客，摘掉他的访客胸牌。保安看了一眼手表，算了一下他在楼里待了多久，然后把“出楼时间戳”和“胸牌号”盖在合同的封面上（`response.headers`）。最后，保安开门，访客带着合同正式离开（`return response`）。
#### 异常处理器
例：
```python
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "error_code": f"HTTP_{exc.status_code}"},
    )
```
#### Middleware
一个请求从客户端发来到最后拿到响应，会两次穿过中间件：进去时穿过一次（前半段），出来时又穿过一次（后半段）。
```python
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    """为每个请求添加追踪 ID"""
    import uuid
    # ───【第一阶段：请求刚进来，还没到具体路由】───
    request_id = str(uuid.uuid4())[:8] # 生成一个 8 位的随机 ID（比如 "a1b2c3d4"）
    request.state.request_id = request_id # 把 ID 塞进请求的“随身口袋” state 里
    start = time.perf_counter() # 掏出秒表，开始计时
    # ───【第二阶段：跨越分水岭，交棒】───
    response = await call_next(request)  # ← 核心：把请求往洋葱内层递交
    # ───【第三阶段：路由处理完了，响应准备返回给前端】───
    elapsed = time.perf_counter() - start # 啪，按下秒表，计算耗时
    # 把数据塞进 HTTP 响应头（Response Headers）里，前端可以在浏览器控制台看到
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = f"{elapsed*1000:.0f}ms"
    return response # 正式吐给前端
```
### 路由
基础例:
```python
@app.get("/health")
async def health_check():
    """健康检查"""
    uptime = time.time() - app.state.start_time
    return {"status": "ok", "uptime_seconds": round(uptime, 1)}
```
`Annotated`:[ 基础类型 , 元数据1 , 元数据2 , ... ]
`session_id: Annotated[str, Depends(get_session_id)]`
第一部分 str（基础类型,第二部分 Depends(get_session_id)（元数据 / Metadata）
## Pydantic 请求模型、响应模型、配置模型
### 请求模型
```python
class ChatRequest(BaseModel):
    """对话请求模型"""
    message: str = Field(..., min_length=1, max_length=2000, description="用户消息")
    session_id: str | None = Field(None, description="会话ID, 可选")
```
### 响应模型
```python
class ChatResponse(BaseModel):
    """对话响应模型"""
    reply: str
    session_id: str
    elapsed_ms: float
```
### 配置模型
```python
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    
    model: str = "gpt-4"
    max_tokens: int = 2048
    temperature: float = 0.7

settings = Settings()
```

> Pydantic v2 中 `class Config` 改为 `model_config = SettingsConfigDict(...)`。`BaseSettings` 移到了独立的 `pydantic-settings` 包。
## 异步 HTTP 调用、连接池、超时、重试
```text
客户端发来请求 → /async-fetch
    ↓
① FastAPI 接收请求（事件循环）
    ↓
② 注入 http_client（从连接池拿一个空闲连接）
    ↓
③ await http_client.get(url)  ← 发起 HTTP 请求
    ↓
④ 等待上游响应的同时：
   - 当前协程暂停（让出控制权）
   - 事件循环去处理其他请求 
   - 不阻塞服务器！
    ↓
⑤ 上游响应返回 → 协程被唤醒
    ↓
⑥ 返回 JSON 给客户端
```

> `Query()` 等参数声明详见「路由进阶」。
### 超时
```python
try:
        return await fetch_with_retry(http_client, url)
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="上游超时")
```
### 重试
`@async_retry` 不是标准库，通常用 `tenacity` 实现：

```python
from tenacity import retry, stop_after_attempt, wait_fixed

@retry(stop=stop_after_attempt(3), wait=wait_fixed(0.3))
async def fetch_with_retry(http_client: httpx.AsyncClient, url: str):
    resp = await http_client.get(url, params={"delay": 1})
    resp.raise_for_status()
    return {
        "url": url,
        "status": resp.status_code,
        "content_length": len(resp.content),
    }
```

### 连接池

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # ========== 启动时：创建连接池 ==========
    async with httpx.AsyncClient(
        timeout=30.0,
        limits=httpx.Limits(max_keepalive_connections=10),
    ) as client:
        # 把 client 注入到 app.state 中
        app.state.client = client
        yield  # 👈 应用运行期间，连接池一直活着
```

流程

```text
应用启动
    │
    ▼
创建连接池
    │
    ▼
yield
    │
    ├── 请求1：获取连接 → 执行业务 → 归还连接
    │
    ├── 请求2：获取连接 → 执行业务 → 归还连接
    │
    ├── 请求3：获取连接 → 执行业务 → 归还连接
    │
    └── ... 所有请求共享同一个连接池
    │
    ▼
应用关闭
    │
    ▼
释放连接池资源
    │
    ▼
退出
```

## SSE 流式响应、心跳、断连处理和资源释放

`/stream`
SSE（Server-Sent Events）让服务端可以**分多次**向客户端推送数据，而不是一次性返回。
SSE 协议格式：

```text
event: <事件类型>\n
data: <JSON数据>\n\n
: 注释行以冒号开头，用于心跳
```

### SSE 流式响应

`StreamingResponse` 是 FastAPI 自带的流式响应类，接收一个异步生成器（而不是字典或 Pydantic 模型），边生成边推送。

```python
@app.post("/stream")
async def stream(request: Request, body: StreamRequest):
    """SSE 流式端点"""
    return StreamingResponse(
        sse_event_generator(request, body.message, body.steps),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",    # 禁止浏览器缓存
            "Connection": "keep-alive",     # 保持长连接
            "X-Accel-Buffering": "no",      # 禁用 Nginx 代理缓冲
        },
    )
```

`sse_event_generator` 就是异步生成器，内部有 `yield`。每次 `yield` 吐出一行格式化好的 SSE 字符串后函数暂停，等客户端收完这块数据，框架再驱动它继续往下走。

### 心跳机制

心跳机制解决长连接的死敌——"超时断开"。如果 AI 构思复杂回答卡了 30 秒，期间没有任何数据经过网络管道，中间的网关（Nginx、路由器、防火墙）会认为连接已死掉，暴力切断。

在 generator 的循环里每隔 N 次迭代插入一个 SSE 注释行（客户端不可见，但网关知道数据还在流动）：

```python
async def sse_event_generator(request: Request, message: str, steps: int):
    for i in range(steps):
        # 每 3 次迭代发一次心跳
        if i > 0 and i % 3 == 0:
            yield f": heartbeat {time.time()}\n\n"   # 注释行，浏览器不可见
        # ... 正常数据逻辑 ...
        yield format_sse("data", {...})
```

逻辑：

```text
用户请求
    ↓
建立 SSE 长连接
    ↓
服务器每隔一段时间发送一个 "注释包"
    ↓
数据块1 → 数据块2 → 数据块3 → :heartbeat → 数据块4 → ...
    ↓                      ↑
    └──────────────────────┘
    这个"注释包"告诉网关/客户端：
    "连接还活着，别断开我！"
```

### 断连处理

客户端随时可能关闭标签页或断网，服务端必须感知并停止生成：

| 机制 | 说明 |
|------|------|
| 主动检查 | 每次循环迭代前调用 `await request.is_disconnected()`，返回 `True` 就 `break` |
| 被动捕获 | Starlette 检测到客户端断开后取消 Task，`CancelledError` 抛进生成器 |

> `asyncio.CancelledError` 不是网络异常，而是 Starlette 把当前请求的 Task 取消掉 → 生成器里的 `await` 点收到取消信号 → 异常传播进生成器。这是异步框架的"强制终止"机制。

### 资源释放

生成器被中断后必须清理临时状态：

```python
finally:
    # 生成器无论正常结束/客户端断开/异常，都会走到这里
    print(f"[SSE] 流结束，释放资源")
    # 清理计数器、重置状态、关闭子连接等
```

### 完整生成器骨架

把心跳、断连检测、错误处理放在一起：

```python
async def sse_event_generator(request: Request, message: str, steps: int):
    """SSE 事件生成器 —— 心跳 + 断连检测 + 错误处理"""
    try:
        for i in range(steps):
            # ① 主动检查：客户端还在不在
            if await request.is_disconnected():
                break

            # ② 心跳：每 3 次迭代插入注释行，防止网关超时断连
            if i > 0 and i % 3 == 0:
                yield f": heartbeat {time.time()}\n\n"

            # ③ 业务数据
            yield format_sse("step", {"current": i + 1, "total": steps})
            await asyncio.sleep(0.5)

    except asyncio.CancelledError:
        # ④ 客户端断开 → Starlette 取消 Task → 异常传播到这里
        yield format_sse("error", {"message": "连接已断开"})
        raise   # 必须 re-raise，让框架知道任务已取消

    except Exception as e:
        # ⑤ 业务异常
        yield format_sse("error", {"message": str(e)})

    finally:
        # ⑥ 资源释放：无论哪种退出路径都会执行
        print(f"[SSE] 流结束")
```

> `format_sse(event_type, data)` 是工具函数：`f"event: {event_type}\ndata: {json.dumps(data)}\n\n"`