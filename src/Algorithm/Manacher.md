---
title: Manacher(马拉车)
icon: expand-arrows-alt
cover: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
order: 4
editLink: false
author: badbottle
footer: 字符串
copyright: 无版权
category:
    - 算法
tag:
    - 字符串
    - 回文
date: 2024-08-24
timeline: true
---
#

原文oi wiki:[马拉车](https://oi-wiki.org/string/manacher/)

## 马拉车
一种通过在字符串中两两字符的中间添加额外字符实现的一种牺牲空间的算法<br>
模版：[Manacher](https://github.com/badb0ttle/iomanip/blob/main/Manacher.cpp)
### 初始化
```cpp
for(int i=2*n+1;i>=1;--i)
    {
        if(i&1)s[i]='#';
        else s[i]=s[i>>1];
    }
s[0]='$',s[2*n+2]='^';
```
首先我们要知道在初始化字符串的时候我们需要开两倍的空间(因为我们要在两两字符串中间插入一个字符)，届时奇数位的字符都是我们新增的字符，因此我们从后往前遍历，偶数位则为i>>1也就是我们输入的字符,最后要在开头和结尾处再加一个不同的字符来防止越界<br>
原字符串：`aba`
处理后： `$ # a # b # a # ^`
### 核心
```cpp
int C=0,R=0,ans=1;
    for(int i=1;i<=2*n+1;++i)
    {
        p[i]=i<R?min(R-i,p[2*C-i]):1;
        while(s[i+p[i]]==s[i-p[i]])p[i]++;
        if(p[i]+i>R)
        {
            C=i;
            R=i+p[i];
        }
    }
```
这是马拉车的**主要核心部分**:<br>
回文的特性是中心对称，那么：
如果我们知道某个以C为中心、半径为p[C]的回文子串<br>
并且当前遍历到的位置i在这个回文子串内（i < R）
我们就能用对称点j = 2*C - i的信息来初始化p[i]。

对称点公式：<br>
`j = 2*C - i`

## 初始化 p[i]

分两种情况：

 ### 情况1：
 **i在当前回文串右边界R之外**<br>
此时无法利用之前的信息，只能暴力扩展，初始p[i] = 1

 ### 情况2：
 **i在R之内**<br>
`p[i] = min(R - i, p[j])`<br>
`R - i`：i到R的距离，不能超界<br>
`p[j]`：对称位置的回文半径，可以继承它的一部分
因为p[j]对应的回文串如果左边界超过C-(R-C)，就不能保证和以i为中心的回文串对称，所以我们要取R - i这个范围内的最小值。
## 中心扩展
无论初始p[i]是多少，都要尝试继续左右扩展：
`while(s[i + p[i]] == s[i - p[i]]) p[i]++;`
遇到相等字符就把半径+1，直到两边字符不相等。
如果当前扩展后的回文串右端i + p[i]超过原来的右边界R，说明以i为中心的回文串更靠右了，更新：
```cpp
if(i + p[i] > R)
{
    C = i;
    R = i + p[i];
}
```