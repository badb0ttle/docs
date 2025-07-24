---
title: 对拍
icon: gears
cover: https://i-blog.csdnimg.cn/blog_migrate/19df738933c3fc0c1d914666ae9c8166.png
order: 4
editLink: false
category:
  - 算法知识
date: 2025-07-09
timeline: true
---
#
## 1.对拍
首先，我对于oi这个赛制有着极其的`厌恶感!`(主要是有一场打差了QAQ)所以我愤起写了这么一个博客。
`对拍`是什么呢?<br>
oi赛制是看不到提交代码是否正确的,所以怎么去判断呢?这个时候我们可以用很暴力的方式来比对。<br>
现在我们有一道题:输入a,b,输出a+b;我们现在有一个自己的代码:<br>
```my.cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
    int a,b;
    cin>>a>>b;
    if(a%20==1)cout<<a-b<<'\n';
    else cout<<a+b<<'\n';
    return 0;
}
```
我们要检查一下我们的代码是否正确，我们可以用一个复杂度较高但是你确定是100%正确的方法!<br>
```brute.cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl; 
    return 0;
}
```
现在我们需要一个rand来生成随机数据:<br>
```rand.cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
    srand(time(0) * clock());
    cout<<rand()%100<<' '<<rand()%100<<'\n';
}
```
可以自己根据题目来修改范围.<br>
然后就是板子，我把启动脚本和duipai脚本整合到了一起，多写几遍就行<br>
[对拍模版](https://github.com/badb0ttle/iomanip/blob/main/StressTest.cpp)

记得，每一个脚本的创建都需要```chmod +x run.sh```<br>
然后我们只需要./run.sh my就可以啦
效果：<br>
<img src="https://badb0ttle.github.io/picx-images-hosting/3551752000224_.pic.1vyxni1mt1.webp">
可以给自己创建一个目录来加强训练自己的对拍速度

