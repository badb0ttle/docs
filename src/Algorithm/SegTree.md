---
title: SegTree(线段树)
icon: code-branch
cover: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
order: 4
editLink: false
author: badbottle
footer: 数据结构
copyright: 版权归badb0ttle所有
category:
    - 算法知识
tag:
    - 数据结构
    - 线段树
date: 2024-08-24
timeline: true
---
#
## 线段树
原文oi wiki:[SegTree](https://oi-wiki.org/ds/seg/)
### 简述

线段树（Segment Tree）是一种**二叉树结构**，主要用于高效地维护区间信息，例如区间和、区间最值、区间最大公约数等等。

你可以把它当作一个比**树状数组（Binary Indexed Tree）**更万能的数据结构，因为它不仅支持单点修改和区间查询，还可以通过扩展支持**区间修改**、**区间最值查询**等操作。

##  基本性质

- 每个结点表示一个区间 \([l, r]\)
- 父亲结点的区间 = 左右子结点区间的并集
- 根结点表示整个区间
- 查询/修改操作时间复杂度均为 \(O(\log n)\)
## 基础线段树
模版：[SegTree(add)](https://github.com/badb0ttle/iomanip/blob/main/SegTree(add).cpp)
### 解释:
#### `update(s, e, o, x)`

> 给当前节点 \([s, e]\) 加上值 `x`，并更新懒标记。
```cpp
void update(ll s, ll e, ll o, ll x)
{
    t[o] += (e - s + 1) * x; // 区间内元素个数乘以增量
    lz[o] += x; // 懒标记叠加
}
```
#### `pushup(v)`
>更新当前节点的信息，取决于左右子节点。
```cpp
void pushup(int v)
{
    t[v] = t[v << 1] + t[v << 1 | 1]; // 区间和
}
```
#### pushdown(s, e, o)
>将当前节点的懒标记下放给左右子节点，并清空当前节点懒标记。
```cpp
void pushdown(ll s, ll e, ll o)
{
    ll mid = (s + e) >> 1, ls = o << 1, rs = o << 1 | 1;
    update(s, mid, ls, lz[o]);
    update(mid + 1, e, rs, lz[o]);
    lz[o] = 0;
}
```
#### build(s, e, o)
建树，递归建立线段树，叶子结点赋值，非叶子节点递归合并。
```cpp
void build(ll s = 1, ll e = n, ll o = 1)
{
    if (s == e)
        return t[o] = a[s], void();
    ll mid = (s + e) >> 1;
    build(s, mid, o << 1), build(mid + 1, e, o << 1 | 1);
    pushup(o);
}
```
#### add(l, r, x, s, e, o)
>区间加法操作，递归判断是否整块覆盖、部分覆盖，利用懒标记优化。
```cpp
void add(ll l, ll r, ll x, ll s = 1, ll e = n, ll o = 1)
{
    if (l <= s && r >= e)
        return update(s, e, o, x), void();
    pushdown(s, e, o);
    int mid = (s + e) >> 1;
    if (mid >= l)
        add(l, r, x, s, mid, o << 1);
    if (mid + 1 <= r)
        add(l, r, x, mid + 1, e, o << 1 | 1);
    pushup(o);
}
```
####  query(l, r, s, e, o)
>区间查询操作，递归查询左右子树，遇到整块直接返回。
```cpp
ll query(ll l, ll r, ll s = 1, ll e = n, ll o = 1)
{
    if (l <= s && r >= e)
        return t[o];
    pushdown(s, e, o);
    ll mid = (s + e) >> 1;
    ll res = 0;
    if (mid >= l)
        res += query(l, r, s, mid, o << 1);
    if (mid + 1 <= r)
        res += query(l, r, mid + 1, e, o << 1 | 1);
    return res;
}
```
## 非可持久化线段树|权值线段树
### 解释
#### 原理
桶里面存储的是线段树的叶子节点中存放的是元素本身，而分支节点中存放的是元素的某种集合值（比如和、最值、异或和），但是权值线段树中存放的并不是元素本身，而是元素的权值。

最常见的是用线段树维护元素的出现次数，也就是维护一个桶。

例如我们有个数组[1,2,1,3,3,5]，那么我们就得到一个桶：
[2,1,2,0,1]（表示每个数字出现的次数），然后我们权值线段树就是基于这个桶来建立和维护的。
和普通的线段树区间查询一样，甚至更好写，因为没有lazytag，所以无需pushdown。
每个节点记录了元素大小在[s,e]之间的元素数量，于是每次查询第R小的元素值时，可以先看下左儿子里面有多少个元素（设为leftsum），假设所有询问都合法：
leftsum ≤k：说明第k小的元素在左儿子里面，于是向左走。
leftsum >k：说明第k小的元素在右儿子里面，于是向右走。
直到走到某个叶子结点，那么这个叶子的区间［s，e］就是这个元素大小，此时必然有s=e
#### 支持的操作
1. 添加元素
2. 查询区间[l,r]的元素个数
3. 查询整个集合中第k小（或第k大）的元素值
## 可持久化线段树|主席树
### 解释:
#### 原理
主要是解决区间问题，通过与离散化相结合来实现存储不同状态下的线段树，用前缀和的方式来对给定的区间进行查询
#### 支持的操作
维护权值区间的kth
### 模版:
[主席树](https://github.com/badb0ttle/iomanip/blob/main/PST.cpp)

