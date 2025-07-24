---
title: DP:Linear, Interval, Tree (线性、区间、树形dp)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---
#
## 线性、区间、树形 DP
原文oi wiki:[树形 DP](https://oi-wiki.org/dp/tree/)[区间 DP](https://oi-wiki.org/dp/interval/)
### 1. 线性 DP

每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。

`dp[i][j]`: 到第 `i` 种为止，总数为 `j` 的总方案数。

**例题**: [P1077](https://www.luogu.com.cn/problem/P1077)

```cpp
dp[0][0] = 1; // 初始化
for(int i = 1; i <= n; ++i) { // 到第 i 种花为止
    for(int j = 0; j <= m; ++j) { // 一共放了 j 盆花
        for(int k = 0; k <= a[i] && k <= j; ++k) { // 第 i 种花放了 k 盆
            dp[i][j] = (dp[i-1][j - k] + dp[i][j]) % mod;
        }
    }
}
```
### 2. 区间 DP

区间 DP 是指状态转移方程中，每个状态表示一个区间 [i, j] 上的某种性质，且状态转移依赖于更小的子区间。通常用于解决区间划分、合并、分割等问题。

步骤:

先求小区间的 DP。
转移到大区间。
初始化。
例题: [P5569](https://www.luogu.com.cn/problem/P5569)
```cpp
const int mx = 301, inf = 4e18;
int a[mx], dp[mx][mx], n, pre[mx];

void work() {
    cin >> n;
    for(int i = 1; i <= n; ++i) cin >> a[i];
    for(int i = 1; i <= n; ++i) pre[i] = a[i] + pre[i - 1];
    for(int len = 2; len <= n; ++len) {
        for(int i = 1, j = i + len - 1; j <= n; ++i, ++j) {
            dp[i][j] = inf;
            for(int k = i; k < j; ++k) {
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j] + pre[j] - pre[i - 1]);
            }
        }
    }
}
```
### 3. 树形 DP

通常利用树的递归性质，从子树的解推导出父节点的解，核心思想是将原问题分解为若干子问题，通过求解子问题来得到原问题的解。在树形 DP 中，我们一般会进行深度优先搜索（DFS）来遍历树的节点，从而完成状态的转移。

步骤:

构造一种方案，并设定一个归属。
确定状态、表示。
状态转移。
遍历顺序。
例题: [P1122](https://www.luogu.com.cn/problem/P1122)