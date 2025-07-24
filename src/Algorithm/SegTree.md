---
title: SegTree(线段树)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
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
## 可持久化线段树|主席树
### 解释:
#### 

