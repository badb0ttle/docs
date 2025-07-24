---
title: Qt
icon: gears
order: 4
editLink: false
category:
  - 知识点
tag:
  - 语言


---
#
# 1.QT基础操作


# 2.QAction
step1:首先你要对所在组件的窗口的.h里先构造一个槽函数，像是:
```cpp

private slots:
    void f1();
    void f2();
    //......
```
step2:然后在你所需要组建的窗口的.cpp里面开始定义和链接
```cpp
    connect()
```
这是一个链接组件与Action的函数里面的参数如下:

QObject::connect(组件,信号)