---
title: Hermes Agent Token 成本优化实战
icon: coin
order: 2
editLink: false
category:
  - 项目
  - AI
  - DevOps
tag:
  - Hermes
  - Token优化
  - DeepSeek
  - 成本控制
date: 2026-06-17
timeline: true
---

# 💰 Hermes Agent Token 成本优化实战

> 从 ¥31/3天 到 ¥0.05/天 — 一次完整的 Agent 推理成本排查与优化

## 背景

在维护 AI 情报站项目时，发现 DeepSeek API 账单异常：**3 天消耗 ¥31**，而实际业务只需要每天跑几次精选 + 几篇翻译，理论上一天花不了几毛钱。

排查下来发现两台机器（本地 Mac + 阿里云 ECS）都存在严重的 token 浪费问题。这篇文章记录完整的诊断过程和解决方案。

## 账单触发排查

6 月 16 日查看 DeepSeek 余额：

```
6/14 余额: ¥4.00+
6/16 余额: ¥0.59
3 天消耗: ¥31 → ~5M tokens
```

日均 1.7M tokens，对于每天只需要 3 次 LLM 调用的 pipeline 来说极不正常。开始逐项排查。

## 两机联合诊断

在 Mac 和 ECS 上同时运行 session + config + token 三重分析：

### 本机 Mac 发现

| 指标 | 值 | 判定 |
|------|-----|------|
| 当前会话消息数 | 312 条 | 🔴 极高 |
| 会话文件大小 | 16.8MB | 🔴 膨胀 |
| Session 文件数 | 64 个 | 🔴 堆积 |
| 工具输出累积 | 252K chars/会话 | 🔴 超载 |

### ECS 发现

| 指标 | 值 | 判定 |
|------|-----|------|
| Cron session 复用 | 跨天不清理 | 🟡 跨天累积 |
| 3 天 Agent 总 token | 5.08M | 🔴 远超合理值 |
| Agent per-call | ~100K token | 🔴 上下文膨胀 |

## 根因分析

排查出 **5 个根因**，两机高度一致：

### 1. `context_length` 缺失 → 压缩永不触发 🔴

这是最致命的。Hermes 的上下文压缩依赖一个参考值——模型的最大 context window。没有设置 `model.context_length`，压缩器无法判断"占用率"，**压缩机制完全失效**。

```yaml
# 缺失的关键配置
model:
  context_length: 131072  # DeepSeek V4 128K context
```

**后果**：每个会话可以无限增长，312 条消息全部保留在上下文中，每次新请求都带着完整的历史上下文。

### 2. Skills + Tool 定义全量注入 🔴

Hermes 会向每个 Agent 请求注入：
- 所有已安装 skills 的名称和描述（~69 skills × 各 50-200 字）
- 所有工具的函数签名和参数描述
- Personality 定义（12 种 personality 模板）

合计约 **18,000 token** 的 system prompt，即使 cron job 只是跑一个简单的 Python 脚本。

### 3. Tool 输出累积  🔴

Agent 模式每次调用工具（terminal、read_file 等），输出都会加入对话历史。一个 pipeline 脚本跑下来 30+ 次工具调用，累积 252K 字符的工具输出。

### 4. Session 跨天复用 🟡

`session_reset.idle_minutes` 设为了 1440（24 小时），Telegram 对话可能跨天不重置，旧上下文一直带进新对话。

### 5. Retry 加倍消耗 🟡

`api_max_retries: 3`，每次超时或 502 会重试 3 次，一次失败 = 4 倍 token 消耗。

## 解决方案

按影响程度分阶段实施：

### Phase 1: 止血（立即生效）

```bash
# 两台机都执行
hermes config set model.context_length 131072
hermes config set compression.threshold 0.3        # 50% → 30% 即触发压缩
hermes config set compression.hygiene_hard_message_limit 60  # 硬上限 400 → 60
hermes config set sessions.auto_prune true
hermes config set sessions.retention_days 3
hermes config set agent.api_max_retries 1           # 3 → 1，不再重试
hermes config set session_reset.idle_minutes 60     # 24h → 1h

# 清理历史 session
rm -rf ~/.hermes/sessions/session_*.jsonl
```

