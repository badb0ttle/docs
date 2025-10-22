---
title: string(字符串基础)
icon: font
cover: https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2089&q=80
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 字符串
    - 基础算法
author: badbottle
footer: 字符串
copyright: 版权归badb0ttle所有
date: 2024-08-24
timeline: true
---

# **字符串**
原文oi wiki:[string](https://oi-wiki.org/lang/csl/string/)
## **后缀**
后缀是指从某个位置 `i` 开始到整个串末尾结束的一个特殊子串。字符串 `S` 的从 `i` 开头的后缀表示为 $Suffix(S, i)$，也就是 $Suffix(S, i) = S[i..|S|-1]$。

**真后缀**：除去 `S` 本身的所有后缀。

<span style="color:red;">前缀</span> 同理。

## **前缀**
前缀是指从串首开始到某个位置 `i` 结束的一个特殊子串。字符串 `S` 的以 `i` 结尾的前缀表示为 $Prefix(S, i)$，也就是 $Prefix(S, i) = S[0..i]$。

## **回文串**
若字符串满足 $s[l] = s[|s| + 1 - i]$，则称其为正反写相同的字符串，即回文串。
此内容会在下面的Manacher,字符串哈希会有详细解释
字符串本质上是一个 `char` 数组，用 <span style="color:red;">空字符 `\0` </span> 作为尾标。

## **字符串标准库**

### **查找相关方法**
- `find(ch, start = 0)`：查找并返回从 `start` 开始的字符 `ch` 的位置（位置从 0 开始计数）。若查找不到，返回 -1。
- `rfind(ch)`：从末尾开始查找，并返回第一个找到的字符 `ch` 的位置（位置从 0 开始计数）。若查找不到，返回 -1。

### **截取与拼接方法**
- `substr(start, len)`：从字符串的 `start` 位置（从 0 开始）截取一个长度为 `len` 的字符串。若缺省 `len`，则截取到字符串末尾。
- `append(s)`：将字符串 `s` 添加到当前字符串末尾。

### **替换方法**
`replace` 方法有两种常见用法：
- `replace(pos, n, s)`：将字符串从 `pos` 开始的 `n` 个字符替换为字符串 `s`。
- `replace(pos, n, s)`：先删除从 `pos` 开始的 `n` 个字符，然后在 `pos` 处插入字符串 `s`。

### **删除与插入方法**
- `erase(pos, n)`：删除从 `pos` 开始的 `n` 个字符。
- `insert(pos, s)`：在 `pos` 位置插入字符串 `s`。

### **比较运算符**
`std::string` 重载了比较运算符，其时间复杂度为 $\Theta(N)$。
## KMP
原文oi wiki:[KMP](https://oi-wiki.org/string/kmp/)
在字符串中查找子串
### 原理
我们构造一个字符串
$s + \# + t$，其中\#为一个既不出现在 s 中也不出现在𝑡中的分隔符。接下来计算该字符串的前缀函数。现在考虑该前缀函数除去最开始n + 1 个值（即属于字符串𝑠和分隔符的函数值）后其余函数值的意义。根据定义,$\pi[i]$为右端点在i且同时为一个前缀的最长真子串的长度，具体到我们的这种情况下，其值为与s的前缀相同且右端点位于 𝑖
i 的最长子串的长度。由于分隔符的存在，该长度不可能超过n。而如果等式$\pi[i] = n$成立，则意味着s完整出现在该位置（即其右端点位于位置i）。注意该位置的下标是对字符串$s + \# + t$而言的。
因此如果在某一位置i有$\pi[i] = n$成立，则字符串s在字符串t的i - (n - 1) - (n + 1) = i - 2n 处出现。
[模板](https://github.com/badb0ttle/iomanip/blob/main/KMP.cpp)
## 字符串哈希
原文oi wiki:[StringHush](https://oi-wiki.org/string/hash/)
定义:
我们定义一个把字符串映射到整数的函数f，这个 f 称为是 Hash 函数。我们希望这个函数 f 可以方便地帮我们判断两个字符串是否相等。
Hash 的核心思想在于，将输入映射到一个值域较小、可以方便比较的范围。
[模板](https://github.com/badb0ttle/iomanip/blob/main/String-Hash.cpp)
## Manacher
原文oi wiki:[Manacher](https://oi-wiki.org/string/manacher/#manacher-%E7%AE%97%E6%B3%95)
用例:
给定一个长度为 𝑛的字符串 𝑠，请找到所有对 (𝑖,𝑗)使得子串 𝑠[𝑖…𝑗] 为一个回文串。当$t = t_{\text{rev}}$ 时，字符串𝑡是一个回文串$(t_{rev}$ 是t的反转字符串）。
[模版](https://github.com/badb0ttle/iomanip/blob/main/Manacher.cpp)
## 字典树Trie
原文oi wiki:[trie](https://oi-wiki.org/string/trie/)
字典树，英文名 trie。顾名思义，就是一个像字典一样的树。
它在字符串或者二进制中有其独特的应用:
1. 检索字符串:字典树最基础的应用——查找一个字符串是否在「字典」中出现过。
2. 维护异或极值:将数的二进制表示看做一个字符串，就可以建出字符集为\{0,1\} 的 trie 树。
3. AC 自动机:trie 是 AC 自动机 的一部分。
4. 维护异或和:01-trie 是指字符集为\{0,1\} 的 trie
5. 全局加一:所谓全局加一就是指，让这棵 trie 中所有的数值 +1。
### ac自动机
原文oi wiki:[AC-Automaton](https://oi-wiki.org/string/ac-automaton/)
AC（Aho–Corasick）自动机是 以 Trie 的结构为基础，结合 KMP 的思想 建立的自动机，用于解决多模式匹配等任务.
#### 步骤原理
1. 首先将所有模式串构建出trie树
2. 通过kmp对trie树上的所有节点构建失配指针(fail)
建立完毕后，就可以利用它进行多模式匹配。
[模版](https://github.com/badb0ttle/iomanip/blob/main/AC-Automaton.cpp)
