---
title: 运维(operation)
icon: gears
cover: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg2023.cnblogs.com%2Fblog%2F2671698%2F202212%2F2671698-20221202153529772-1804517317.png&f=1&nofb=1&ipt=5e03fe602e9d77318dd75a5818c8b35f6429927cacb52a831d229c7ae6339df3
order: 4
editLink: false
category:
  - 知识点
tag:
  - 运维
date: 2026-01-21
timeline: true
sticky: false
star: false
copyright: 版权归badb0ttle所有
author: badb0ttle
---
# 运维(operation)
## 简介
运维是指对计算机系统、网络、应用程序等进行维护和管理的活动。它包括硬件维护、软件维护、网络维护、安全维护等多个方面。运维的目标是确保系统的正常运行、及时修复问题、提供良好的用户体验。但我这边只是讲一下我平时遇到的一些常用的。
## 1.网页 & 服务器 & 域名 & DNS & 反代 & SSL 证书
初学运维时，最容易混乱的就是这些名词之间的关系。这里我用一个完整、真实的访问流程来讲清楚。
我们先假设一个最常见的场景：
我有一个项目：/project，可能是：Spring Boot 项目、前端项目（Vue / React）或者一个 Docker 容器
我买了一台服务器，IP：123.123.123.123
我买了一个域名：hjhLOVEU.com
作为甲方（或者强迫症患者）：
1. 不想用 IP
2. 不想看到端口
3. 想用 https
4. 想直接访问 https://hjhLOVEU.com
如果「什么都不配置」，会发生什么？
假设你现在只是把项目跑在服务器上：
那么你唯一能访问的方式是：
```bash
http://123.123.123.123:8080
```
那么这会有什么问题呢?
1.暴露 IP2.暴露端口3.没有 HTTPS4.看起来一点也不“正规”
### 域名
**域名**是干嘛的？——只是给 IP 起个名字
域名 本质上就是 IP 的别名。
你在 DNS 服务商（阿里云 / 腾讯云 / Cloudflare）里配置：
```bash
hjhLOVEU.com -> 123.123.123.123
```
### DNS 解析
这一步叫做：**域名解析**（DNS 解析）
注意:DNS 只管 IP，不管端口,DNS 不知道你的网站跑在 8080 还是 3000
也就是说,你在浏览器访问 https://hjhLOVEU.com 时,浏览器会向 DNS 询问 hjhLOVEU.com 对应的 IP,然后向那个 IP 发送请求,但是端口号是多少呢？
正常来讲,浏览器会默认向 443 端口发送请求,但是你可以在 URL 中指定端口号,比如：https://hjhLOVEU.com:8080
### 反代
但是端口是怎么藏起来的呢?————**反代**
我们通常会在服务器上安装一个 Web 服务器，比如：
Nginx（最常见）
OpenResty（基于 Nginx，功能更加强大）
Nginx 做的事情是：
1. 监听 80 / 443 端口
2. 收到请求后，根据配置，将请求转发到后端服务器（比如：8080 端口）
3. 后端服务器处理请求后，将响应返回给 Nginx
4. Nginx 将响应返回给浏览器
简单来讲
```txt
用户访问：
https://hjhLOVEU.com
        ↓
Nginx（80 / 443）
        ↓
转发到：
http://127.0.0.1:8080
```
好处：
1. 用户永远看不到端口
2. 后端项目端口可以随便改
3. 可以同时代理多个项目
4. 可以做负载均衡
### HTTPS
HTTPS 是怎么来的？——SSL 证书
浏览器里的这个小锁 🔒，不是项目给的，而是证书给的。
HTTPS =HTTP + SSL/TLS 证书
证书一般来源：
Let’s Encrypt（免费，最常用）
阿里云 / 腾讯云证书
证书绑定的位置是：Nginx（或其他 Web 服务器）
所以常见结构是：
```txt
浏览器
  ↓ HTTPS
Nginx（证书在这里）
  ↓ HTTP
后端项目 / Docker / GitHub Pages
```
所以总的流程是
```txt
浏览器
  ↓
https://hjhLOVEU.com
  ↓
DNS：解析到 IP
  ↓
123.123.123.123
  ↓
Nginx（80 / 443 + SSL）
  ↓
反向代理
  ↓
项目（Spring Boot / Docker / 前端）
```
但是有可能甲方还会提出一些要求，比如:“官网一个域名，博客一个域名，后台再来一个。”
这时候，你不需要再买新域名，而是使用：**子域名**
比如：
```bash
www.hjhLOVEU.com -> 123.123.123.123
blog.hjhLOVEU.com -> 123.123.123.123
admin.hjhLOVEU.com -> 123.123.123.123
```
首先，你需要在 DNS 服务商里添加子域名解析记录。
这一步的含义是：将子域名指向服务器 IP。本质上和主域名解析一模一样,只是多了一个前缀。
第二步，在服务器中区分“访问的是哪个站点”
DNS 只能把域名指到服务器，真正决定访问哪个网站的，是 Web 服务器（Nginx）。
Nginx 会根据：server_name 来判断访问的是哪个站点。
第三步：给不同子域名配置不同站点 / 项目
诶，每个子域名需要单独配https吗？
当然，你可以通配符证书，
```bash
*.hjhLOVEU.com -> 123.123.123.123
```
这时候，你可以在 Nginx 配置中，根据 server_name 来判断访问的是哪个站点。至于会有什么坏处，
1. 通配符证书对所有子域名都生效，包括你不期望的子域名。
2. 通配符证书对所有子域名都生效，包括你不期望的子域名。
反正见仁见智吧
## 2. 负载均衡
之后的所有内容都默认服务器基础配置没有问题
负载均衡实际上我还没做
## 3. github页面部署
1. 项目准备：根目录下放一个CNAME文件，内容是：blog.hjhLOVEU.com
2. 域名解析：将 blog.hjhLOVEU.com 指向服务器 IP
3. 项目配置：在项目的 settings 中，开启 github pages，选择 你的 分支,在Custom domain中填写：blog.hjhLOVEU.com
4. 勾选 Enforce HTTPS
5. 等待 DNS 解析生效
## 4. docker页面部署
使用反代层统一 HTTPS 与路径，再转发到容器端口：
```yaml
version: "3.8"
services:
  myapp:
    image: your/app:latest
    container_name: myapp
    ports:
      - "127.0.0.1:8080:8080"
    restart: unless-stopped
```
nginx 配置：
```nginx
upstream app_docker {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name app.hjhLOVEU.com;
    location / { return 301 https://$host$request_uri; }
}

server {
    listen 443 ssl;
    http2 on;
    server_name app.hjhLOVEU.com;
    ssl_certificate /usr/local/openresty/nginx/conf/ssl/app/fullchain.pem;
    ssl_certificate_key /usr/local/openresty/nginx/conf/ssl/app/privkey.pem;
    location / { proxy_pass http://app_docker; }
}
```
- 宿主仅暴露到 127.0.0.1，外部统一走 443
- 多个容器服务时，为每个子域名配置一个 server 块与对应 upstream
### 我遇到的问题
#### 1.1 常见坑与排查
- 权威 DNS不匹配：DNS-01 必须用域名实际的权威 DNS 的 API，否则 TXT 不生效。
- 证书路径不可读：容器内引用容器可见路径，如 /usr/local/openresty/nginx/conf/ssl/…；不要用主机路径。
- 端口占用：80/443 被其他服务占用时，签发或监听失败；用 ss -tlnp 检查。
- 默认站点抢占：default_server 抢占 443 导致新站点无效；确保 server_name 精确匹配，必要时调整站点优先级。
- 代理变量污染：命令行测试不要用反引号包 URL，必要时禁用代理环境变量进行 curl。
- WAF/安全组：DNS-01 不需要 80，但 HTTP-01 需要；上线后如出现访问中断，检查 WAF策略与安全组规则。
DNS 在阿里云把 dash.hjhLOVEU.com 或 dash.hjhai.xyz 的 A 记录指向你的服务器 IP；证书放在 Web 服务器可见的挂载目录并用容器内路径引用。
#### 1.2 HTTPS获取方式对比
- HTTP-01：在 80 端口提供验证文件，简单，但易受 CDN/WAF/端口占用影响。
- DNS-01：在权威 DNS 写 TXT 记录，适合通配符与自动化，只要用正确的权威 DNS API。
- 证书文件使用 fullchain.pem 与 privkey.pem，绑定在 Web 服务器（反代层），不是绑定在后端应用。
#### 1.3 子域与通配符证书
- 单域名证书：只覆盖指定域名，如 dash.hjhLOVEU.com。
- 通配符证书：覆盖所有子域，如 *.hjhLOVEU.com，但不覆盖顶级域 hjhLOVEU.com；若需要同时覆盖顶级域，申请时同时包含两条域名。
- 子域的路由由 Web 服务器通过 server_name 决定，DNS 只负责把子域名指到 IP。
## 5.OpenResty 
### OpenResty 是什么？
- 基于 Nginx 的高性能 Web 平台，把 Nginx + LuaJIT + 常用第三方模块集成到一起
- 通过在 Nginx 的不同阶段执行 Lua 脚本，实现鉴权、限流、灰度、路由、WAF、A/B 测试、埋点等“可编程网关”能力
- 面向高并发场景，保持 Nginx 的事件驱动与极低资源占用，同时具备业务逻辑可扩展性
### 为什么用 OpenResty？

- 高性能：继承 Nginx 的 I/O 模型，低内存消耗，适合高并发
- 可编程：Lua 配合众多模块（lua-resty-*），灵活实现网关层逻辑
- 生态成熟：内置/社区模块丰富（WAF、缓存、限流、上游健康检查等）
- 部署简单：与 Nginx 基本一致，配置文件兼容度高
核心能力

- 反向代理与负载均衡：upstream + 多种调度策略
- HTTPS 与证书终止：在入口层统一证书与加密，后端走 HTTP
- 访问控制与鉴权：基于 Lua 做 JWT 校验、签名校验、白黑名单等
- 限流与熔断：共享字典（lua_shared_dict）+ 算法（令牌桶/漏桶）
- 动态路由与改写：根据 Host/路径/头信息动态转发与改写
- 缓存与加速：内容缓存、字典缓存、主动刷新
- WAF：配合规则与数据库，实现通用注入与爬虫等防护
### 典型架构

- 浏览器 → OpenResty（证书、反代、策略）→ 后端服务（容器/进程）
- 多站点：按 server_name 区分子域，复用同一入口与证书策略
- 多实例：upstream 池（健康检查/权重/粘性）提升可用性与吞吐