### Phase 2: 核心优化 — no_agent 模式

将 Agent 调度的 cron job 改为直接跑 Python 脚本：

```bash
# 之前：Agent 模式，每次 ~53 次 API 调用
hermes cron create "daily-scan" ...  # Agent 推理 → 调 tool → 再推理 → 再调 tool...

# 之后：no_agent，0 次 API 调用
hermes cron create "daily-scan-p1" --no_agent --script=~/.hermes/scripts/daily_scan_p1.py
```

Pipeline 从 2 个步骤拆成 8 个步骤，**其中 6 个用 no_agent 模式**：

```
08:00 daily_scan_p1   (no_agent)  ← RSS采集 + 去重 + 评分
08:03 daily_scan_p2   (no_agent)  ← DeepSeek 精选 + 论文 + 模型
08:15 telegram_daily   (Agent)    ← 总结推 Telegram（需要 LLM）
08:30 github_top5      (no_agent) ← GitHub 热榜采集
每30m incremental_scan  (no_agent) ← 增量扫描
每小时 token_watchdog    (no_agent) ← 预算监控
周日 weekly_briefing    (no_agent) ← 周报生成
周日 telegram_weekly    (Agent)   ← 周报推 Telegram
周五 zhihu_draft        (Agent)   ← 知乎草稿
```

### Phase 3: 工具集最小化

Agent 模式的 3 个 cron job，限制了 toolsets，避免加载不需要的工具定义：

```bash
hermes cron update <job_id> --enabled_toolsets terminal,file
```

砍掉 browser、web_search、vision 等重型工具的定义，进一步削减 system prompt。

## 优化效果

| 指标 | 优化前 | 优化后 | 降幅 |
|------|--------|--------|------|
| 日均 token 消耗 | ~1.7M | ~20K | **98.8%** |
| 日均成本 | ¥8-12 | ¥0.05 | **99.4%** |
| Agent per-call token | ~100K | ~20K | **80%** |
| 会话消息上限 | 无限制（312+） | 60 条 | 强制裁剪 |
| Session 磁盘占用 | 20MB × 2 | 自动清理 | 不再膨胀 |
| API 重试倍率 | ×4（3次重试） | ×1 | 失败不叠加 |
| 压缩触发点 | 永不触发 | 30% context | 及时裁剪 |

## 关键 Takeaways

1. **`model.context_length` 是最容易被忽略的关键配置**。没它 = 压缩器瞎了 = 会话无限增长 = token 泄露。

2. **Agent 编排不是免费的**。每次 Agent 推理需要把完整上下文发给 LLM。如果 99% 的调用只是跑脚本，用 `no_agent` 模式。

3. **Tool 输出是隐形成本**。terminal 的 stdout、read_file 的内容都会被注入上下文。一句 `cat largefile.log` 可能吃掉几万 token。

4. **Session 管理要主动**。`auto_prune`、`retention_days`、`idle_minutes` 三个配置缺一不可。

5. **周期性审计**。这次 ¥31 的账单如果没有主动查看，可能默默烧到 ¥100+。建议设置 token_watchdog 定时检查 API 余额。

## 附录：Token 看门狗脚本

```python
# ~/.hermes/scripts/token_watchdog.py
# 每小时检查 DeepSeek 余额，超预算自动暂停 cron + Telegram 告警

import os, requests, subprocess

API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DAILY_BUDGET = 4_000_000  # 4M tokens/day

resp = requests.get(
    "https://api.deepseek.com/user/balance",
    headers={"Authorization": f"Bearer {API_KEY}"}
)
data = resp.json()
balance = data.get("balance_infos", [{}])[0].get("total_balance", 0)
usage_today = data.get("usage_today", {}).get("total_tokens", 0)

pct = usage_today / DAILY_BUDGET

if pct >= 1.0:
    subprocess.run(["hermes", "cron", "pause-all"])
    print(f"🚨 预算耗尽！已暂停所有 cron。今日 {usage_today:,} tokens")
elif pct >= 0.85:
    print(f"⚠️ 预算告警！{pct:.0%} 已用（{usage_today:,} tokens）余额 ¥{balance:.2f}")
```

---

*优化于 2026-06-17 · 两机（Mac + ECS）同步实施*
