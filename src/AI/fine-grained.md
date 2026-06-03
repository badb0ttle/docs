---
title: AI 情报站 (fine-grained)
icon: robot
order: 1
editLink: false
category:
  - 项目
  - AI
tag:
  - RSS
  - Pipeline
  - SQLite
  - GitHub Pages
date: 2026-06-02
timeline: true
---

# 🤖 AI 情报站 (fine-grained)

> 每日全球 AI 技术动态自动采集站点

🌐 [ai.hjhai.xyz](https://ai.hjhai.xyz) | 📊 [仪表盘](https://ai.hjhai.xyz/dashboard.html) | 🗂️ [GitHub](https://github.com/badb0ttle/fine-grained)

## 概述

自动化 AI 情报聚合系统：每日扫描 15 个 RSS 源 → 质量评分 → LLM 精选翻译 → GitHub Pages 发布。

## 技术栈

| 层 | 技术 |
|----|------|
| 采集 | Python + feedparser + requests (15 RSS 源) |
| 存储 | SQLite + FTS5 全文索引 |
| Pipeline | 5 阶段：scanner → dedup → scorer → curator → publisher |
| 精选 | LLM (cron job) — 中文标题 + 摘要 + Why it matters |
| 前端 | 原生 JS + Chart.js (SPA + 仪表盘) |
| 部署 | GitHub Pages + 自定义域名 ai.hjhai.xyz |
| 调度 | Hermes Agent Cron (每日 8:00) |

## 数据源

- **AI Lab**: OpenAI, Google AI, DeepMind, Apple ML, NVIDIA
- **Paper**: ArXiv (cs.AI, cs.LG, cs.CL, cs.CV, stat.ML)
- **Community**: HuggingFace, PyTorch
- **Blog**: TechCrunch AI, VentureBeat AI
- **中文**: 雷锋网 AI

## Phase 1: 工程基座 ✅ (2026-06-02)

- [x] SQLite 数据库 (articles / sources / daily_stats + FTS5)
- [x] 5 阶段 Pipeline (scanner → dedup → scorer → curator → publisher)
- [x] 四维质量评分 (权威度 25% / 时效性 20% / 技术深度 30% / 相关性 25%)
- [x] 内部仪表盘 (Chart.js — 趋势图 / 信源健康 / 分类分布)
- [x] Scanner 重试机制 (2 次重试 + 指数退避)
- [x] 每日 8:00 cron 自动运行

**数据状态**: 268 篇文章 · 15 信源 · 评分均分 51.3 (最高 84.6)

## Phase 2: 内容深度 ✅ (2026-06-02)

- [x] Why it matters — 每篇精选附加「对从业者意味着什么」（💡 前端橙色高亮）
- [x] 论文深度解读 — Scanner 自动识别 ArXiv ID → paper_analyzer 结构化提取（方法/Benchmark/启发）
- [x] 趋势分析 — 35 关键词 7 天滑动窗口追踪，仪表盘热力模块（🚀飙升/📈上升/📉下降）
- [x] 每周深度简报 — LLM 生成连贯分析文章，每周日 10:00 cron 自动运行

**新增模块**: `trends.py` (趋势追踪) · `paper_analyzer.py` (论文解读) · `weekly_report.py` (周报生成)
**Cron**: 每日精选 (每日 8:00) + 每周简报 (周日 10:00)

## Phase 3: 知识图谱 ✅ (2026-06-02)

- [x] 模型追踪器 — `models` + `model_benchmarks` 表，LLM 自动提取模型名/Benchmark/参数
- [x] 排行榜 — `leaderboard.html` 模型 Benchmark 展示页面
- [x] 论文-代码链接 — GitHub Search API 双策略匹配 (ArXiv ID + 标题关键词)
- [x] `paper_code_link.py` — 自动关联论文 → GitHub 仓库

**新增模块**: `model_tracker.py` · `paper_code_link.py`
**新页面**: `leaderboard.html` (🏆 AI 模型排行榜)
**新表**: `models` + `model_benchmarks`

## Phase 4-6

详见 [ROADMAP.md](https://github.com/badb0ttle/fine-grained/blob/main/ROADMAP.md)

## Phase 4: 信源扩展 ✅ (2026-06-02)

- [x] 量子位 WP API 集成 — `scanner.py` 新增 `wp_api` 来源类型，抓取 qbitai.com
- [x] GitHub Trending 每日快照 — `github_trending.py` 纯正则解析，AI 关键词筛选
- [x] `github_trending` 表 — 仓库快照存储 + 论文交叉关联
- [x] 首页 🔥 Trending 展示区 — 卡片布局，论文关联徽章
- [x] `trending.json` 自动导出 + GitHub Pages 发布

**新增模块**: `github_trending.py` (GitHub Trending 抓取)
**新页面元素**: 首页 Trending 卡片区
**新表**: `github_trending`
**信源数**: 15 → 16

## Phase 5: 前端体验升级 ✅ (2026-06-03)

- [x] 全文搜索 — `search_index.json` 预生成 (440 篇文章)，导航栏搜索框实时模糊匹配，结果高亮，按标题/摘要/信源加权排序
- [x] 时间线视图 — `timeline.html` 水平时间轴，月份标记，文章卡片按时间排列 (色标分类)，分类筛选器
- [x] 话题聚类可视化 — `cluster_viz.py` (TF-IDF + SVD + 8-KMeans)，`clusters.html` Canvas 交互散点图 (悬停详情/点击跳转/聚簇筛选)
- [x] 阅读历史 + 偏好 — localStorage 已读淡化 (opacity) + ⭐ 收藏按钮 + 📖 继续阅读模块
- [x] 移动端 PWA — `manifest.json` + Service Worker (缓存优先静态资源，网络优先数据文件)，可添加到主屏幕

**新增页面**: `timeline.html` (📅 时间线) · `clusters.html` (🗺️ 话题聚类)
**新增模块**: `cluster_viz.py` (聚类计算) · `sw.js` (Service Worker)
**导航栏**: 搜索框 + 聚类 + 时间线入口
**前端技术**: Canvas 散点图、localStorage 状态管理、Service Worker 离线缓存

## Phase 6: 分发 & 运营 ✅ (2026-06-03)

- [x] Telegram 每日精选推送 — `telegram_digest.py` 自动生成格式化的每日摘要
- [x] Daily cron Step 7: 流水线结束后自动生成 Top 10 精选 + Top 3 why_it_matters → Telegram
- [x] Weekly cron Step 5: 每周简报同步生成本周摘要 → Telegram
- [x] 格式：Markdown 链接 + emoji 编号 + 分类图标，Telegram 原生渲染

**新增模块**: `telegram_digest.py` (每日/每周 Telegram 摘要生成)
**Cron 更新**: 每日扫描 +1 步 (Step 7)，每周简报 +1 步 (Step 5)

## 本地运行

```bash
cd ~/Desktop/Projects/ai-intel
pip install feedparser requests sqlite-utils sqlite-vec

# 初始化
python scripts/db_init.py
python scripts/db_migrate.py

# 运行 Pipeline
python scripts/pipeline_run.py

# 单独运行某阶段
python -m scripts.pipeline.scorer
```
