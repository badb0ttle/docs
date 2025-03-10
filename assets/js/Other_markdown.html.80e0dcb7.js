"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3910],{3346:(s,a,e)=>{e.r(a),e.d(a,{comp:()=>r,data:()=>l});var n=e(6254),i=e(8627);const t={},r=(0,e(6995).A)(t,[["render",function(s,a){const e=(0,n.g2)("Tabs"),t=(0,n.g2)("VPCard"),r=(0,n.g2)("Badge"),l=(0,n.g2)("CodeTabs");return(0,n.uX)(),(0,n.CE)("div",null,[a[14]||(a[14]=(0,n.Fv)('<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识"><span>基础知识</span></a></h2><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"># 一级标题</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">## 二级标题</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">### 三级标题</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">#### 四级标题</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">##### 五级标题</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">###### 六级标题</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">网站名称</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">网站链接</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 像这样 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lolol</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">www.baidu.com</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vuepress扩展" tabindex="-1"><a class="header-anchor" href="#vuepress扩展"><span>vuepress扩展</span></a></h2><p>VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。</p><p>你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。</p>',6)),(0,n.Q3)(" more "),a[15]||(a[15]=(0,n.Fv)('<h3 id="markdown-介绍" tabindex="-1"><a class="header-anchor" href="#markdown-介绍"><span>Markdown 介绍</span></a></h3><p>如果你是一个新手，还不会编写 Markdown，请先阅读 <a href="https://theme-hope.vuejs.press/zh/cookbook/markdown/" target="_blank" rel="noopener noreferrer">Markdown 介绍</a> 和 <a href="https://theme-hope.vuejs.press/zh/cookbook/markdown/demo.html" target="_blank" rel="noopener noreferrer">Markdown 演示</a>。</p><h3 id="markdown-配置" tabindex="-1"><a class="header-anchor" href="#markdown-配置"><span>Markdown 配置</span></a></h3><p>VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。</p><div class="hint-container important"><p class="hint-container-title">Frontmatter</p><p>Frontmatter 是 VuePress 中很重要的一个概念，请阅读 <a href="https://theme-hope.vuejs.press/zh/cookbook/vuepress/page.html#front-matter" target="_blank" rel="noopener noreferrer">Frontmatter 介绍</a> 了解详情。</p></div><h3 id="markdown-扩展" tabindex="-1"><a class="header-anchor" href="#markdown-扩展"><span>Markdown 扩展</span></a></h3><p>VuePress 会使用 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it</a> 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 <a href="https://github.com/markdown-it/markdown-it#syntax-extensions" target="_blank" rel="noopener noreferrer">语法扩展</a> 。</p><h4 id="vuepress-扩展" tabindex="-1"><a class="header-anchor" href="#vuepress-扩展"><span>VuePress 扩展</span></a></h4><p>为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。</p><p>关于这些扩展，请阅读 <a href="https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html" target="_blank" rel="noopener noreferrer">VuePress 中的 Markdown 扩展</a>。</p><h4 id="主题扩展" tabindex="-1"><a class="header-anchor" href="#主题扩展"><span>主题扩展</span></a></h4><p>通过 VuePress 插件，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。</p><h5 id="选项卡" tabindex="-1"><a class="header-anchor" href="#选项卡"><span>选项卡</span></a></h5>',13)),(0,n.bF)(e,{id:"56",data:[{id:"apple"},{id:"banana"},{id:"orange"}],"tab-id":"fruit"},{title0:(0,n.k6)((({value:s,isActive:e})=>a[0]||(a[0]=[(0,n.eW)("apple")]))),title1:(0,n.k6)((({value:s,isActive:e})=>a[1]||(a[1]=[(0,n.eW)("banana")]))),title2:(0,n.k6)((({value:s,isActive:e})=>a[2]||(a[2]=[(0,n.eW)("orange")]))),tab0:(0,n.k6)((({value:s,isActive:e})=>a[3]||(a[3]=[(0,n.Lk)("p",null,"Apple",-1)]))),tab1:(0,n.k6)((({value:s,isActive:e})=>a[4]||(a[4]=[(0,n.Lk)("p",null,"Banana",-1)]))),tab2:(0,n.k6)((({value:s,isActive:e})=>a[5]||(a[5]=[(0,n.Lk)("p",null,"Orange",-1)]))),_:1}),a[16]||(a[16]=(0,n.Fv)('<ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/content/tabs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="脚注" tabindex="-1"><a class="header-anchor" href="#脚注"><span>脚注</span></a></h5><p>此文字有脚注<a href="%E8%BF%99%E6%98%AF%E8%84%9A%E6%B3%A8%E5%86%85%E5%AE%B9">^first</a>.</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/content/footnote.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="导入文件" tabindex="-1"><a class="header-anchor" href="#导入文件"><span>导入文件</span></a></h5><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/content/include.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="tex-语法" tabindex="-1"><a class="header-anchor" href="#tex-语法"><span>TeX 语法</span></a></h5><p class="katex-block"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mfrac><msup><mi mathvariant="normal">∂</mi><mi>r</mi></msup><mrow><mi mathvariant="normal">∂</mi><msup><mi>ω</mi><mi>r</mi></msup></mrow></mfrac><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mo>=</mo><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mrow><mo fence="true">{</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mi>r</mi></msup><mo>+</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>r</mi></munderover><mfrac><mrow><mo stretchy="false">(</mo><mo>−</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mi>i</mi></msup><mi>r</mi><mo>⋯</mo><mo stretchy="false">(</mo><mi>r</mi><mo>−</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mrow><mi>r</mi><mo>−</mo><mi>i</mi></mrow></msup></mrow><msup><mi>ω</mi><mi>i</mi></msup></mfrac><mo fence="true">}</mo></mrow></mrow><annotation encoding="application/x-tex">\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right) = \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^i r \\cdots (r-i+1) (\\log y)^{r-i}} {\\omega^i} \\right\\} </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord" style="margin-right:0.05556em;">∂</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.5904em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord" style="margin-right:0.05556em;">∂</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3414em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">ω</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:3.0277em;vertical-align:-1.2777em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3414em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">ω</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size4">{</span></span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.5017em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7507em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">−</span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8247em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8247em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span><span class="mbin mtight">−</span><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size4">}</span></span></span></span></span></span></span></p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tex.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="任务列表" tabindex="-1"><a class="header-anchor" href="#任务列表"><span>任务列表</span></a></h5><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 计划 1</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 计划 2</label></li></ul><p><a href="https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tasklist.html" target="_blank" rel="noopener noreferrer">查看详情</a></p><h4 id="图片增强" tabindex="-1"><a class="header-anchor" href="#图片增强"><span>图片增强</span></a></h4><p>支持为图片设置颜色模式和大小。</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/grammar/image.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="上下角标" tabindex="-1"><a class="header-anchor" href="#上下角标"><span>上下角标</span></a></h5><p>19<sup>th</sup> H<sub>2</sub>O</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/grammar/sup-sub.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="组件" tabindex="-1"><a class="header-anchor" href="#组件"><span>组件</span></a></h5>',19)),(0,n.bF)(t,(0,i._B)((0,n.Ng)({title:"Mr.Hope",desc:"Where there is light, there is hope",logo:"https://mister-hope.com/logo.svg",link:"https://mister-hope.com",background:"rgba(253, 230, 138, 0.15)"})),null,16),a[17]||(a[17]=(0,n.Fv)('<ul><li><a href="https://theme-hope.vuejs.press/zh/guide/component/grammar.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="提示容器" tabindex="-1"><a class="header-anchor" href="#提示容器"><span>提示容器</span></a></h5><div><p>安全的在 Markdown 中使用 {{ variable }}。</p></div><div class="hint-container info"><p class="hint-container-title">自定义标题</p><p>信息容器，包含 <code>代码</code> 与 <a href="#%E6%8F%90%E7%A4%BA%E5%AE%B9%E5%99%A8">链接</a>。</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><div class="hint-container tip"><p class="hint-container-title">自定义标题</p><p>提示容器</p></div><div class="hint-container warning"><p class="hint-container-title">自定义标题</p><p>警告容器</p></div><div class="hint-container caution"><p class="hint-container-title">自定义标题</p><p>危险容器</p></div><details class="hint-container details"><summary>自定义标题</summary><p>详情容器</p></details><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/alert.html" target="_blank" rel="noopener noreferrer">GitHub 警示</a></li><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html" target="_blank" rel="noopener noreferrer">提示框</a></li></ul><h5 id="自定义对齐" tabindex="-1"><a class="header-anchor" href="#自定义对齐"><span>自定义对齐</span></a></h5><div style="text-align:center;"><p>我是居中的</p></div><div style="text-align:right;"><p>我在右对齐</p></div><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/align.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="属性支持" tabindex="-1"><a class="header-anchor" href="#属性支持"><span>属性支持</span></a></h5><p>一个拥有 ID 的 <strong id="word">单词</strong>。</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/attrs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="标记" tabindex="-1"><a class="header-anchor" href="#标记"><span>标记</span></a></h5><p>你可以标记 <mark>重要的内容</mark> 。</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/mark.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="剧透" tabindex="-1"><a class="header-anchor" href="#剧透"><span>剧透</span></a></h5><p>VuePress Theme Hope <span class="spoiler" tabindex="-1">十分强大</span>.</p><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/spoiler.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="样式化" tabindex="-1"><a class="header-anchor" href="#样式化"><span>样式化</span></a></h5>',23)),(0,n.Lk)("p",null,[a[7]||(a[7]=(0,n.eW)("向 Mr.Hope 捐赠一杯咖啡。 ")),(0,n.bF)(r,{type:"tip"},{default:(0,n.k6)((()=>a[6]||(a[6]=[(0,n.eW)("Recommended")]))),_:1})]),a[18]||(a[18]=(0,n.Fv)('<ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/stylize/stylize.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="图表" tabindex="-1"><a class="header-anchor" href="#图表"><span>图表</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/chartjs.html" width="100%" height="450"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/chartjs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts"><span>ECharts</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/echarts.html" width="100%" height="800"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/echarts.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图"><span>流程图</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/flowchart.html" width="100%" height="450"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/flowchart.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="markmap" tabindex="-1"><a class="header-anchor" href="#markmap"><span>MarkMap</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/markmap.html" width="100%" height="380"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/markmap.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid"><span>Mermaid</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/mermaid.html" width="100%" height="620"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/mermaid.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h5><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBCoKnELT2rKt3AJx9IUB5koOlrZI_MRt-siOcBAp6dHE5PnuIdNVEVDRS-RTlAnQK014258FLWZJ0Tp_gMFksVpiMLcbESgl1i_eJdotkVBjduOijIGXeXgi3IwKNvfGL0-oQ-Q5_rTFl6vxDQdYreVxvs7rWIxaoV_7G5AuMdUngUBkz-iMx3qxrJdqtP_RHzzxFfIv_kdmvM2m8v-Va52eO61WRFrYo42w8O1FQlYr-m0aG_N55gNWes6v_ldlnixdmSDeBqGFp-j7_PanqDSEzZzVZwxI_RWVAzG2r0VGv00XWH0000" alt=""><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/chart/plantuml.html" target="_blank" rel="noopener noreferrer">View Detail</a></li></ul><h5 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块"><span>代码块</span></a></h5>',20)),(0,n.bF)(l,{id:"358",data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],active:2},{title0:(0,n.k6)((({value:s,isActive:e})=>a[8]||(a[8]=[(0,n.eW)("pnpm")]))),title1:(0,n.k6)((({value:s,isActive:e})=>a[9]||(a[9]=[(0,n.eW)("yarn")]))),title2:(0,n.k6)((({value:s,isActive:e})=>a[10]||(a[10]=[(0,n.eW)("npm")]))),tab0:(0,n.k6)((({value:s,isActive:e})=>a[11]||(a[11]=[(0,n.Lk)("div",{class:"language-bash line-numbers-mode","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[(0,n.Lk)("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[(0,n.Lk)("code",null,[(0,n.Lk)("span",{class:"line"},[(0,n.Lk)("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"pnpm"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),(0,n.Lk)("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," vuepress-theme-hope")])])]),(0,n.Lk)("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[(0,n.Lk)("div",{class:"line-number"})])],-1)]))),tab1:(0,n.k6)((({value:s,isActive:e})=>a[12]||(a[12]=[(0,n.Lk)("div",{class:"language-bash line-numbers-mode","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[(0,n.Lk)("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[(0,n.Lk)("code",null,[(0,n.Lk)("span",{class:"line"},[(0,n.Lk)("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"yarn"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),(0,n.Lk)("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," vuepress-theme-hope")])])]),(0,n.Lk)("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[(0,n.Lk)("div",{class:"line-number"})])],-1)]))),tab2:(0,n.k6)((({value:s,isActive:e})=>a[13]||(a[13]=[(0,n.Lk)("div",{class:"language-bash line-numbers-mode","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[(0,n.Lk)("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[(0,n.Lk)("code",null,[(0,n.Lk)("span",{class:"line"},[(0,n.Lk)("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"npm"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," i"),(0,n.Lk)("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),(0,n.Lk)("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," vuepress-theme-hope")])])]),(0,n.Lk)("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[(0,n.Lk)("div",{class:"line-number"})])],-1)]))),_:1}),a[19]||(a[19]=(0,n.Fv)('<ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/code-tabs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/code-demo.html" width="100%" height="450"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/demo.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="交互演示" tabindex="-1"><a class="header-anchor" href="#交互演示"><span>交互演示</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/playground.html" width="100%" height="480"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/playground.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="kotlin-交互演示" tabindex="-1"><a class="header-anchor" href="#kotlin-交互演示"><span>Kotlin 交互演示</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/kotlin-playground.html" width="100%" height="220"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/kotlin-playground.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="sandpack-交互演示" tabindex="-1"><a class="header-anchor" href="#sandpack-交互演示"><span>Sandpack 交互演示</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/sandpack.html" width="100%" height="380"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/sandpack.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="vue-交互演示" tabindex="-1"><a class="header-anchor" href="#vue-交互演示"><span>Vue 交互演示</span></a></h5><iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/vue-playground.html" width="100%" height="380"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/code/vue-playground.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul><h5 id="幻灯片" tabindex="-1"><a class="header-anchor" href="#幻灯片"><span>幻灯片</span></a></h5><iframe src="https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html" width="100%" height="420"></iframe><ul><li><a href="https://theme-hope.vuejs.press/zh/guide/markdown/content/revealjs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li></ul>',19))])}]]),l=JSON.parse('{"path":"/Other/markdown.html","title":"Markdown","lang":"zh-CN","frontmatter":{"title":"Markdown","icon":"pen","order":2,"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfrBDRCWnjgxJSnMfGPndLwXUv1FBOv_H-A&s","editLink":false,"category":["使用指南","知识点"],"tag":["布局","语言"],"description":"基础知识 vuepress扩展 VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。 你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/docs/Other/markdown.html"}],["meta",{"property":"og:site_name","content":"Badbottle\'s blog"}],["meta",{"property":"og:title","content":"Markdown"}],["meta",{"property":"og:description","content":"基础知识 vuepress扩展 VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。 你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfrBDRCWnjgxJSnMfGPndLwXUv1FBOv_H-A&s"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-10T07:40:01.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfrBDRCWnjgxJSnMfGPndLwXUv1FBOv_H-A&s"}],["meta",{"name":"twitter:image:alt","content":"Markdown"}],["meta",{"property":"article:tag","content":"布局"}],["meta",{"property":"article:tag","content":"语言"}],["meta",{"property":"article:modified_time","content":"2025-03-10T07:40:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Markdown\\",\\"image\\":[\\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfrBDRCWnjgxJSnMfGPndLwXUv1FBOv_H-A&s\\"],\\"dateModified\\":\\"2025-03-10T07:40:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"git":{"createdTime":1730722389000,"updatedTime":1741592401000,"contributors":[{"name":"badb0ttle","username":"badb0ttle","email":"2546744220@qq.com","commits":6,"url":"https://github.com/badb0ttle"}]},"readingTime":{"minutes":3.67,"words":1100},"filePathRelative":"Other/markdown.md","localizedDate":"2024年11月4日","excerpt":"<h2>基础知识</h2>\\n<div class=\\"language-markdown line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"markdown\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\"># 一级标题</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">## 二级标题</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">### 三级标题</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">#### 四级标题</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">##### 五级标题</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">###### 六级标题</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><div class=\\"language-markdown line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"markdown\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#986801;--shiki-dark:#ABB2BF\\">[</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">网站名称</span><span style=\\"--shiki-light:#986801;--shiki-dark:#ABB2BF\\">]</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#E06C75\\">(</span><span style=\\"--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline\\">网站链接</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#E06C75\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">&lt;!-- 像这样 --&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#986801;--shiki-dark:#ABB2BF\\">[</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">lolol</span><span style=\\"--shiki-light:#986801;--shiki-dark:#ABB2BF\\">]</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#E06C75\\">(</span><span style=\\"--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline\\">www.baidu.com</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#E06C75\\">)</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><h2>vuepress扩展</h2>\\n<p>VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。</p>\\n<p>你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。</p>\\n","autoDesc":true}')},6995:(s,a)=>{a.A=(s,a)=>{const e=s.__vccOpts||s;for(const[s,n]of a)e[s]=n;return e}}}]);