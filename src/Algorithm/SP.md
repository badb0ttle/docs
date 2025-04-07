---
title: SP(Shortest Path)
order: 4
editLink: false
category:
    - 算法知识
---
#
## 最短路径
原文oi wiki:[SP](https://oi-wiki.org/graph/shortest-path/)

## 方法
1.**Dijkstra**<br>
2.**Floyd**

## 1.Dijkstra
用于求 `单源最短路径`，只能处理非负权边。其核心思想是：
每次从未确定的点中选择当前距离源点最近的点加入集合，并用它来更新其他点的最短距离。

堆优化 Dijkstra 时间复杂度为` O((n + m)log n)`,适用于`稀疏图`
code:
```cpp
const int mx=2e5+1;
const ll inf=4e18;
struct edge{
ll v,w;
bool operator <(const edge&a)const{//这里因为默认是大根堆我们要把权值小的放到堆首
    return w==a.w?v<a.v:w>a.w;
}
};
vector<edge>g[mx];
ll dp[mx];
void dijkstra(int st)
{
    bitset<mx>vis;
    fill(begin(dp),end(dp),inf);//初始化
    priority_queue<edge>qp;
    dp[st]=0;//加入初始点
    qp.push({st,0});
    while(qp.size())
    {
        ll x=qp.top().v;
        qp.pop();
        if(vis[x])continue;//如果已经存过就跳过
        vis[x]=1;
        for(auto&[v,w]:g[x])
        {
            if(!vis[v]&&dp[v]>dp[x]+w)dp[v]=dp[x]+w;//遍历邻接点
            qp.push({v,dp[v]});
        }
    }
}
```
## 2.Floyd
Floyd-Warshall 算法用于解决任意两点之间的最短路径问题，`多源最短路`,适合点数较小的图（一般 ≤ 500）。
它通过三重循环，不断尝试以每一个点为中转点更新两点之间的最短距离。

时间复杂度：`O(n^3)`，适用于`稠密图`、小数据图。
code:
```cpp
const int mx = 301;
const ll inf=4e18;
ll dp[mx][mx];
void work()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; ++i)
        fill(begin(dp[i]), end(dp[i]), inf);
    for(int i=1;i<=n;++i)dp[i][i]=0;
    for(int k=1;k<=n;++k)  
    for(int i=1;i<=n;++i)  
    for(int j=1;j<=n;++j)dp[i][j]=min(dp[i][j],dp[i][k]+dp[k][j])  ;
}
```