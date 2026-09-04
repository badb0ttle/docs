# Blog 文档协作规范

本文件适用于 `/Users/mac/Desktop/Projects/pycharm/Blog/docs` 及其子目录。博客基于 VuePress 2 和 `vuepress-theme-hope` 构建，文档源码位于 `src/`。

## 1. 目录与分类

- 所有可发布文章必须放在 `src/` 下的现有分类目录中：`AI/`、`Backend/`、`DevOps/`、`Database/`、`Frontend/`、`Languages/`、`Linux/`、`Algorithm/`、`Tools/`。
- 新增分类前先检查 `src/.vuepress/sidebar.ts`。分类目录需要包含 `README.md`，并使用 `<Catalog />` 生成文章目录。
- AIGun AI 学习与项目沉淀统一放在 `src/AI/AIGun/`，避免与已有的 AI 情报站和 Hermes 文章混放。
- AIGun AI 专题建议使用以下顺序：

  ```text
  src/AI/AIGun/
  ├── README.md
  ├── 01-AIGun-AI项目全景.md
  ├── 02-DAG与消息队列驱动的AI微服务.md
  ├── 03-Agent与Skill工程化实践.md
  ├── 04-Agent工具调用与结构化输出.md
  ├── 05-Langfuse-Prometheus-ARMS可观测性.md
  ├── 06-Trace驱动的复杂问题排查.md
  ├── 07-语音智能体与实时数字人技术调研.md
  ├── 08-Ego-Browser与AI辅助验证.md
  ├── 09-Superpowers驱动的AI开发工作流.md
  └── 10-两个月AI后端实习总结.md
  ```

- 文件名使用清晰、稳定的中文或英文短语；专题文章使用两位数字前缀保证目录顺序。不要使用空格、特殊符号或临时名称。
- 附件、图片和示例资源放在与文章相邻且语义明确的目录中；不要提交构建产物、缓存、日志、密钥或个人隐私数据。

## 2. 文章 frontmatter 规范

每篇正式文章必须以 YAML frontmatter 开始，字段按以下顺序组织：

```yaml
---
title: 文章标题
icon: gears
order: 1
editLink: false
category:
  - 知识点
  - AI
tag:
  - Agent
date: 2026-09-04
timeline: true
---
```

约束：

- `title` 必须与文章主题一致，避免只写内部代号。
- `category` 使用已有分类词；AIGun AI 文章至少包含 `AI`，项目复盘可增加 `项目` 或 `实习总结`。
- `tag` 使用可检索的技术词，统一大小写，例如 `Agent`、`Skill`、`DAG`、`Kafka`、`Prometheus`、`Langfuse`。
- `order` 只在同一目录需要固定排序时设置，避免与同目录文章重复。
- 有明确发布时间的文章填写 `date: YYYY-MM-DD`；长期知识笔记可省略日期。
- `timeline`、`editLink` 等字段遵循同目录现有文章习惯，不随意改动已有文章的 frontmatter。
- 不在 frontmatter 或正文中写入 Token、密码、Cookie、私有 URL、内部账号、客户数据或未公开业务数据。

## 3. 正文结构

技术文章默认按以下结构组织，可根据主题合并或删减，但必须保持从背景到结论的叙述顺序：

1. 背景与问题：说明为什么要做、解决什么问题。
2. 核心概念：先解释必要概念，再进入项目实现。
3. AIGun AI 中的实际实现：只写已从代码、文档、Trace 或聊天记录确认的内容。
4. 关键设计：描述模块边界、数据流、接口契约、异常处理和取舍。
5. 我的参与与理解：明确个人完成、协同完成和调研验证的边界，不夸大成果。
6. 问题排查或踩坑：给出复现现象、证据、根因、修复和验证结果。
7. 可迁移经验：提炼可以用于其他项目的方法。
8. 总结：用简短段落回收文章结论。

项目总览文章可补充技术栈表格和 Mermaid/PlantUML 架构图；排障文章应优先展示真实链路和关键字段；调研文章应提供对比维度、测试方法、限制条件和落地结论。

## 4. 内容准确性与表达

- 产品名统一写作 **AIGun**，项目名统一写作 **AIGun AI**，不得写成 `AIgun`、`AiGun` 或其他变体。
- 区分“项目已有能力”“本人参与内容”“个人学习收获”和“推测或待验证事项”。不把推测写成事实。
- 涉及监控与排障时，优先使用 Langfuse Trace、Prometheus 指标、阿里云 ARMS 告警、结构化日志和原始 payload 作为证据。
- 代码片段应可读、可运行或明确标注为伪代码；复杂流程优先用表格、列表或流程图表达。
- 文章面向未来的自己和其他开发者，解释设计原因，不只罗列工具名称。
- 引用外部资料时给出来源链接和访问日期；不得复制包含版权限制或敏感信息的内部内容。

## 5. 修改流程

1. 修改前检查仓库状态：

   ```bash
   git status --short --branch
   ```

2. 只修改与当前文章或规范相关的文件，保留用户已有的未提交改动。
3. 新增文章时先确认它属于哪个分类、是否需要加入目录顺序，以及是否需要图片或架构图。
4. 完成后检查 frontmatter、内部链接、代码围栏、图片路径和标题层级。
5. 在 `docs/` 目录执行构建校验：

   ```bash
   pnpm docs:build
   ```

6. 构建产生的 `.vuepress/dist`、`.temp`、缓存和日志不得提交。
7. 未经明确要求，不执行 commit、push、merge、rebase 或发布操作。

## 6. AIGun AI 专题的写作边界

- `01` 和 `02` 主要介绍项目架构、DAG、Worker、Kafka/RabbitMQ、Redis 幂等和消息可靠性。
- `03` 和 `04` 主要介绍 Agent、Skill、工具调用、结构化输出、超时、重试和模型降级。
- `05` 和 `06` 主要介绍 Langfuse、Prometheus、阿里云 ARMS、日志以及 Trace 驱动排障。
- `07` 主要介绍 Higgs Avatar、Boson Avatar、Heygen、D-ID 的调研、本地测试、接口限制和落地判断。
- `08` 主要介绍 Ego Browser 的浏览器自动化、页面验证和 QA 使用方式。
- `09` 主要介绍 Superpowers、Brainstorming、Systematic Debugging、TDD、Worktree、Review 和验证工作流。
- `10` 只总结两个月的技术成长、业务理解、调研落地、协作沟通和后续计划，不披露公司机密，也不写成具体业务流水账。

