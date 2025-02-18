"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9066],{1098:(i,s,a)=>{a.r(s),a.d(s,{comp:()=>k,data:()=>t});var n=a(641);const h={},k=(0,a(6262).A)(h,[["render",function(i,s){return(0,n.uX)(),(0,n.CE)("div",null,s[0]||(s[0]=[(0,n.Fv)('<h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1><h2 id="线性、区间、树形-dp" tabindex="-1"><a class="header-anchor" href="#线性、区间、树形-dp"><span>线性、区间、树形 DP</span></a></h2><p>原文oi wiki:<a href="https://oi-wiki.org/dp/tree/" target="_blank" rel="noopener noreferrer">树形 DP</a><a href="https://oi-wiki.org/dp/interval/" target="_blank" rel="noopener noreferrer">区间 DP</a></p><h3 id="_1-线性-dp" tabindex="-1"><a class="header-anchor" href="#_1-线性-dp"><span>1. 线性 DP</span></a></h3><p>每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。</p><p><code>dp[i][j]</code>: 到第 <code>i</code> 种为止，总数为 <code>j</code> 的总方案数。</p><p><strong>例题</strong>: <a href="https://www.luogu.com.cn/problem/P1077" target="_blank" rel="noopener noreferrer">P1077</a></p><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">][</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 初始化</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">i) {</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 到第 i 种花为止</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> m; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">j) {</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 一共放了 j 盆花</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">&amp;&amp;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">k) {</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 第 i 种花放了 k 盆</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">][j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][j]) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> mod;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-区间-dp" tabindex="-1"><a class="header-anchor" href="#_2-区间-dp"><span>2. 区间 DP</span></a></h3><p>区间 DP 是指状态转移方程中，每个状态表示一个区间 [i, j] 上的某种性质，且状态转移依赖于更小的子区间。通常用于解决区间划分、合并、分割等问题。</p><p>步骤:</p><p>先求小区间的 DP。 转移到大区间。 初始化。 例题: <a href="https://www.luogu.com.cn/problem/P5569" target="_blank" rel="noopener noreferrer">P5569</a></p><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> mx </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 301</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, inf </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 4</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">18</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[mx], </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[mx][mx], n, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">pre</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[mx];</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> work</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    cin </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n;</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">i) cin </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i];</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">i) </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">pre</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> pre</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">];</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> len </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; len </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">len) {</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> len </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">i, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">j) {</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> inf;</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i; k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">k) {</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">                dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> min</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][j], </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i][k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> dp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">][j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> pre</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> pre</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]);</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-树形-dp" tabindex="-1"><a class="header-anchor" href="#_3-树形-dp"><span>3. 树形 DP</span></a></h3><p>通常利用树的递归性质，从子树的解推导出父节点的解，核心思想是将原问题分解为若干子问题，通过求解子问题来得到原问题的解。在树形 DP 中，我们一般会进行深度优先搜索（DFS）来遍历树的节点，从而完成状态的转移。</p><p>步骤:</p><p>构造一种方案，并设定一个归属。 确定状态、表示。 状态转移。 遍历顺序。 例题: <a href="https://www.luogu.com.cn/problem/P1122" target="_blank" rel="noopener noreferrer">P1122</a></p>',17)]))}]]),t=JSON.parse('{"path":"/Algorithm/DP_L_I_T.html","title":"DP:Linear, Interval, Tree (线性、区间、树形dp)","lang":"zh-CN","frontmatter":{"title":"DP:Linear, Interval, Tree (线性、区间、树形dp)","order":4,"editLink":false,"category":["算法知识"],"tag":["知识点"],"description":"线性、区间、树形 DP 原文oi wiki:树形 DP区间 DP 1. 线性 DP 每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。 dp[i][j]: 到第 i 种为止，总数为 j 的总方案数。 例题: P1077 2. 区间 DP 区间 DP 是指状态转移方程中，每个状态表示一个区间 ...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/docs/Algorithm/DP_L_I_T.html"}],["meta",{"property":"og:site_name","content":"Badbottle\'s blog"}],["meta",{"property":"og:title","content":"DP:Linear, Interval, Tree (线性、区间、树形dp)"}],["meta",{"property":"og:description","content":"线性、区间、树形 DP 原文oi wiki:树形 DP区间 DP 1. 线性 DP 每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。 dp[i][j]: 到第 i 种为止，总数为 j 的总方案数。 例题: P1077 2. 区间 DP 区间 DP 是指状态转移方程中，每个状态表示一个区间 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-17T10:26:42.000Z"}],["meta",{"property":"article:tag","content":"知识点"}],["meta",{"property":"article:modified_time","content":"2025-02-17T10:26:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DP:Linear, Interval, Tree (线性、区间、树形dp)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-17T10:26:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"线性、区间、树形 DP","slug":"线性、区间、树形-dp","link":"#线性、区间、树形-dp","children":[{"level":3,"title":"1. 线性 DP","slug":"_1-线性-dp","link":"#_1-线性-dp","children":[]},{"level":3,"title":"2. 区间 DP","slug":"_2-区间-dp","link":"#_2-区间-dp","children":[]},{"level":3,"title":"3. 树形 DP","slug":"_3-树形-dp","link":"#_3-树形-dp","children":[]}]}],"git":{"createdTime":1739788002000,"updatedTime":1739788002000,"contributors":[{"name":"badb0ttle","username":"badb0ttle","email":"2546744220@qq.com","commits":1,"url":"https://github.com/badb0ttle"}]},"readingTime":{"minutes":1.68,"words":505},"filePathRelative":"Algorithm/DP:L&I&T.md","localizedDate":"2025年2月17日","excerpt":"\\n<h2>线性、区间、树形 DP</h2>\\n<p>原文oi wiki:<a href=\\"https://oi-wiki.org/dp/tree/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">树形 DP</a><a href=\\"https://oi-wiki.org/dp/interval/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">区间 DP</a></p>\\n<h3>1. 线性 DP</h3>\\n<p>每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。</p>","autoDesc":true}')},6262:(i,s)=>{s.A=(i,s)=>{const a=i.__vccOpts||i;for(const[i,n]of s)a[i]=n;return a}}}]);