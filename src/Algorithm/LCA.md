---
title: 最近公共祖先LCA(Lowest Common Ancestor)
icon: sitemap
cover: https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80
editLink: false
order: 4
author: badbottle
date: 2024-08-24
category:
  - 算法
tag:
  - 图论
  - 树形结构
timeline: true
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 图论
copyright: 版权归badb0ttle所有
---CA(Lowest Common Ancestor)
cover:
icon: 
editLink: false
order: 4
author: badb0ttle
date: 2025-8-26
category:
-   算法
tag:
-   图论
# 此页面会在文章列表置顶
sticky: false
star: false
footer: 图论

---
# LCA
原文oi wiki:[最近公共祖先](https://oi-wiki.org/graph/lca/)
两个节点的最近公共祖先，就是这两个点的公共祖先里面，离根最远的那个。 为了方便，我们记某点集 
S=$\{v_1,v_2,\ldots,v_n\}$ 的最近公共祖先为 $\text{LCA}(v_1,v_2,\ldots,v_n)$ 或 $\text{LCA}(S)$。
**特殊性质**:LCA(l,l+1,l+2,...,r)=LCA(dfs序最小,dfs最大)
## 倍增求LCA
我们之前学过的st表用的就是倍增的思路.同理，通过预处理 $\text{fa}_{x,i}$ 数组，游标可以快速移动，大幅减少了游标跳转次数。$\text{fa}_{x,i}$表示点 $x$ 的第 $2^i$ 个祖先。$\text{fa}_{x,i}$ 数组可以通过 dfs 预处理出来.
### 模版
[倍增求LCA](https://github.com/badb0ttle/iomanip/blob/main/LCA.cpp)
## Tarjan求LCA
Tarjan 算法求LCA,需要使用 并查集 记录某个结点的祖先结点。但逻辑大差不差。因此直接贴模版了
### 模版
[Tarjan求LCA](https://github.com/badb0ttle/iomanip/blob/main/LCA(Tarjan).cpp)

## Tarjan求强连通分量
### 模版
[Tarjan_DG_SCC](https://github.com/badb0ttle/iomanip/blob/main/Tarjan(DG_SCC).cpp)
### 基本思想
Tarjan 算法本质是一次 DFS，在遍历图的同时，用 时间戳 (dfn) 和 能回溯到的最早时间戳 (low) 来判断一个点是否是强联通分量的根。
当发现一个结点是一个强联通分量的根时，就可以把它所在的 SCC 出栈并染色。
### 关键变量
dfn[x]：结点 x 被访问的时间戳（第几次被访问）。
low[x]：结点 x 能回溯到的最早祖先的时间戳。
idx：全局时间戳计数器，每访问一个新节点自增。
stk：栈，存储当前遍历路径上 还未确定属于哪个 SCC 的节点。
in_stk[x]：标记结点 x 是否在栈中。
col[x]：结点 x 所属的强联通分量编号（颜色）。
scc_cnt：当前找到的强联通分量总数。
### 算法流程
1.	访问一个结点 u
赋值 dfn[u] = low[u] = ++idx。
将 u 入栈，标记 in_stk[u] = true。
2.	DFS 遍历 u 的所有邻接点 v
如果 v 未访问：递归 DFS(v)，然后 low[u] = min(low[u], low[v])。
如果 v 已访问且在栈中：说明 v 是一个回点，更新
low[u] = min(low[u], dfn[v])。
3.	判断根节点
若 low[u] == dfn[u]，说明 u 是一个 SCC 的根。
从栈顶开始出栈，直到 u 被出栈，并将这些结点染上相同的颜色（scc_cnt++）。
### 注意事项
Tarjan 算法会构成一棵 搜索树，但并不是所有边都属于搜索树：
例如有一条 回边 (如 25 → 22)，它不会出现在 DFS 树中。
因此 不能简单地认为 DFS 树中的“儿子”就是图中的儿子。
这一点在 求割点/割边 时尤为重要。
## Tarjan求无向图割点割边
### 模版
[Tarjan(UDG_CV_B)](https://github.com/badb0ttle/iomanip/blob/main/Tarjan(UDG_CV_B).cpp)

割点 (articulation point) 和割边 (bridge) 只在无向图 中讨论。
无向图中强联通分量没有意义，所以相比 Tarjan 求 SCC：
不需要颜色数组 col、栈 stk、分量计数器 tot 等。
Tarjan 算法依然基于 DFS，使用 dfn[] 和 low[]。
### 关键概念
不回儿子：
在 DFS 树中，一个结点 x 的儿子 y，如果从 y 的子树内 没有一条回边 能回到 x 或 x 的祖先，那么称 y 是 x 的“不回儿子”。
### 割点的判断条件
设当前 DFS 树根为 root：
1.	根节点情况
如果 root 有 两个及以上的不回儿子，则 root 是割点。
2.	非根节点情况
如果存在一个儿子 y，使得
$low[y] \ge dfn[x]$
那么 x 是割点。
注意：只有 DFS 树中的儿子才参与判断。
### 割边的判断条件
在遍历 x → y 时，若 y 是 DFS 树中的儿子（不是父亲的回边），并且满足
$low[y] > dfn[x]$
则边 (x, y) 是一条割边。
## Tarjan判环
### 模版
[Tarjan(UDG_Cycle)](https://github.com/badb0ttle/iomanip/blob/main/Tarjan(UDG_Cycle).cpp)
有向图中存在环 == 存在一个 强连通分量 (SCC)，并且该 SCC 至少包含两个点，或者包含一个点但有自环。
因此可以直接用 Tarjan 求 SCC：
如果某个 SCC 的大小 > 1，则图中有环。
如果某个点单独成分量，但存在自环边，也说明有环
