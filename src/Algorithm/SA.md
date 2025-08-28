---
title: Search (搜索)
icon: search
cover: https://images.unsplash.com/photo-1471666875520-c75081f42081?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80
order: 4
editLink: false
author: badbottle
footer: 基础算法
copyright: 版权归badb0ttle所有
category:
    - 算法
tag:
    - 基础算法
    - 搜索算法
date: 2024-08-24
timeline: true
---
#
## 搜素专题
原文oi wiki:[DFS](https://oi-wiki.org/search/dfs/)[BFS](https://oi-wiki.org/search/bfs/)
### 1.dfs


子集型:枚举0101,即选或者不选.
排列型:123 132 231 213这样在已知个数的情况下枚举排列顺序

<span style="color:red;">DFS基于栈</span>

### 2.bfs


等权最短路:在无权图或等权图中，BFS 可以找到从起点到终点的最短路径。
最少操作次数:在状态转移问题中，BFS 可以找到从初始状态到目标状态的最少操作次数。

<span style="color:red;">BFS基于队列</span>
