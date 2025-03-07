---
title: nmcli(Network Manager Command Line Interface)
icon: gears
order: 4
editLink: false
category:
  - 工具


---
## 4. nmcli使用教学
`nmcli` (网络管理器命令行接口)是 Linux 下的命令行网络管理工具，它属于 NetworkManager，用于管理网络连接、Wi-Fi、以太网等。
### 安装教程
```
sudo apt update
sudo apt install network-manager
```
安装完成后，你可以通过以下命令检查 nmcli 是否可用：
```
nmcli --version
```
### 基础指令
1. 列出wifi列表:
```
nmcli device wifi list
```
 它会扫描并列出当前可用的 Wi-Fi 网络。
2. 连接 Wi-Fi
```
nmcli device wifi connect "WiFi名称" password "WiFi密码"
```
或者
```
nmcli device wifi connect "FreeWiFi"
```
3. 断开 Wi-Fi 连接
```
nmcli device disconnect wlan0
```
其中，wlan0 是无线网卡的名称，你可以使用以下命令查看无线网卡名称：
```
nmcli device status
```
4.	显示当前网络连接
```
nmcli connection show
```
5.	启用/禁用 Wi-Fi
•	启用 Wi-Fi：
```
nmcli radio wifi on
```
•	禁用 Wi-Fi：
```
nmcli radio wifi off
```
6.	配置静态 IP
```
nmcli connection modify "连接名称" ipv4.addresses "192.168.1.100/24"
nmcli connection modify "连接名称" ipv4.gateway "192.168.1.1"
nmcli connection modify "连接名称" ipv4.dns "8.8.8.8,8.8.4.4"
nmcli connection modify "连接名称" ipv4.method manual
nmcli connection up "连接名称"
```
如果想恢复自动获取 IP（DHCP），可以执行：
```
nmcli connection modify "连接名称" ipv4.method auto
nmcli connection up "连接名称"
```
7.	删除 Wi-Fi 连接
```
nmcli connection delete "WiFi名称"
```
这个命令会删除已保存的 Wi-Fi 配置。
8.	查看当前网络状态和检查 IP 地址和网关
```
nmcli general status
nmcli device show
```
9.	查看 Wi-Fi 密码（仅适用于已连接的 Wi-Fi）
```
nmcli device wifi show-password
```