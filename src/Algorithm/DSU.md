---
title: DSU(并查集)
icon: link
cover: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80
editLink: false
order: 4
author: badb0ttle
date: 2024-08-24
category:
  - 算法
tag:
  - 基础算法
  - 并查集
  - 数据结构
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 并查集
copyright: 无版权
---
#
## 并查集
原文oi wiki:[并查集](https://oi-wiki.org/ds/dsu/)
## 基础
### 介绍
并查集是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树表示一个集合，树中的节点表示对应集合中的元素。
顾名思义，并查集支持两种操作：
`合并`（Union）：合并两个元素所属集合（合并对应的树）
`查询`（Find）：查询某个元素所属集合（查询对应的树的根节点），这可以用于判断两个元素是否属于同一集合
`路径压缩`
### 模版
[模版](https://github.com/badb0ttle/iomanip/blob/main/DSU.cpp)
### 解释
#### 流程
初始时，每个元素都位于一个单独的集合，表示为一棵只有根节点的树。方便起见，我们将根节点的父亲设为自己。
查询时，我们需要沿着树向上移动，直至找到根节点。
路径压缩
查询过程中经过的每个元素都属于该集合，我们可以将其直接连到根节点以加快后续查询。
合并
要合并两棵树，我们只需要将一棵树的根节点连到另一棵树的根节点。
#### 代码解释
```cpp
返回根节点：
int root(int v)
{
    return (pre[v]==v?v:root(pre[v]));
}
```
合并:
```cpp
void merge(int a,int b)
{
    pre[root(a)]=root(b);
}
```
## 进阶
### 启发式并查集
合并时，选择哪棵树的根节点作为新树的根节点会影响未来操作的复杂度。我们可以将节点较少或深度较小的树连到另一棵，以免发生退化。
#### 模版
[启发式模版](https://github.com/badb0ttle/iomanip/blob/main/DSU(HM).cpp)
#### 解释
sz存储的是节点大小，选择节点较小的一棵(记得初始化为1)
```cpp
void merge(int x,int y)
{
    int fx=find(x),fy=find(y);
    if(fx==fy)return;
    if(sz[fx]>sz[fy])swap(fx,fy);
    pre[fx]=fy;
    sz[fy]+=sz[fx];
}
```
### 可撤销并查集
顾名思义,撤销上一次的操作,（若全部撤销完了则不操作）,如果已经连通则不操作
在可撤销 DSU 中，路径压缩不适合使用，否则 undo 的操作会非常复杂，需要记录路径上所有修改。
#### 模版
[RB并查集](https://github.com/badb0ttle/iomanip/blob/main/DSU(RB).cpp)
#### 解释
用栈来存储操作时节点的大小，撤销即出栈并复原大小和节点的pre。
```cpp
 if(fx==fy)return;//已连通不操作
 void undo()
{
    if(!top)return;//不可撤销不操作
    auto [x,y]=stk[top--];//获取上一个状态
    sz[y]-=sz[x];//复原大小
    pre[x]=x;//复原根节点
}
```
### 带权并查集
我们还可以在并查集的边上定义某种权值、以及这种权值在路径压缩时产生的运算，从而解决更多的问题
在 带权 DSU 中，路径压缩通常 不直接使用，除非特别小心地同步更新权值
至于代码需要不同情况不同考虑
#### 模版
[WeightDSU](https://github.com/badb0ttle/iomanip/blob/main/DSU(Weight).cpp)




