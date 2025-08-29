---
title: Heuristic Merging(启发式合并)
icon: compress-arrows-alt
cover: https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
editLink: false
order: 4
author: badbottle
date: 2024-08-24
category:
  - 算法
tag:
  - 图论
  - 动态规划
  - 数据结构
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 启发式合并
copyright: 版权归badb0ttle所有
---
# 启发式合并
启发式算法是什么呢？
启发式算法是基于人类的经验和直观感觉，对一些算法的优化。
说白了,用思维去强行干碎(不是)复杂度
# 树上启发式合并
原文oi wiki:[dsu-on-tree](https://oi-wiki.org/graph/dsu-on-tree/)
我们考虑树上的离线问题或者是其他情况可以从树上dp的角度去思考：
### 例题
[例题1](https://www.luogu.com.cn/problem/U41492)
[例题2](https://atcoder.jp/contests/abc329/tasks/abc329_f)
#### 例1关键步骤
1. 写出暴力写法之后，我们可以考虑将最后一颗树的结点保留下来进而省去删除的操作(因为最后一个结点我们可以通过合并的操作来统计最后的x结点的消息)
2. 那么现在的问题就转化成了我们要选择哪一颗树作为最后一颗树呢？很显然是重儿子所在子树。这里有一个需要仔细思考的点，为什么选择重儿子就会影响时间复杂度到log级别呢?想通这个就能理解这题的启发式写法了
#### 代码
启发式需要你拥有钝感力--需要你去不断训练