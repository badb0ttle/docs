---
title: ST表
icon: table
cover: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
editLink: false
order: 4
author: badb0ttle
date: 2024-08-24
category:
  - 算法
tag:
  - 基础算法
  - 数据结构
  - 稀疏表
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: ST表
copyright: 版权归badb0ttle所有
---
# ST表
原文oi wiki:[st表](https://oi-wiki.org/ds/sparse-table/)
## 原理十分简单
基于倍增思想，我们考虑如何求出区间最大值。可以发现，如果按照一般的倍增流程，每次跳 
$2^i$ 步的话，询问时的复杂度仍旧是 
$\Theta(\log n)$，并没有比线段树更优，反而预处理一步还比线段树慢。我们发现$\max(x,x)=x$，也就是说，区间最大值是一个具有「可重复贡献」性质的问题。即使用来求解的预处理区间有重叠部分，只要这些区间的并是所求的区间，最终计算出的答案就是正确的。
如果手动模拟一下，可以发现我们能使用至多两个预处理过的区间来覆盖询问区间，也就是说询问时的时间复杂度可以被降至 $\Theta(1)$，在处理有大量询问的题目时十分有效。