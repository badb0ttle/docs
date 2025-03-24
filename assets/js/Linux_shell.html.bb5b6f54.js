"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5453],{3474:(e,i,l)=>{l.r(i),l.d(i,{comp:()=>a,data:()=>o});var s=l(6254);const t={},a=(0,l(6995).A)(t,[["render",function(e,i){return(0,s.uX)(),(0,s.CE)("div",null,i[0]||(i[0]=[(0,s.Fv)('<h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>给学习shell操作的大伙先推荐一下快捷键集合:<a href="https://gist.github.com/zhulianhua/befb8f61db8c72b4763d#file-linux-md" target="_blank" rel="noopener noreferrer">快捷键</a> 一边学一边要求自己严格使用快捷键的操作，久而久之自己就习惯使用快捷键的操作了 😃</p><h1 id="linux-常用命令" tabindex="-1"><a class="header-anchor" href="#linux-常用命令"><span>Linux 常用命令</span></a></h1><h2 id="_1-基本命令" tabindex="-1"><a class="header-anchor" href="#_1-基本命令"><span>1. 基本命令</span></a></h2><h3 id="目录操作" tabindex="-1"><a class="header-anchor" href="#目录操作"><span>目录操作</span></a></h3><img src="https://badb0ttle.github.io/picx-images-hosting/1.打印当前目录：pwd.6m419w5pfu.webp"><ol><li><p><strong>打印当前目录</strong> ：<code>pwd</code></p></li><li><p><strong>列出目录内容</strong>：<code>ls</code></p><ul><li><code>ls -l</code>: 以长格式显示文件详细信息（权限、所有者、大小等）。</li><li><code>ls -a</code>: 显示所有文件，包括隐藏文件（以 <code>.</code> 开头的文件）。</li><li><code>ls -h</code>: 以人类可读的格式显示文件大小（如 KB, MB, GB 等）。</li></ul></li><li><p><strong>切换目录</strong>：<code>cd [路径]</code></p><ul><li><code>cd ~</code>: 切换到当前用户的主目录。</li><li><code>cd ..</code>: 切换到上一级目录。</li><li><code>cd -</code>: 切换到上一次所在的目录。</li></ul></li><li><p><strong>创建目录</strong>：<code>mkdir [文件夹名]</code></p><ul><li><code>-p</code>: 递归创建目录（如果父目录不存在，则一并创建）。</li><li>示例：<code>mkdir -p project/src bin doc</code> 创建 <code>project</code> 目录，并在其中创建 <code>src</code>, <code>bin</code>, <code>doc</code> 子目录。</li></ul></li><li><p><strong>删除文件或目录</strong>：<code>rm [文件夹名]</code></p><ul><li><code>rm -r</code>: 递归删除目录及其内容。</li><li><code>rm -f</code>: 强制删除，不提示确认。</li><li>示例：<code>rm -rf ./*</code> 删除当前目录下所有文件包括只读文件而不提示确认，因此使用时要<strong>小心</strong>。 <br>如下图... <img src="https://badb0ttle.github.io/picx-images-hosting/root@iZgw075bwgq0gfreepkaoyZhome"></li></ul></li><li><p><strong>新建文件或更新文件时间戳</strong>：<code>touch</code></p></li><li><p><strong>移动文件</strong>：<code>mv [原文件位置] [新文件位置]</code></p><ul><li><code>-i</code>: 覆盖前提示确认。</li><li><code>-v</code>: 显示移动过程。</li></ul></li><li><p><strong>复制文件</strong>：<code>cp [原文件位置] [新文件位置]</code></p><ul><li><code>-i</code>: 覆盖前提示确认。</li><li><code>-v</code>: 显示复制过程。</li></ul></li><li><p><strong>查看文件内容</strong>：<code>cat [文件名]</code></p><ul><li><code>-n</code>: 显示行号。</li></ul></li><li><p><strong>查看文件末尾</strong>：<code>tail -n [行数] [文件名]</code></p></li><li><p><strong>打印字符串到屏幕</strong>：<code>echo [字符串]</code></p></li><li><p><strong>把字符串追加到文件中</strong>：<code>echo [字符串] &gt;&gt; [文件名]</code></p></li><li><p><strong>查询历史命令</strong>：键盘上下键，或命令 <code>history</code>,如果想清除历史命令，可以使用 <code>history -c</code>。 <img src="https://badb0ttle.github.io/picx-images-hosting/6.新建文件或更新文件时间戳：touch.3k858o61qg.webp"></p></li></ol><h3 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h3><ul><li><code>cat 文件名 | tee -a 文件名</code>: 将文件中的所有内容复制一遍。</li><li><code>tail -n 12 文件名 | nl</code>: 标上行号。</li></ul><hr><h2 id="_2-进程管理" tabindex="-1"><a class="header-anchor" href="#_2-进程管理"><span>2. 进程管理</span></a></h2><h3 id="实时监控系统资源" tabindex="-1"><a class="header-anchor" href="#实时监控系统资源"><span>实时监控系统资源</span></a></h3><ol><li><strong><code>top</code> 命令</strong>：实时监控系统资源。 <ul><li><strong>PID</strong>：进程的标识符。</li><li><strong>USER</strong>：运行进程的用户名。</li><li><strong>PR（优先级）</strong>：进程的优先级。</li><li><strong>NI（Nice值）</strong>：进程的优先级调整值。</li><li><strong>VIRT（虚拟内存）</strong>：进程使用的虚拟内存大小。</li><li><strong>RES（常驻内存）</strong>：进程实际使用的物理内存大小。</li><li><strong>SHR（共享内存）</strong>：进程共享的内存大小。</li><li><strong>%CPU</strong>：进程占用 CPU 的使用率。</li><li><strong>%MEM</strong>：进程占用内存的使用率。</li><li><strong>TIME+</strong>：进程的累计 CPU 时间。</li><li>按下 <code>K</code>，输入 PID 可以杀掉对应的进程。</li></ul></li></ol><img src="https://badb0ttle.github.io/picx-images-hosting/Pasted-Graphic-1.9dd3hyutsi.webp"><ol><li><strong>显示进程信息</strong>：<code>ps</code><ul><li><code>ps -a</code>: 显示所有用户进程。</li><li><code>ps -u</code>: 显示进程所属用户。</li><li><code>ps -u &lt;username&gt;</code> 来显示指定用户的进程</li><li><code>ps -x</code>: 显示没有控制终端的进程（如守护进程）。</li></ul></li></ol><img src="https://badb0ttle.github.io/picx-images-hosting/2.显示进程信息：ps.6bh7gqtk51.webp"><hr><h2 id="_3-网络管理" tabindex="-1"><a class="header-anchor" href="#_3-网络管理"><span>3. 网络管理</span></a></h2><h3 id="显示网络连接信息" tabindex="-1"><a class="header-anchor" href="#显示网络连接信息"><span>显示网络连接信息</span></a></h3><ol><li><p><strong><code>netstat</code> 命令</strong>：显示网络连接信息。</p><ul><li><code>netstat -n</code>: 以数字形式显示地址和端口而不进行 DNS 解析。</li><li><code>netstat -l</code>: 显示监听端口。</li><li><code>netstat -t</code>: 显示 TCP 连接。</li><li><code>netstat -u</code>: 显示 UDP 连接。</li><li><code>netstat -p</code>: 显示 PID 和进程名。</li><li>示例：<code>netstat -nltp</code>。</li></ul></li><li><p><strong>安装网络工具</strong>：</p><ul><li>使用 <code>apt</code> 包管理系统安装网络工具：<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> net-tools</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>查找进程&amp;检查端口&amp;杀死进程</strong>：</p><ul><li><code>ps -aux | grep name</code>: 查找一个名为 <code>name</code> 的进程。</li><li><code>sudo lsof -i :1234</code>:监听一个端口号为<code>1234</code> 的端口。</li><li><code>sudo kill -9 PID</code>:杀死一个进程号为<code>PID</code>的进程。 <img src="https://badb0ttle.github.io/picx-images-hosting/3.显示网络连接信息：netstat.67xlj10ju5.webp"></li></ul></li></ol><h2 id="_4-电源管理" tabindex="-1"><a class="header-anchor" href="#_4-电源管理"><span>4.电源管理</span></a></h2><h1 id="关机" tabindex="-1"><a class="header-anchor" href="#关机"><span>关机</span></a></h1><p>立刻关机:<br></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>shutdown -h now</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>5分钟后关机:<br></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>shutdown -h 5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>立刻关机:<br></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>poweroff</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="重启" tabindex="-1"><a class="header-anchor" href="#重启"><span>重启</span></a></h1><p><code>shutdown -r now</code> 立刻重启 <code>shutdown -r 5 </code> 5分钟后重启 <code>reboot </code> 立刻重启</p><h2 id="_5-解压操作" tabindex="-1"><a class="header-anchor" href="#_5-解压操作"><span>5.解压操作</span></a></h2><p>命令：<code>tar [-zxvf] 压缩文件</code> 其中：x代表解压<br> 示例：将/usr/tmp下的ab.tar解压到当前目录下<br></p><h1 id="tar-zxvf-ab-tar" tabindex="-1"><a class="header-anchor" href="#tar-zxvf-ab-tar"><span>tar -zxvf ab.tar</span></a></h1><p>显示结果：<br></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>root    0 8月  9 21:17 aa.txt</span></span>\n<span class="line"><span>root 118 8月  9 21:22 ab.tar</span></span>\n<span class="line"><span>root    0 8月  9 21:17 bb.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-vi编辑器" tabindex="-1"><a class="header-anchor" href="#_6-vi编辑器"><span>6.vi编辑器</span></a></h2><ol start="2"><li>编辑模式（Insert mode）</li></ol><ul><li>文字输入需在此模式下进行，按「ESC」返回命令行模式。</li><li>常用命令：ESC（退出编辑模式）</li></ul><ol start="3"><li>底行模式（last line mode）</li></ol><ul><li>功能：保存/退出文件、设置编辑环境（如查找、行号等）。</li><li>常用命令： :q 退出编辑 :q! 强制退出（不保存） :wq 保存并退出 保存文件：</li></ul><ol><li>ESC进入命令行模式</li><li>输入「:」进入底行模式</li><li>输入「wq」保存并退出</li></ol><p>取消编辑：</p><ol><li>ESC进入命令行模式</li><li>输入「:」进入底行模式</li><li>输入「q!」撤销修改并退出</li></ol>',44)]))}]]),o=JSON.parse('{"path":"/Linux/shell.html","title":"Shell","lang":"zh-CN","frontmatter":{"title":"Shell","icon":"gears","order":4,"editLink":false,"category":["使用指南"],"tag":["知识点"],"description":"前言 给学习shell操作的大伙先推荐一下快捷键集合:快捷键 一边学一边要求自己严格使用快捷键的操作，久而久之自己就习惯使用快捷键的操作了 😃 Linux 常用命令 1. 基本命令 目录操作 打印当前目录 ：pwd 列出目录内容：ls ls -l: 以长格式显示文件详细信息（权限、所有者、大小等）。 ls -a: 显示所有文件，包括隐藏文件（以 . ...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/docs/Linux/shell.html"}],["meta",{"property":"og:site_name","content":"Badbottle\'s blog"}],["meta",{"property":"og:title","content":"Shell"}],["meta",{"property":"og:description","content":"前言 给学习shell操作的大伙先推荐一下快捷键集合:快捷键 一边学一边要求自己严格使用快捷键的操作，久而久之自己就习惯使用快捷键的操作了 😃 Linux 常用命令 1. 基本命令 目录操作 打印当前目录 ：pwd 列出目录内容：ls ls -l: 以长格式显示文件详细信息（权限、所有者、大小等）。 ls -a: 显示所有文件，包括隐藏文件（以 . ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-24T09:21:57.000Z"}],["meta",{"property":"article:tag","content":"知识点"}],["meta",{"property":"article:modified_time","content":"2025-03-24T09:21:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shell\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-24T09:21:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"git":{"createdTime":1739699330000,"updatedTime":1742808117000,"contributors":[{"name":"badb0ttle","username":"badb0ttle","email":"2546744220@qq.com","commits":6,"url":"https://github.com/badb0ttle"}]},"readingTime":{"minutes":4.31,"words":1292},"filePathRelative":"Linux/shell.md","localizedDate":"2025年2月16日","excerpt":"\\n<h2>前言</h2>\\n<p>给学习shell操作的大伙先推荐一下快捷键集合:<a href=\\"https://gist.github.com/zhulianhua/befb8f61db8c72b4763d#file-linux-md\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">快捷键</a>\\n一边学一边要求自己严格使用快捷键的操作，久而久之自己就习惯使用快捷键的操作了 😃</p>\\n<h1>Linux 常用命令</h1>\\n<h2>1. 基本命令</h2>\\n<h3>目录操作</h3>\\n<img src=\\"https://badb0ttle.github.io/picx-images-hosting/1.打印当前目录：pwd.6m419w5pfu.webp\\">","autoDesc":true}')},6995:(e,i)=>{i.A=(e,i)=>{const l=e.__vccOpts||e;for(const[e,s]of i)l[e]=s;return l}}}]);