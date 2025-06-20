<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1>
<h1 id="_1-qt基础操作" tabindex="-1"><a class="header-anchor" href="#_1-qt基础操作"><span>1.QT基础操作</span></a></h1>
<h1 id="_2-qaction" tabindex="-1"><a class="header-anchor" href="#_2-qaction"><span>2.QAction</span></a></h1>
<p>step1:首先你要对所在组件的窗口的.h里先构造一个槽函数，像是:</p>
<div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">private slots:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> f1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> f2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //......</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>step2:然后在你所需要组建的窗口的.cpp里面开始定义和链接</p>
<div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    connect</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这是一个链接组件与Action的函数里面的参数如下:</p>
<p>QObject::connect(组件,信号)</p>
</div></template>


