---
title: Combination Numbers(组合数)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---

## 组合数
原文oi wiki:[组合数](https://oi-wiki.org/math/combinatorics/combination/#%E7%BB%84%E5%90%88%E6%95%B0)
### 方法一：数据规模较小时使用动态规划（DP）
当数据规模较小时，可以使用动态规划的方式计算组合数。其核心思路基于组合数的递推公式  
  
$$
C_i^j=C_{i-1}^j+C_{i-1}^{j-1}
$$

```cpp
// 初始化边界条件：C[i][0] 都为 1
for(int i = 0; i <= n; ++i) C[i][0] = 1;
// 动态规划计算组合数
for(int i = 1; i <= n; ++i) {
    // 注意 j 的范围，避免越界
    for(int j = 1; j < m && j <= i; ++j) {
        // 根据递推公式计算组合数，并对结果取模
        C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % mod;
    }
}
```

### 方法二：空间足够时使用快速幂
当空间足够时，可以使用快速幂的方法来计算组合数。此方法先预处理阶乘和逆元，再根据组合数公式计算组合数。
$$
C_n^m=\frac{n!}{m!(n-m)!}
$$
```cpp
// 快速幂函数，计算 a 的 b 次方对 mod 取模的结果
int qp(int a, int b, int mod) {
    int res = 1;
    while(b) {
        if(b & 1) res = (res * a) % mod;
        b >>= 1;
        a = (a * a) % mod;
    }
    return res;
}

// 预处理阶乘和逆元
void pre() {
    // 0 的阶乘和 0 的阶乘的逆元都为 1
    fac[0] = inv[0] = 1;
    for(int i = 1; i < mx; ++i) {
        // 计算阶乘
        fac[i] = fac[i - 1] * i % mod;
        // 计算阶乘的逆元
        inv[i] = qp(fac[i], mod - 2, mod);
    }
}

// 计算组合数 C(n, m)
int C(int n, int m) {
    // 处理特殊情况
    if(n == 0 || m == 0 || n < m) return 0;
    // 根据组合数公式计算结果
    else return (fac[n] * inv[m] % mod * inv[n - m]) % mod;
}
```

### 代码解释
- `qp` 函数：用于计算快速幂，通过二进制拆分的方式，将时间复杂度从 \(O(b)\) 优化到 \(O($\log b$)\)。
- `pre` 函数：预处理阶乘数组 `fac` 和逆元数组 `inv`，方便后续计算组合数时直接使用。
- `C` 函数：根据预处理好的阶乘和逆元，计算组合数 \(C(n, m)\)。其中 `fac` 数组存储阶乘，`inv` 数组存储逆元。