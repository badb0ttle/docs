---
title: MST(Minimum Spanning Tree)
order: 4
editLink: false
category:
    - 算法知识
---
#
## 最小生成树
原文oi wiki:[MST](https://oi-wiki.org/graph/mst/)

## 方法
**1.Kruskal(按边)** <br>
**2.Prim(按点)**

## 1.Kruskal
思路很简单，为了造出一棵最小生成树，我们从最小边权的边开始，按边权从小到大依次加入，如果某次加边产生了环，就扔掉这条边，直到加入了**n-1**条边，即形成了一棵树。
时间复杂度` O(nlog(n))`
code:
```cpp
const int mx = 1e5 + 1;
ll pre[mx];
struct edge//结构体存边
{
    ll u, v, w;
    bool operator<(const edge &a) const
    {
        return w == a.w ? (u == a.u ? v < a.v : u < a.u) : w < a.w;
    }
};
ll root(ll v)//并查集
{
    return (pre[v] == v ? v : pre[v]=root(pre[v]));
}
vector<edge> es;
ll n,m,u,v,w,ans;
void work()
{
    cin >> n >> m;
    for (int i = 1; i <= n; ++i)//初始化
        pre[i] = i;
    for(int i=1;i<=m;++i)
    {
        cin>>u>>v>>w;
        es.push_back({u,v,w});
    }
    sort(begin(es),end(es));//贪心
    for(auto&[u1,v1,w]:es)
    {
        if(root(u1)==root(v1))continue;//同块说明已经接入了
            pre[root(u1)]=root(v1);//否则加进来
            ans+=w;
    }
    for(int i=1;i<n;++i)//判
    {
        if(root(i)!=root(i+1)){ans=-1;break;}
    }
}
```
## 2.Prim
该算法的基本思想是从一个结点开始，不断加点,具体来说，每次要选择距离最小的一个结点，以及用新的边更新其他结点的距离。
时间复杂度 `O((n + m)log n)`
code:
```cpp
const int mx = 2e5 + 1;
const ll inf = 4e18;
struct edge//存出点和权值
{
    ll v, w;
    bool operator<(const edge &a) const
    {
        return w == a.w ? v < a.v : w > a.w;
    }
};
vector<edge> es[mx];
ll n,m;
ll d[mx],u,v,w;
bitset<mx> intree;//维护已经选中的点
void work()
{
    cin>>n>>m;
    fill(begin(d),end(d),inf);//初始化
    for(int i=1;i<=m;++i)
    {
        cin>>u>>v>>w;
        es[u].push_back({v,w});
        es[v].push_back({u,w});
    }
    priority_queue<edge>pq;//堆优化
    pq.push({1,0});//先存入初始点
    d[1]=0;//标记为已选
    ll ans=0;
    while(pq.size())
    {
        int x=pq.top().v;
        pq.pop();
        if(intree[x])continue;//如果已经存过就跳过
        intree[x]=1;
        ans+=d[x];
        d[x]=0;
        for(auto&[y,w]:es[x])//判断邻接点
        {
            if(!intree[y]&&d[y]>w)
            {
                d[y]=w;
                pq.push({y,w});
            }
        }
    }
    for(int i=1;i<=n;++i)if(!intree[i]){ans=-1;break;}//判
    cout<<ans<<'\n';
```