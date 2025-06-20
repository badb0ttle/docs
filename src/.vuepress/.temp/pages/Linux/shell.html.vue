<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2>
<p>给学习shell操作的大伙先推荐一下快捷键集合:<a href="https://gist.github.com/zhulianhua/befb8f61db8c72b4763d#file-linux-md" target="_blank" rel="noopener noreferrer">快捷键</a>
一边学一边要求自己严格使用快捷键的操作，久而久之自己就习惯使用快捷键的操作了 😃</p>
<h1 id="linux-常用命令" tabindex="-1"><a class="header-anchor" href="#linux-常用命令"><span>Linux 常用命令</span></a></h1>
<h2 id="_1-基本命令" tabindex="-1"><a class="header-anchor" href="#_1-基本命令"><span>1. 基本命令</span></a></h2>
<h3 id="目录操作" tabindex="-1"><a class="header-anchor" href="#目录操作"><span>目录操作</span></a></h3>
<img src="https://badb0ttle.github.io/picx-images-hosting/1.打印当前目录：pwd.6m419w5pfu.webp">
<ol>
<li>
<p><strong>打印当前目录</strong> ：<code v-pre>pwd</code></p>
</li>
<li>
<p><strong>列出目录内容</strong>：<code v-pre>ls</code></p>
<ul>
<li><code v-pre>ls -l</code>: 以长格式显示文件详细信息（权限、所有者、大小等）。</li>
<li><code v-pre>ls -a</code>: 显示所有文件，包括隐藏文件（以 <code v-pre>.</code> 开头的文件）。</li>
<li><code v-pre>ls -h</code>: 以人类可读的格式显示文件大小（如 KB, MB, GB 等）。</li>
</ul>
</li>
<li>
<p><strong>切换目录</strong>：<code v-pre>cd [路径]</code></p>
<ul>
<li><code v-pre>cd ~</code>: 切换到当前用户的主目录。</li>
<li><code v-pre>cd ..</code>: 切换到上一级目录。</li>
<li><code v-pre>cd -</code>: 切换到上一次所在的目录。</li>
</ul>
</li>
<li>
<p><strong>创建目录</strong>：<code v-pre>mkdir [文件夹名]</code></p>
<ul>
<li><code v-pre>-p</code>: 递归创建目录（如果父目录不存在，则一并创建）。</li>
<li>示例：<code v-pre>mkdir -p project/src bin doc</code> 创建 <code v-pre>project</code> 目录，并在其中创建 <code v-pre>src</code>, <code v-pre>bin</code>, <code v-pre>doc</code> 子目录。</li>
</ul>
</li>
<li>
<p><strong>删除文件或目录</strong>：<code v-pre>rm [文件夹名]</code></p>
<ul>
<li><code v-pre>rm -r</code>: 递归删除目录及其内容。</li>
<li><code v-pre>rm -f</code>: 强制删除，不提示确认。</li>
<li>示例：<code v-pre>rm -rf ./*</code> 删除当前目录下所有文件包括只读文件而不提示确认，因此使用时要<strong>小心</strong>。
<br>如下图...
<img src="https://badb0ttle.github.io/picx-images-hosting/root@iZgw075bwgq0gfreepkaoyZhome"></li>
</ul>
</li>
<li>
<p><strong>新建文件或更新文件时间戳</strong>：<code v-pre>touch</code></p>
</li>
<li>
<p><strong>移动文件</strong>：<code v-pre>mv [原文件位置] [新文件位置]</code></p>
<ul>
<li><code v-pre>-i</code>: 覆盖前提示确认。</li>
<li><code v-pre>-v</code>: 显示移动过程。</li>
</ul>
</li>
<li>
<p><strong>复制文件</strong>：<code v-pre>cp [原文件位置] [新文件位置]</code></p>
<ul>
<li><code v-pre>-i</code>: 覆盖前提示确认。</li>
<li><code v-pre>-v</code>: 显示复制过程。</li>
</ul>
</li>
<li>
<p><strong>查看文件内容</strong>：<code v-pre>cat [文件名]</code></p>
<ul>
<li><code v-pre>-n</code>: 显示行号。</li>
</ul>
</li>
<li>
<p><strong>查看文件末尾</strong>：<code v-pre>tail -n [行数] [文件名]</code></p>
</li>
<li>
<p><strong>打印字符串到屏幕</strong>：<code v-pre>echo [字符串]</code></p>
</li>
<li>
<p><strong>把字符串追加到文件中</strong>：<code v-pre>echo [字符串] &gt;&gt; [文件名]</code></p>
</li>
<li>
<p><strong>查询历史命令</strong>：键盘上下键，或命令 <code v-pre>history</code>,如果想清除历史命令，可以使用 <code v-pre>history -c</code>。
<img src="https://badb0ttle.github.io/picx-images-hosting/6.新建文件或更新文件时间戳：touch.3k858o61qg.webp"></p>
</li>
</ol>
<h3 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h3>
<ul>
<li><code v-pre>cat 文件名 | tee -a 文件名</code>: 将文件中的所有内容复制一遍。</li>
<li><code v-pre>tail -n 12 文件名 | nl</code>: 标上行号。</li>
</ul>
<hr>
<h2 id="_2-进程管理" tabindex="-1"><a class="header-anchor" href="#_2-进程管理"><span>2. 进程管理</span></a></h2>
<h3 id="实时监控系统资源" tabindex="-1"><a class="header-anchor" href="#实时监控系统资源"><span>实时监控系统资源</span></a></h3>
<ol>
<li><strong><code v-pre>top</code> 命令</strong>：实时监控系统资源。
<ul>
<li><strong>PID</strong>：进程的标识符。</li>
<li><strong>USER</strong>：运行进程的用户名。</li>
<li><strong>PR（优先级）</strong>：进程的优先级。</li>
<li><strong>NI（Nice值）</strong>：进程的优先级调整值。</li>
<li><strong>VIRT（虚拟内存）</strong>：进程使用的虚拟内存大小。</li>
<li><strong>RES（常驻内存）</strong>：进程实际使用的物理内存大小。</li>
<li><strong>SHR（共享内存）</strong>：进程共享的内存大小。</li>
<li><strong>%CPU</strong>：进程占用 CPU 的使用率。</li>
<li><strong>%MEM</strong>：进程占用内存的使用率。</li>
<li><strong>TIME+</strong>：进程的累计 CPU 时间。</li>
<li>按下 <code v-pre>K</code>，输入 PID 可以杀掉对应的进程。</li>
</ul>
</li>
</ol>
  <img src="https://badb0ttle.github.io/picx-images-hosting/Pasted-Graphic-1.9dd3hyutsi.webp">
<ol>
<li><strong>显示进程信息</strong>：<code v-pre>ps</code>
<ul>
<li><code v-pre>ps -a</code>: 显示所有用户进程。</li>
<li><code v-pre>ps -u</code>: 显示进程所属用户。</li>
<li><code v-pre>ps -u &lt;username&gt;</code> 来显示指定用户的进程</li>
<li><code v-pre>ps -x</code>: 显示没有控制终端的进程（如守护进程）。</li>
</ul>
</li>
</ol>
<img src="https://badb0ttle.github.io/picx-images-hosting/2.显示进程信息：ps.6bh7gqtk51.webp">
<hr>
<h2 id="_3-网络管理" tabindex="-1"><a class="header-anchor" href="#_3-网络管理"><span>3. 网络管理</span></a></h2>
<h3 id="_1-显示网络连接信息" tabindex="-1"><a class="header-anchor" href="#_1-显示网络连接信息"><span>(1)显示网络连接信息</span></a></h3>
<ol>
<li>
<p><strong><code v-pre>netstat</code> 命令</strong>：显示网络连接信息。</p>
<ul>
<li><code v-pre>netstat -n</code>: 以数字形式显示地址和端口而不进行 DNS 解析。</li>
<li><code v-pre>netstat -l</code>: 显示监听端口。</li>
<li><code v-pre>netstat -t</code>: 显示 TCP 连接。</li>
<li><code v-pre>netstat -u</code>: 显示 UDP 连接。</li>
<li><code v-pre>netstat -p</code>: 显示 PID 和进程名。</li>
<li>示例：<code v-pre>netstat -nltp</code>。</li>
</ul>
</li>
<li>
<p><strong>安装网络工具</strong>：</p>
<ul>
<li>使用 <code v-pre>apt</code> 包管理系统安装网络工具：<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net-tools</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>查找进程&amp;检查端口&amp;杀死进程</strong>：</p>
<ul>
<li><code v-pre>ps -aux | grep name</code>: 查找一个名为 <code v-pre>name</code> 的进程。</li>
<li><code v-pre>sudo lsof -i :1234</code>:监听一个端口号为<code v-pre>1234</code> 的端口。</li>
<li><code v-pre>sudo kill -9 PID</code>:杀死一个进程号为<code v-pre>PID</code>的进程。
<img src="https://badb0ttle.github.io/picx-images-hosting/3.显示网络连接信息：netstat.67xlj10ju5.webp"></li>
</ul>
</li>
</ol>
<h3 id="_2-显示网络ip信息" tabindex="-1"><a class="header-anchor" href="#_2-显示网络ip信息"><span>(2)显示网络ip信息</span></a></h3>
<h4 id="一、-ifconfig" tabindex="-1"><a class="header-anchor" href="#一、-ifconfig"><span>一、   ifconfig</span></a></h4>
<p>查看所有网卡信息</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ifconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> x</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>x:某一个网卡
x类型中:en0 通常是 Wi-Fi，en1 是有线网口</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ifconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> x</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> up/down</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>启用禁用网卡</p>
<h4 id="二、-ipconfig" tabindex="-1"><a class="header-anchor" href="#二、-ipconfig"><span>二、   ipconfig</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ipconfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">comman</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">d> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">arg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Command:<br>
getifaddr:查看当前 IP 地址<br>
getoption:查看网关<br></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ipconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> getoption</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">interface</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">option</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e> | &#x3C;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">option</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="三、-ip" tabindex="-1"><a class="header-anchor" href="#三、-ip"><span>三、   ip</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> addr</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查看所有网络接口</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> route</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查看路由表</p>
<h2 id="_4-电源管理" tabindex="-1"><a class="header-anchor" href="#_4-电源管理"><span>4.电源管理</span></a></h2>
<h1 id="关机" tabindex="-1"><a class="header-anchor" href="#关机"><span>关机</span></a></h1>
<p>立刻关机:<br></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>shutdown -h now</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>5分钟后关机:<br></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>shutdown -h 5</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>立刻关机:<br></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>poweroff</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h1 id="重启" tabindex="-1"><a class="header-anchor" href="#重启"><span>重启</span></a></h1>
<p><code v-pre>shutdown -r now</code>  立刻重启
<code v-pre>shutdown -r 5   </code> 5分钟后重启
<code v-pre>reboot </code>          立刻重启</p>
<h2 id="_5-解压操作" tabindex="-1"><a class="header-anchor" href="#_5-解压操作"><span>5.解压操作</span></a></h2>
<p>命令：<code v-pre>tar [-zxvf] 压缩文件</code>
其中：x代表解压<br>
示例：将/usr/tmp下的ab.tar解压到当前目录下<br></p>
<h1 id="tar-zxvf-ab-tar" tabindex="-1"><a class="header-anchor" href="#tar-zxvf-ab-tar"><span>tar -zxvf ab.tar</span></a></h1>
<p>显示结果：<br></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>root    0 8月  9 21:17 aa.txt</span></span>
<span class="line"><span>root 118 8月  9 21:22 ab.tar</span></span>
<span class="line"><span>root    0 8月  9 21:17 bb.txt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-vi编辑器" tabindex="-1"><a class="header-anchor" href="#_6-vi编辑器"><span>6.vi编辑器</span></a></h2>
<ol start="2">
<li>编辑模式（Insert mode）</li>
</ol>
<ul>
<li>文字输入需在此模式下进行，按「ESC」返回命令行模式。</li>
<li>常用命令：ESC（退出编辑模式）</li>
</ul>
<ol start="3">
<li>底行模式（last line mode）</li>
</ol>
<ul>
<li>功能：保存/退出文件、设置编辑环境（如查找、行号等）。</li>
<li>常用命令：
:q     退出编辑
:q!    强制退出（不保存）
:wq    保存并退出
保存文件：</li>
</ul>
<ol>
<li>ESC进入命令行模式</li>
<li>输入「:」进入底行模式</li>
<li>输入「wq」保存并退出</li>
</ol>
<p>取消编辑：</p>
<ol>
<li>ESC进入命令行模式</li>
<li>输入「:」进入底行模式</li>
<li>输入「q!」撤销修改并退出</li>
</ol>
</div></template>


