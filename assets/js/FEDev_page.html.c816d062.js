"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[426],{2060:(i,s,e)=>{e.r(s),e.d(s,{comp:()=>n,data:()=>p});var a=e(641),t=e(33),l=e(953);const n={__name:"page.html",setup(i){const s=(0,a.pM)({setup(){const i=(0,l.KR)("Hello world!"),s=s=>{i.value=s.target.value};return()=>[(0,a.h)("p",[(0,a.h)("span","输入: "),(0,a.h)("input",{value:i.value,onInput:s})]),(0,a.h)("p",[(0,a.h)("span","输出: "),i.value])]}});return(i,e)=>{const n=(0,a.g2)("Badge"),p=(0,a.g2)("VPCard");return(0,a.uX)(),(0,a.CE)("div",null,[e[2]||(e[2]=(0,a.Lk)("p",null,[(0,a.Lk)("code",null,"hehehe")],-1)),(0,a.Q3)("`hehehe` 注释之前的内容被视为文章摘要。"),(0,a.Q3)(" more "),e[3]||(e[3]=(0,a.Fv)('<h2 id="页面标题" tabindex="-1"><a class="header-anchor" href="#页面标题"><span>页面标题</span></a></h2><p>The first H1 title in Markdown will be regarded as page title.</p><p>Markdown 中的第一个 H1 标题会被视为页面标题。</p><p>你可以在 Markdown 的 Frontmatter 中设置页面标题。</p><div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" data-title="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">title: 页面标题</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">---</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面信息" tabindex="-1"><a class="header-anchor" href="#页面信息"><span>页面信息</span></a></h2><p>你可以在 Markdown 的 Frontmatter 中设置页面信息。</p><ul><li>作者设置为 Ms.Hope。</li><li>写作日期为 2020 年 1 月 1 日</li><li>分类为 “使用指南”</li><li>标签为 “页面配置” 和 “使用指南” 你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。</li></ul><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用导航栏 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">navbar: false </span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用侧边栏 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">sidebar: false </span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用路径导航 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">breadcrumb: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用页面信息 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">pageInfo: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用贡献者 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">contributors: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用编辑此页链接 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">editLink: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用更新时间 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">lastUpdated: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用上一篇链接 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">prev: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用下一篇链接 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">next: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用评论 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">comment: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用页脚 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">footer: false</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 禁用返回顶部按钮 --&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">backtotop: false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面内容" tabindex="-1"><a class="header-anchor" href="#页面内容"><span>页面内容</span></a></h2><p>你可以自由在这里书写你的 Markdown。</p><div class="hint-container tip"><p class="hint-container-title">图片引入</p><ul><li>你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。</li><li>对于 <code>.vuepress/public</code> 文件夹的图片，请使用绝对链接 <code>/</code> 进行引用。</li></ul></div><h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件"><span>组件</span></a></h2><p>每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：</p><p>2</p>',15)),(0,a.Q3)(" markdownlint-disable MD033 "),(0,a.Lk)("ul",null,[((0,a.uX)(),(0,a.CE)(a.FK,null,(0,a.pI)(3,(i=>(0,a.Lk)("li",null,(0,t.v_)(i),1))),64))]),(0,a.Q3)(" markdownlint-enable MD033 "),e[4]||(e[4]=(0,a.Lk)("p",null,"你也可以创建并引入你自己的组件。",-1)),(0,a.bF)((0,l.R1)(s)),e[5]||(e[5]=(0,a.Lk)("hr",null,null,-1)),e[6]||(e[6]=(0,a.Lk)("p",null,"主题包含一些有用的组件。这里是一些例子:",-1)),(0,a.Lk)("ul",null,[(0,a.Lk)("li",null,[(0,a.Lk)("p",null,[e[0]||(e[0]=(0,a.eW)("文字结尾应该有深蓝色的 徽章文字 徽章。 ")),(0,a.bF)(n,{text:"徽章文字",color:"#242378"})])]),(0,a.Lk)("li",null,[e[1]||(e[1]=(0,a.Lk)("p",null,"一个卡片:",-1)),(0,a.bF)(p,(0,t._B)((0,a.Ng)({title:"Mr.Hope",desc:"Where there is light, there is hope",logo:"https://mister-hope.com/logo.svg",link:"https://mister-hope.com",background:"rgba(253, 230, 138, 0.15)"})),null,16)])])])}}},p=JSON.parse('{"path":"/FEDev/page.html","title":"Page","lang":"zh-CN","frontmatter":{"title":"Page","cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s","icon":"file","order":3,"author":"Ms.Hope","date":"2020-01-01T00:00:00.000Z","category":["使用指南"],"tag":["布局"],"sticky":true,"star":true,"footer":"这是测试显示的页脚","copyright":"无版权","description":"hehehe","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/docs/FEDev/page.html"}],["meta",{"property":"og:site_name","content":"Badbottle\'s blog"}],["meta",{"property":"og:title","content":"Page"}],["meta",{"property":"og:description","content":"hehehe"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-16T09:48:50.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s"}],["meta",{"name":"twitter:image:alt","content":"Page"}],["meta",{"property":"article:author","content":"Ms.Hope"}],["meta",{"property":"article:tag","content":"布局"}],["meta",{"property":"article:published_time","content":"2020-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-16T09:48:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Page\\",\\"image\\":[\\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s\\"],\\"datePublished\\":\\"2020-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-16T09:48:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ms.Hope\\"}]}"]]},"headers":[{"level":2,"title":"页面标题","slug":"页面标题","link":"#页面标题","children":[]},{"level":2,"title":"页面信息","slug":"页面信息","link":"#页面信息","children":[]},{"level":2,"title":"页面内容","slug":"页面内容","link":"#页面内容","children":[]},{"level":2,"title":"组件","slug":"组件","link":"#组件","children":[]}],"git":{"createdTime":1730722389000,"updatedTime":1739699330000,"contributors":[{"name":"badb0ttle","username":"badb0ttle","email":"2546744220@qq.com","commits":2,"url":"https://github.com/badb0ttle"}]},"readingTime":{"minutes":2.15,"words":645},"filePathRelative":"FEDev/page.md","localizedDate":"2020年1月1日","excerpt":"<p><code>hehehe</code></p>\\n\x3c!--`hehehe` 注释之前的内容被视为文章摘要。--\x3e\\n","autoDesc":true}')}}]);