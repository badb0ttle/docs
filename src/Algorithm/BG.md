---
title: 二分图BG(Bipartite Graph)
icon: project-diagram
cover: https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
editLink: false
order: 4
author: badbottle
date: 2024-08-24
category:
  - 算法
tag:
  - 图论
  - 二分图
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
copyright: 版权归badb0ttle所有
---
# 二分图
原文oi wiki:[二分图](https://oi-wiki.org/graph/bi-graph/)
二分图，又称二部图，是一类结构特殊的图。它的顶点集可以划分为两个互不相交的子集，使得图中的每条边都连接这两个集合之间的一对点，而不会连接同一集合内部的点。

得益于这种简单的结构，二分图不仅展现出许多优雅的性质，也广泛应用于现实生活中的建模场景，例如任务分配、推荐系统、匹配市场等。许多在一般图上困难的优化问题，在二分图上都可以高效、准确地求解。
## 模版
[二分图判定](https://github.com/badb0ttle/iomanip/blob/main/BGC.cpp)
## 解释
遍历顶点，如果发现还没有染色的顶点，说明发现新的连通分量。
任选一种颜色给该顶点染色，并以它为起点做 DFS 或者 BFS，尝试给该连通分量染色。
遍历相邻的顶点时，如果发现已经染色的顶点，检查颜色是否与当前顶点相同。相同，则不是二分图，直接返回；否则，继续遍历。
如果发现尚未染色的顶点，将尚未染色的顶点染上与当前顶点相反的颜色