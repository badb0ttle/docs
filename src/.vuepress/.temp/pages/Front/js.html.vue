<template><div><h1 id="一、基础语法" tabindex="-1"><a class="header-anchor" href="#一、基础语法"><span>一、基础语法</span></a></h1>
<h2 id="_1-import" tabindex="-1"><a class="header-anchor" href="#_1-import"><span>1.import</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>import { useState, useEffect } from 'react';</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>命名导入,useState 和 useEffect 是 react 模块里导出的多个函数/变量中的两个<br>
<em>useState</em>:在函数组件中 声明和管理状态,例如:<br></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>const [count, setCount] = useState(0);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>count 是当前状态值，初始为 0,setCount 是修改 count 的函数，比如调用 <code v-pre>setCount(5)</code> 会把 count 设为 5</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>useEffect(() => {</span></span>
<span class="line"><span>  document.title = `点击了 ${count} 次`;</span></span>
<span class="line"><span>}, [count]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每当 count 变化时，更新页面标题,第二个参数 <code v-pre>[count]</code> 是依赖数组，告诉 React 只有当 count 变化时才执行这个副作用函数</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>import QuestionCard from './QuestionCard';</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>默认导入,./QuestionCard 这个模块默认导出一个值（一般是组件、函数或对象）</p>
<h2 id="_2-function" tabindex="-1"><a class="header-anchor" href="#_2-function"><span>2.function</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>function App() {</span></span>
<span class="line"><span>  // ...一些逻辑</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &#x3C;div>...&#x3C;/div></span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default App;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是网页中的一个“页面组件”，像是网页里的一个模块<br>
React 要求你返回一段 JSX 代码<br>
JSX 会被 React 转换成真正的 DOM 元素，渲染到页面上</p>
<h2 id="_3-定义" tabindex="-1"><a class="header-anchor" href="#_3-定义"><span>3.定义</span></a></h2>
<p>和java与cpp不同，你不需要事先声明类型，只需要你写出来后赋值就自带定义:
abc:'abc'字符串
abc:['a','b','c']数组
abc:{a:,c:}对象</p>
<h2 id="_4-计时器" tabindex="-1"><a class="header-anchor" href="#_4-计时器"><span>4.计时器</span></a></h2>
<p>setTimeout(fn, ms)：延迟 ms 毫秒后执行 fn 函数（只执行一次）</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>const timerId = setTimeout(() => {</span></span>
<span class="line"><span>  console.log("3秒后执行这段代码");</span></span>
<span class="line"><span>}, 3000);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>clearTimeout(id)：取消之前通过 setTimeout 注册的任务</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>clearTimeout(timerId);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_5-遍历-map" tabindex="-1"><a class="header-anchor" href="#_5-遍历-map"><span>5.遍历(.map)</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>    {options.map((opt, idx) => (</span></span>
<span class="line"><span>           &#x3C;li key={idx}></span></span>
<span class="line"><span>           {opt}</span></span>
<span class="line"><span>          &#x3C;/li></span></span>
<span class="line"><span>        ))}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它其实会被转成 React.createElement()调用<br>
告诉 React 创建这个组件React 会执行 QuestionCard 函数<br>
传入你写的 props（比如 title、options）<br>
QuestionCard 返回 JSX（一个具体的 <code v-pre>&lt;div&gt;, &lt;ul&gt;, &lt;li&gt;</code> 等元素）<br>
React 继续渲染这些元素，直到最后全部变成浏览器能识别的 HTML 标签显示出来<br>
其实就是你把需要的JSX放在另外一个文件里面写，到这里只要进行传数据的操作就行了<br></p>
<h3 id="key" tabindex="-1"><a class="header-anchor" href="#key"><span>key</span></a></h3>
<p>这个key很有意思，React 在生成虚拟 DOM 树时，需要区分每个元素，这样它才能优化渲染<br>
举个简单de例子:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>        {['a', 'b', 'c'].map((name, idx) => (</span></span>
<span class="line"><span>              &#x3C;li key={idx}>{name}&#x3C;/li></span></span>
<span class="line"><span>            ))}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里
idx 是 0、1、2
key={idx} 把这个数字告诉 React:这是这个 <code v-pre>&lt;li&gt; </code>的“身份证号”
如果你写成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>{['a', 'b', 'c'].map((name, idx) => (</span></span>
<span class="line"><span> &#x3C;li>{name}&#x3C;/li>  </span></span>
<span class="line"><span>))}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 React 不知道每个 <code v-pre>&lt;li&gt; </code>的身份，每次更新时可能会重新渲染整个列表
通俗易懂的讲:哈希表查询O1,普通查询On</p>
</div></template>


