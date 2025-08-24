---
title: SP(最短路)
icon: route
cover: https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
order: 4
editLink: false
author: badbottle
footer: 图论
copyright: 无版权
category:
    - 算法知识
tag:
    - 图论
    - 最短路径
date: 2024-08-24
timeline: true
---
#
## 最短路径
原文oi wiki:[SP](https://oi-wiki.org/graph/shortest-path/)

## 基础
1.**Dijkstra**<br>
2.**Floyd**

### 1.Dijkstra
用于求 `单源最短路径`，只能处理非负权边。其核心思想是：
每次从未确定的点中选择当前距离源点最近的点加入集合，并用它来更新其他点的最短距离。
原理十分简单，大学课堂100%讲过
堆优化 Dijkstra 时间复杂度为` O((n + m)log n)`,适用于`稀疏图`
#### 模版
[Dijkstra](https://github.com/badb0ttle/iomanip/blob/main/Dijkstra.cpp)
#### 原理
```cpp
struct edge{
ll v,w;
bool operator <(const edge&a)const{//这里因为默认是大根堆我们要把权值小的放到堆首
    return w==a.w?v<a.v:w>a.w;
}
};
//.......
    while(qp.size())
    {
        ll x=qp.top().v;
        qp.pop();
        if(vis[x])continue;//如果已经存过就跳过
        vis[x]=1;
        for(auto&[v,w]:g[x])
        {
            if(!vis[v]&&dp[v]>dp[x]+w)dp[v]=dp[x]+w;//遍历邻接点
            qp.push({v,dp[v]});
        }
    }
```
### 2.Floyd
Floyd-Warshall 算法用于解决任意两点之间的最短路径问题，`多源最短路`,适合点数较小的图（一般 ≤ 500）。
它通过三重循环，不断尝试以每一个点为中转点更新两点之间的最短距离。
时间复杂度：`O(n^3)`，适用于`稠密图`、小数据图。
非常简单易懂，注意遍历的顺序即可
模版[Floyd](https://github.com/badb0ttle/iomanip/blob/main/floyd.cpp)
## Bellman-Ford
Bellman–Ford 算法是一种基于松弛（relax）操作的最短路算法，可以求出有负权的图的最短路，并可以对最短路不存在的情况进行判断。
在国内 OI 界，你可能听说过的「SPFA」，就是 Bellman–Ford 算法的一种实现
这里直接介绍spfa优化的算法
### 模版
模版[Bellman-Ford](https://github.com/badb0ttle/iomanip/blob/main/Bellman-Ford.cpp)
### 解释
对于边 (u,v)，松弛操作对应下面的式子：
`dis(v) = min(dis(v), dis(u) + w(u, v))。`
这么做的含义是显然的：我们尝试用 
S -> u -> v（其中 S -> u 的路径取最短路）这条路径去更新 
v 点最短路的长度，如果这条路径更优，就进行更新。
Bellman–Ford 算法所做的，就是不断尝试对图上每一条边进行松弛。我们每进行一轮循环，就对图上所有的边都尝试进行一次松弛操作，当一次循环中没有成功的松弛操作时，算法停止。

## Johnson单源最短路
Johnson 和 Floyd 一样，是一种能求出无负环图上任意两点间最短路径的算法。
任意两点间的最短路可以通过枚举起点，跑 
n 次 Bellman–Ford 算法解决，时间复杂度是 
$O(nmlog(m))$ 的，也可以直接用Floyd 算法解决，时间复杂度为 $O(n^3)$。
### 模版
[Johnson](https://github.com/badb0ttle/iomanip/blob/main/Johnson.cpp)
### 解释
1. 我们引入了一个源点向原图中每个节点连一条权值为 0 的边，用 Bellman–Ford 从 s 出发计算每个节点的最短距离 h[v]。
2. 调整边权
对每条边 (u, v)，更新权重：
`$w'(u,v) = w(u,v) + h[u] - h[v]$`
这样调整后，图中所有边权都**非负**，可以安全使用 Dijkstra。
3. 对每个节点 u，用 Dijkstra 算法计算从 u 到其他所有节点的最短路径，得到 $d'[u][v]$。
4. 恢复原边权下的距离
对每对节点 (u,v)，恢复实际距离：
$d[u][v] = d'[u][v] - h[u] + h[v]$
h[v]：表示从源点 s 到 v 的最短距离，用于修正边权。
