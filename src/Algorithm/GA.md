---
title: Greedy (贪心)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---
#
原文oi wiki:[贪心](https://oi-wiki.org/basic/greedy/)
### 贪心策略

1. **序列定义**：  
   - 序列   $a: a_1, a_2, a_3, \cdots, a_n$
   - 序列   $b: b_1, b_2, b_3, \cdots, b_n$  

1. **问题**：求 $\sum a_i b_j$（\(i, j\) 不重复）的最大值  

2. **表达式**：  
   - $max = a_{(1)}b_{(1)} + a_{(2)}b_{(2)} + \cdots + a_{(n)}b_{(n)}$  
     （其中 $a_{(i)}$ 是序列 \(a\) 中第 \(i\) 大的元素，$b_{(i)}$ 是序列 \(b\) 中第 \(i\) 大的元素）