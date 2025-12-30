---
title: sing-box
index: false
editLink: false
icon: 'Linux'
category:
  - 极难
---
在服务器上用 sing-box + Clash 订阅，搭了一个本机 HTTP/SOCKS 代理，并做成 systemd 服务自动启动。
效果:
	sing-box 以 systemd 服务形式常驻运行；
	它用你的 vmess 节点 出口翻墙；
	服务器上任何程序（curl / git / apt / pip…）
只要设代理到 http://127.0.0.1:7890 就能翻。
⸻

二、我们是怎么一步步找问题、解决问题的？
按时间线回顾一下关键节点：
1. 放二进制 + 找到正确路径
		你把 sing-box 可执行文件放到：
/usr/local/bin/sing-box
用 ls /usr/local/bin 确认里面确实有 sing-box，并确保：
chmod +x /usr/local/bin/sing-box
👉 这一步解决的是：“系统到底去哪儿找 sing-box”。
⸻
2. systemd 服务找不到 / 不工作
一开始：
Failed to restart sing-box.service: Unit sing-box.service not found.
说明：根本还没有服务文件。
我们做的事是：
	1.	写一个 /etc/systemd/system/sing-box.service：
```bash
[Unit]
Description=Sing-Box Service
After=network.target

[Service]
ExecStart=/usr/local/bin/sing-box run -c /usr/local/etc/sing-box/config.json
Restart=on-failure
# （中途我们还加过一些环境变量，用来兼容老配置）

[Install]
WantedBy=multi-user.target
```


3.	让 systemd 重新加载配置并启用服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable sing-box
sudo systemctl start sing-box
```


这一步解决的是：“systemd 里没有 sing-box 这个服务”。

⸻

4. 配置文件路径 / 权限 / 不存在

日志里一度出现：

FATAL read config at /usr/local/etc/sing-box/config.json: no such file or directory

说明：
		服务文件里写的是：-c /usr/local/etc/sing-box/config.json
		但是这个文件 不存在，或者目录都没建。

我们做的是：

sudo mkdir -p /usr/local/etc/sing-box
sudo vim /usr/local/etc/sing-box/config.json

👉 这一步解决的是：“服务能启动 sing-box，但找不到配置文件”。

⸻

5. 老版本配置特性导致 sing-box 启动崩溃

你中途用的是一些“带规则 / 分流 / DNS / rule-set”的配置，日志出现过这些 FATAL：
		legacy special outbounds is deprecated...
		geoip database is deprecated...
		rule-set not found: Telegram

这些错误说明：
		你当时的配置里，用到了 新版本已经废弃 / 删除 的写法；
		或者引用了不存在的 rule-set 名称（例如 Telegram）。

我们当时的处理思路是：
	1.	先通过：

journalctl -u sing-box -n 20 --no-pager

精确看 第一行 FATAL 是啥。

	2.	对症处理：
		要么暂时加环境变量去兼容；
		要么 直接用更简单、干净的配置重写（这是我们最后的选择）。

👉 这一步体现的是：“先看 FATAL 报错，再去改配置，而不是瞎猜”。

⸻

6. trojan 节点连接失败

后来日志里是这样：

dial tcp 199.180.115.155:9443: connect: connection refused

说明：
		sing-box 已经成功监听了 7890/7891；
		但它连接你 trojan 上游服务器 199.180.115.155:9443 时，对方直接 拒绝连接：
		要么那个服务器上 trojan 没跑、
		要么端口没开 / 被防火墙挡住、
		要么服务商那边有问题。

我们当时判断：这是你的上游节点的问题，不是 sing-box 配置的问题。

然后我们换了思路：
👉 不再纠结 trojan，直接用你已经能用的 Clash 订阅里面的 vmess 节点。

⸻

7. 订阅 + sub converter 折腾无果

你尝试用：

https://sub.ops.ci/sub?target=singbox&url=...

结果页面提示：

The following link doesn't contain any valid node info

说明：
		这条“长长的订阅链接套订阅链接”的地址，
对于 sub converter 来说已经解析不出来有效节点了。

于是我们改策略：
	1.	从你本地 Clash 客户端里导出/复制了 完整的 Clash YAML 配置；
	2.	从中提取了重点信息：
		proxies: 里的 vmess 节点（服务器 / 端口 / uuid / tls 等）；
		不再把一整套庞大的 rules 原样搬过来。

👉 这一步就是：“不用强求订阅在线转换，直接拿已经在客户端验证过的配置做手工转换”。

⸻

8. 从 Clash YAML 手工转成 sing-box JSON

你给了这段开头（后面内容很长）：
```bash
port: 7890
socks-port: 7891
proxies:
  - {name: 🇭🇰 A香港, server: k01.xmqjsd.com, port: 15001, type: vmess, uuid: 20deb9ed-db50-3a45-bd54-fb86043821aa, ...}
  - {name: 🇭🇰 A香港2, server: k01.xmqjsd.com, port: 15501, type: vmess, uuid: 20deb9ed-db50-3a45-bd54-fb86043821aa, ...}
  ...
