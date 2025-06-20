<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1>
<h2 id="docker基础" tabindex="-1"><a class="header-anchor" href="#docker基础"><span>docker基础</span></a></h2>
<p><code v-pre>Docker</code> 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。<br></p>
<font size=5>我们假设有一台a设备和b设备，一款软件有可能a能运行b却不行，而docker就是实现通过将某一个项目的环境和软件打包的方式以便其他用户使用的容器。</font><h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1.安装</span></a></h2>
<p>(1)官网:<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">official</a><br>
(2)加速镜像:在Docker Engine里添加</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>"registry-mirrors": [</span></span>
<span class="line"><span>   "https://dockerproxy.com",</span></span>
<span class="line"><span>   "https://docker.mirror.ustc.edu.cn",</span></span>
<span class="line"><span>   "https://docker.nju.edu.cn"</span></span>
<span class="line"><span> ]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-基础操作" tabindex="-1"><a class="header-anchor" href="#_2-基础操作"><span>2.基础操作</span></a></h2>
<ol>
<li><code v-pre>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></li>
</ol>
<p><code v-pre>IMAGE</code> 是指 Docker 镜像的名称或 ID</p>
<p><code v-pre>COMMAND</code> 是容器启动后要执行的命令</p>
<p><code v-pre>ARG...</code> 是传递给 COMMAND 的参数</p>
<p>部分 OPTIONS 说明：</p>
<p><code v-pre>-a stdin</code>
指定标准输入输出内容类型，可选 <code v-pre>STDIN/STDOUT/STDERR</code> 三项。</p>
<p><code v-pre>-d</code>
后台运行容器，并返回容器 ID。</p>
<p><code v-pre>-P</code>
随机端口映射，容器内部端口随机映射到主机的端口。</p>
<p><code v-pre>-p</code>
指定端口映射，格式为：主机(宿主)端口:容器端口。</p>
<p><code v-pre>--name=&quot;nginx-lb&quot;</code>
为容器指定一个名称。</p>
<p><code v-pre>--volume 或 -v</code>
绑定一个卷（挂载存储）。</p>
<ol start="2">
<li><code v-pre>docker ps</code>:查看正在运行的容器</li>
<li><code v-pre>docker stop 容器id|容器名字</code>:停止正在运行的容器</li>
<li><code v-pre>docker ps -a</code>:查看本地的所有容器</li>
<li><code v-pre>docker start 容器id|容器名字</code>:启动停止的容器</li>
<li><code v-pre>docker rm 容器id|容器名字</code>：删除已经停止的容器</li>
<li><code v-pre>docker pull 仓库名/镜像名</code>:从仓库中获取镜像,&quot;再通过<code v-pre>docker run</code>来运行</li>
<li><code v-pre>docker image ls</code>查看本地所有镜像</li>
<li><code v-pre>docker rmi 镜像名字|id</code>删除某一个镜像</li>
</ol>
<h1 id="_2-docker-compose基础" tabindex="-1"><a class="header-anchor" href="#_2-docker-compose基础"><span>2.docker-compose基础</span></a></h1>
<p><code v-pre>Docker Compose</code> 是 Docker 官方提供的多容器应用编排工具，可以通过一个<code v-pre>docker-compose.yml</code> 文件，定义和管理多个容器服务，使用一条命令即可启动、停止和理整个应用环境。<br>
我们假设有三台设备：A、B、C。现在要跑一个网站项目，这个网站需要三个部分,
如果每个人都自己去手动启动、配端口、网络等，容易出错、顺序混乱、版本不一致，A设备可能成功，B和C设备却各种报错。<br>
而 Docker Compose 就像是一个全自动指挥官，提前把所有容器的镜像、启动命令、端口映射、网络关系，统统写在一个文件里。到时候，只要一条命令<br></p>
<h2 id="_1-安装-1" tabindex="-1"><a class="header-anchor" href="#_1-安装-1"><span>1.安装</span></a></h2>
<p>Mac 和 Windows 安装 Docker Desktop 时已集成 Compose，Linux 下可执行：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-compose</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_2-基础操作-1" tabindex="-1"><a class="header-anchor" href="#_2-基础操作-1"><span>2.基础操作</span></a></h2>
<p>(1)指令操作<br>
<code v-pre>docker compose up</code><br>
启动服务（前台）<br>
<code v-pre>docker compose up -d</code><br>
启动服务（后台）<br>
<code v-pre>docker compose down</code><br>
停止并移除容器、网络、挂载<br>
<code v-pre>docker compose ps</code><br>
查看当前 Compose 服务状态<br>
<code v-pre>docker compose logs</code><br>
查看服务日志<br>
<code v-pre>docker compose exec 服务名 bash</code><br>
进入指定服务容器的终端<br>
(2)配置文件
Compose 使用 docker-compose.yml 文件定义服务，常见结构如下：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  web</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">nginx</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"8080:80"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  db</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">mysql</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    environment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      MYSQL_ROOT_PASSWORD</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">123456</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


