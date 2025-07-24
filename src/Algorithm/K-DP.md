---
title: Knapsack DP(背包dp)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---
#
# 背包DP
原文oi wiki:[背包dp](https://oi-wiki.org/dp/knapsack/)
## 1. 01 背包

每个物品只能获取<span style="color:red;">一次</span>。

### 第一形态

`dp[i][j]`: 选前 `i` 个元素，空间为 `j` 的最大价值。

```cpp
for(int i = 1; i <= m; ++i) {
    for(int j = 1; j <= t; ++j) {
        if(j >= T[i])
            dp[i][j] = max(dp[i-1][j - T[i]] + M[i], dp[i-1][j]);
        else
            dp[i][j] = dp[i-1][j];
    }
}
```
### 第二形态

因为我们的 01 背包不考虑方案整体，只考虑前后关系，因此我们可以只维护当前和前一项这两种状态，采用 0 和 1 这两种状态存储。

dp[y][j]: 当前状态下空间为 j 的最大价值。
```cpp
for(int i = 1; i <= m; ++i) {
    int y = i & 1;
    for(int j = 1; j <= t; ++j) {
        if(j >= T[i])
            dp[y][j] = max(dp[y^1][j - T[i]] + M[i], dp[y^1][j]);
        else
            dp[y][j] = dp[y^1][j];
    }
}
cout << dp[m & 1][t] << "\n";
```
### 第三形态

压缩成一维，将之前状态存储在左边，当前的状态存储在数组末尾。从左往右遍历：
```cpp
for(int i = 1; i <= m; ++i) {
    for(int j = t; j >= T[i]; --j) {
        if(j >= T[i])
            dp[j] = max(dp[j - T[i]] + W[i], dp[j]);
        else
            dp[j] = dp[j];
    }
}
```

<center><h1><span style="color:red;">从当前行转移到当前行是不行的!</span></h1></center>

解释:
如果从左往右遍历，dp[j - w[i]] 可能会被更新多次（因为 j - w[i] 比 j 小，已经在当前轮次被更新过）。
这样会导致一个物品被多次选择，违反了 01 背包中“每个物品只能选一次”的规则。
从右往左遍历可以保证 dp[j - w[i]] 是上一轮的状态（即未选择当前物品时的状态），从而确保每个物品只被选择一次。
## 2. 无穷背包

即每个物品有<span style="color:red;">无限</span>次获取的机会。

### 第一形态

dp[i][j]: 选<span style="color:red;">若干个</span> i 个元素，空间为 j 的最大价值。
```cpp
for(int i = 1; i <= n; ++i) {
    for(int j = 0; j <= m; ++j) {
        if(j >= v[i])
            dp[i][j] = max(dp[i-1][j], dp[i][j - v[i]] + w[i]);
        else
            dp[i][j] = dp[i-1][j];
    }
}
```
### 第二形态

同上，dp[y][j]: 当前状态下空间为 j 的最大价值。

### 第三形态

从左往右遍历时，dp[j - w[i]] 可能会被更新多次（因为 j - w[i] 比 j 小，已经在当前轮次被更新过）。
这样正好符合完全背包中“每个物品可以选择多次”的规则。
每次更新 dp[j] 时，dp[j - w[i]] 已经包含了当前物品可能被选择多次的情况。
dp[j]: 到目前为止，花费空间为 j 的最大价值。
```cpp
for(int i = 1; i <= n; ++i) {
    for(int j = v[i]; j <= m; ++j) {
        dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
    }
}
```
## 3. 多重背包

即每个物品都有 s[i] 次获取的机会。

### 第一形态
```cpp
for(int i = 1; i <= n; ++i) {
    cin >> s >> w >> v;
    while(s--) {
        for(int j = m; j >= v; --j)
            dp[j] = max(dp[j], dp[j - v] + w);
    }
}
```
### 第二形态

二进制优化的核心思想是：

将每种物品的数量 s 拆分成若干个 2 的幂次方的组合（如 1, 2, 4, 8, ...），再加上剩余的部分。
这样，每种物品的数量 s 可以被拆分成 log(s) 个物品，而不是 s 个物品。
通过这种方式，多重背包问题被转化为 01 背包问题，且物品数量大大减少。
```cpp
for(int i = 1; i <= n; ++i) {
    cin >> s >> w >> v;
    vector<int> vec;
    int x = 1;
    while(s >= x) {
        vec.push_back(x);
        s -= x;
        x <<= 1;
    }
    if(s) vec.push_back(s);
    for(int k : vec) {
        for(int j = m; j >= k * v; --j)
            dp[j] = max(dp[j], dp[j - k * v] + k * w);
    }
}
```