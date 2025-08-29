---
title: Heavy-Light Decomposition(重链剖分)
icon: code-branch
cover: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
editLink: false
order: 4
author: badbottle
date: 2024-08-24
category:
  - 算法
tag:
  - 图论
  - 树形结构
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 图论
copyright: 版权归badb0ttle所有
---
# 树链剖分
瞎扯:我觉得这个部分的图论挺有意思的所以多写了一点XD
树链剖分用于将树分割成若干条链的形式，以维护树上路径的信息。

具体来说，将整棵树剖分为若干条链，使它组合成线性结构，然后用其他的数据结构维护信息。

**树链剖分**（树剖/链剖）有多种形式，如 **重链剖分，长链剖分** 和用于 Link/cut Tree 的剖分（有时被称作「实链剖分」），大多数情况下（没有特别说明时），「树链剖分」都指「重链剖分」。
原文oi wiki:[树链剖分](https://oi-wiki.org/graph/hld/)
## 重链剖分
重链剖分可以将树上的任意一条路径划分成不超过 
$O(\log n)$ 条连续的链，每条链上的点深度互不相同（即是自底向上的一条链，链上所有点的 LCA 为链的一个端点）。

重链剖分还能保证划分出的每条链上的节点 DFS 序连续，因此可以方便地用一些维护序列的数据结构（如线段树）来维护树上路径的信息。
如：
1. 修改 **树上两点之间的路径上** 所有点的值。
2. 查询 **树上两点之间的路径上** 节点权值的 **和/极值/其它**（在序列上可以用数据结构维护，便于合并的信息）。

### 定义
 **重子节点** :表示其子节点中子树最大的子结点。如果有多个子树最大的子结点，取其一。如果没有子节点，就无重子节点。
**轻子节点** :表示剩余的所有子结点。
从这个结点到重子节点的边为 **重边**。
到其他轻子节点的边为 **轻边**。
若干条首尾衔接的重边构成 **重链**。
把落单的结点也当作重链，那么整棵树就被剖分成若干条重链。
### 实现
树剖的实现分两个 DFS 的过程
first: 第一个 DFS 记录每个结点的父节点（fa）、深度（dep）、子树大小（sz）、重子节点（son）
second: 第二个 DFS 记录所在链的链顶（top，应初始化为结点本身）、重边优先遍历时的 DFS 序（dfn）、DFS 序对应的节点编号（rks,但我觉得叫它反映射比较好听:D）。
### 应用
1. **路径**查询，路径修改
2. **子树**查询，子树修改
3. **求LCA**
### 模版
[HLD带LCA](https://github.com/badb0ttle/iomanip/blob/main/LCA(HLD).cpp)
[纯HLD](https://github.com/badb0ttle/iomanip/blob/main/HLD.cpp)

