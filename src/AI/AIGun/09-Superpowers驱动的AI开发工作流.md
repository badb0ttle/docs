---
title: Superpowers 驱动的 AI 开发工作流
icon: wand-magic-sparkles
order: 9
editLink: false
category:
  - 项目
  - AI
tag:
  - Superpowers
  - Brainstorming
  - TDD
  - Worktree
  - Code Review
---

# Superpowers 驱动的 AI 开发工作流

## 从“直接改”到“先建立证据”

刚开始使用 AI 编程工具时，最容易陷入“看到问题就让模型改代码”。在 AIGun AI 项目中，需求往往跨越 Prompt、DAG、消息队列、数据库和前端展示，直接修改很容易误伤已有行为。我逐步形成了以 Superpowers 为核心的工作流：先澄清目标，再拆解问题，最后用测试和证据收敛结果。

## 关键环节

### Brainstorming：先确认问题边界

先区分是简单修复、可行性验证还是架构调整；明确用户现象、成功标准、影响范围和不能改变的行为。对于 Type、过滤和最终展示这类敏感逻辑，先列出当前行为与目标行为，再决定是否需要改动。

### Systematic Debugging：沿证据链定位

先建立可复现路径，再检查首个异常节点、原始 payload 和日志。假设必须能被 Trace、指标或测试证伪，不用“看起来像”替代验证。

### TDD 与 Verification Before Completion

先写能暴露问题的 focused test，再实现最小修复；完成后运行对应测试、静态检查和构建，确认没有把候选集合、过滤原因或 action 改错。最终回复只报告实际执行过的验证，不把“代码看起来正确”当成通过。

### Worktree、PR 与 Review

涉及跨模块或高风险改动时使用隔离 worktree，避免污染当前工作区；按功能拆分提交，提交前检查 diff、无关改动和行为变化，再通过 PR 与 Review 获取反馈。小修改则保持范围聚焦，不为了流程而增加额外分支。

## Skill 的组合方式

不同 Skill 解决不同阶段的问题：

```text
需求不清 → brainstorming
复杂问题 → writing-plans
出现异常 → systematic-debugging
需要实现 → TDD / 专项 Skill
准备交付 → verification-before-completion
```

我还学习了文档、drawio、Ego Browser 等 Skill，把架构图生成、页面验证和知识沉淀纳入日常流程。Skill 的价值不在于增加步骤，而在于把容易遗漏的检查点变成稳定习惯。

## 协作与沟通

在 PR、联调和排障中，我尽量用“现象—证据—影响—建议”组织信息：先说明复现条件，再列出 Trace/日志中的关键字段，最后给出对前端、产品或测试的具体影响。这样既能减少来回确认，也能让协作者快速判断问题属于哪个边界。

## 小结

AI 工具提高了执行速度，但可靠交付仍依赖人的判断：先理解，再设计；先验证，再修改；先说明边界，再推动协作。这套工作流是我在两个月实习中最重要的工程方法收获之一。