```
我们做的关键转换是：
		Clash 的 inbound → sing-box 的 inbounds

"inbounds": [
  { "type": "http",  "listen": "127.0.0.1", "listen_port": 7890 },
  { "type": "socks", "listen": "127.0.0.1", "listen_port": 7891 }
]


		Clash 的 vmess 节点 → sing-box 的 outbounds
示意（只写一个，实际我们写了多个）：

{
  "type": "vmess",
  "tag": "🇭🇰 A香港",
  "server": "k01.xmqjsd.com",
  "server_port": 15001,
  "uuid": "20deb9ed-db50-3a45-bd54-fb86043821aa",
  "security": "auto"
}


		路由部分简化处理：
没有照搬你那一大堆 rules，先让所有流量都走一个默认节点，
像这样：

"route": {
  "auto_detect_interface": true,
  "default_outbound": "🇭🇰 A香港"
}



最终你重启服务：

sudo systemctl restart sing-box
sudo systemctl status sing-box

看到：

Active: active (running)
INFO inbound/http[http-in]: tcp server started at 127.0.0.1:7890
INFO inbound/socks[socks-in]: tcp server started at 127.0.0.1:7891
INFO sing-box started

👉 这一步是“终于有一个干净、现代规范的 sing-box 配置成功跑起来了”。

⸻

9. 使用 curl 实测代理完全可用

最后用最硬的验证方式：

curl -x http://127.0.0.1:7890 https://www.google.com -v

看到：
		先连上 127.0.0.1:7890；
		收到：HTTP/1.1 200 Connection established；
		完成 TLS 握手（SSL connection using TLSv1.3 …）；
		返回 HTTP/2 200，完整的 Google 首页 HTML。

这说明：
		sing-box 服务 ✅
		vmess 节点 ✅
		代理认证 / TLS / 外网访问 ✅

至此，目标完全达成。

⸻

三、以后重来一遍的「标准流程」清单

你以后换服务器，只要按下面节奏来就行，可以收藏：

1️⃣ 安装 sing-box 二进制

# 假设你已经下载好了 sing-box 可执行文件
sudo mv sing-box /usr/local/bin/sing-box
sudo chmod +x /usr/local/bin/sing-box

2️⃣ 创建配置目录 + 写 config.json

sudo mkdir -p /usr/local/etc/sing-box
sudo vim /usr/local/etc/sing-box/config.json

最核心要保证 3 块：
	1.	inbounds（监听 7890/7891）
	2.	outbounds（至少一个你的 vmess 节点）
	3.	route.default_outbound 指向你要用的节点 tag

⸻

3️⃣ 写 systemd 服务文件

sudo vim /etc/systemd/system/sing-box.service

内容：

[Unit]
Description=Sing-Box Service
After=network.target

[Service]
ExecStart=/usr/local/bin/sing-box run -c /usr/local/etc/sing-box/config.json
Restart=on-failure

[Install]
WantedBy=multi-user.target

然后：

sudo systemctl daemon-reload
sudo systemctl enable sing-box
sudo systemctl start sing-box
sudo systemctl status sing-box

如有异常：

journalctl -u sing-box -n 50 --no-pager

看 FATAL 报错。

⸻

4️⃣ 在服务器上使用代理

临时用环境变量：

export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"

测试：

curl -x http://127.0.0.1:7890 https://www.google.com -v

如果 OK，说明全局没问题，git / pip / apt 都可以按需配置走这条代理。

⸻


"https://docker.mirror.docker.1ms.run/",
    "https://dockerproxy.com",
    "https://docker.nju.edu.cn",
    "https://qmkvitqx.mirror.aliyuncs.com"
