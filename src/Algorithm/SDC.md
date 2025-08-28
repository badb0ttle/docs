---
title: 差分约束系统SDC(System of Difference Constraints)
icon: project-diagram
cover: https://images.unsplash.com/photo-1509228627152-72ae9cedfc49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
editLink: false
order: 4
author: badbottle
date: 2024-08-24
category:
  - 算法
tag:
  - 图论
  - 数学
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 图论
copyright: 无版权
---
# 差分约束系统
原文oi wiki:[SDC](https://oi-wiki.org/graph/diff-constraints/)

差分约束系统是一种特殊的 $n$ 元一次不等式组，它包含 $n$ 个变量 $x_1, x_2, \dots, x_n$ 以及 $m$ 个约束条件，每个约束条件是由两个其中的变量做差构成的，形如 $x_i - x_j \leq c_k$，其中 $1 \leq i, j \leq n, i \neq j, 1 \leq k \leq m$ 并且 $c_k$ 是常数（可以是非负数，也可以是负数）。

我们要解决的问题是：求一组解 $x_1 = a_1, x_2 = a_2, \dots, x_n = a_n$，使得所有的约束条件得到满足，否则判断出无解。

差分约束系统中的每个约束条件 $x_i - x_j \leq c_k$ 都可以变形成 $x_i \leq x_j + c_k$，这与单源最短路中的三角形不等式 $\text{dist}[y] \leq \text{dist}[x] + z$ 非常相似。因此，我们可以把每个变量 $x_i$ 看做图中的一个结点，对于每个约束条件 $x_i - x_j \leq c_k$，从结点 $j$ 向结点 $i$ 连一条长度为 $c_k$ 的有向边。

注意到，如果 $\{a_1, a_2, \dots, a_n\}$ 是该差分约束系统的一组解，那么对于任意的常数 $d$，$\{a_1 + d, a_2 + d, \dots, a_n + d\}$ 显然也是该差分约束系统的一组解，因为这样做差后 $d$ 刚好被消掉。
最长路还是最短路本质上是等价的（最长路和最短路可以通过取负权值互相转化）
## 模版
[SDC](https://github.com/badb0ttle/iomanip/blob/main/SDC.cpp)
## 解释
题目:https://www.luogu.com.cn/problem/P1993
1. 我们注意到题目与差分约束的形式有相似之处，我们就开始找形如$x_i - x_j \leq c_k$的式子。
2. 连边
3. 建立虚拟源点
4. spfa
