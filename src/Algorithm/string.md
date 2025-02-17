---
title: string(字符串)
order: 4
editLink: false
category:
    - 算法知识
tag:
    - 知识点
---

# **字符串基础**
原文oi wiki:[string](https://oi-wiki.org/lang/csl/string/)
## **后缀**
后缀是指从某个位置 `i` 开始到整个串末尾结束的一个特殊子串。字符串 `S` 的从 `i` 开头的后缀表示为 $Suffix(S, i)$，也就是 $Suffix(S, i) = S[i..|S|-1]$。

**真后缀**：除去 `S` 本身的所有后缀。

<span style="color:red;">前缀</span> 同理。

## **前缀**
前缀是指从串首开始到某个位置 `i` 结束的一个特殊子串。字符串 `S` 的以 `i` 结尾的前缀表示为 $Prefix(S, i)$，也就是 $Prefix(S, i) = S[0..i]$。

# **回文串**
若字符串满足 $s[l] = s[|s| + 1 - i]$，则称其为正反写相同的字符串，即回文串。

字符串本质上是一个 `char` 数组，用 <span style="color:red;">空字符 `\0` </span> 作为尾标。

# **字符串标准库**

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