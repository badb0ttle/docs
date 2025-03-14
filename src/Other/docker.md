---
title: Docker
icon: gears
cover: https://yt3.googleusercontent.com/vr50ZXiY9tM1xNgVT2cLt0sGSdL_xuvVYA0fPtzpB9-LNE32KN7bvq75Uwcz70xO-3S6Ts4zIQ=s900-c-k-c0x00ffffff-no-rj
order: 4
editLink: false
category:
  - 知识点
tag:
  - 控制系统


---
#
## docker基础
`Docker` 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。<br>
<font size=5>我们假设有一台a设备和b设备，一款软件有可能a能运行b却不行，而docker就是实现通过将某一个项目的环境和软件打包的方式以便其他用户使用的容器。</font>

## 1.安装
 (1)官网:[official](https://www.docker.com/)<br>
 (2)加速镜像:在Docker Engine里添加
 ```
 "registry-mirrors": [
    "https://dockerproxy.com",
    "https://docker.mirror.ustc.edu.cn",
    "https://docker.nju.edu.cn"
  ]
 ```
 ## 2.基础操作
 1. `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

`IMAGE` 是指 Docker 镜像的名称或 ID

`COMMAND` 是容器启动后要执行的命令

`ARG...` 是传递给 COMMAND 的参数

部分 OPTIONS 说明：

`-a stdin`
指定标准输入输出内容类型，可选 `STDIN/STDOUT/STDERR` 三项。

`-d`
后台运行容器，并返回容器 ID。

`-P`
随机端口映射，容器内部端口随机映射到主机的端口。

`-p`
指定端口映射，格式为：主机(宿主)端口:容器端口。

`--name="nginx-lb"`
为容器指定一个名称。

`--volume 或 -v`
绑定一个卷（挂载存储）。

2. `docker ps`:查看正在运行的容器
3. `docker stop 容器id|容器名字`:停止正在运行的容器
4. `docker ps -a`:查看本地的所有容器
5. `docker start 容器id|容器名字`:启动停止的容器
6. `docker rm 容器id|容器名字`：删除已经停止的容器  
7. `docker pull 仓库名/镜像名`:从仓库中获取镜像,"再通过`docker run`来运行
8. `docker image ls`查看本地所有镜像
9.  `docker rmi 镜像名字|id`删除某一个镜像