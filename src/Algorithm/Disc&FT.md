---
title: Discretization & Fenwick Tree Special(离散化和树状数组)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---
#
原文oi wiki:[树状数组](https://oi-wiki.org/ds/fenwick/#%E5%8C%BA%E9%97%B4%E5%8A%A0%E5%8C%BA%E9%97%B4%E5%92%8C) [离散化](https://oi-wiki.org/misc/discrete/)
## 数组离散化

### 离散化步骤
1. 创建原数组的副本，同时记录每个元素出现的位置。
2. 将副本按值从小到大排序，当值相同时，按出现顺序从小到大排序。
3. 将离散化后的数字放回原数组。
### 代码实现
```cpp
struct Data {
    int idx, val;

    bool operator<(const Data& o) const {
        if (val == o.val)
            return idx < o.idx; // 当值相同时，先出现的元素离散化后的值更小
        return val < o.val;
    }
} tmp[MAXN]; // 也可以使用 std::pair

for (int i = 1; i <= n; ++i) tmp[i] = Data{i, arr[i]};
std::sort(tmp + 1, tmp + n + 1);
for (int i = 1; i <= n; ++i) arr[tmp[i].idx] = i;
```
## 树状数组

**树状数组**是一种支持 单点修改 和 区间查询 的、代码量小的数据结构。
即，维护区间和: {1.单点修改 O(1), 2.区间修改 O(logN), 3.查询 O(logN)}
但注意: 不能用 0 当下标。

### 区间查询
```cpp
int getsum(int x) { // a[1]..a[x]的和
    int ans = 0;
    while (x > 0) {
        ans = ans + c[x];
        x = x - lowbit(x);
    }
    return ans;
}
```
### 单点修改
```cpp
void add(int x, int k) {
    while (x <= n) { // 不能越界
        c[x] = c[x] + k;
        x = x + lowbit(x);
    }
}
```
### 区间修改
```cpp
void update(int k, lL x) {
    for(int i = k; i <= n; i += lowbit(i)) {
        td[i] += x, ti_td[i] += x * k;
    }
}

lL getsum(int k) {
    lL sum = 0;
    for(int i = k; i > 0; i -= lowbit(i)) {
        sum += (k + 1) * td[i] - ti_td[i];
    }
    return sum;
}
```
解释: `add` 是对指定区间进行维护的操作，即从 k 迭代到 n 的不同管辖区间修改操作，而 td 和 ti_td 分别都是不同系数的差分数组。因此，我们实际上是用两个树状数组来维护 d_i 和 d_i * i 这个操作。getsum 里的区间查询则是用推导公式：
$$
\sum_{i=1}^{r}d_i\times(r+1)-\sum_{i=1}^rd_i\times i
$$
实现的（这里的 k 实际上等同于 r，都是 1 到 k 的区间和）。

 
