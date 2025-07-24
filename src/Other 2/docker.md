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
# 1.docker基础
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
# 2.docker-compose基础
`Docker Compose` 是 Docker 官方提供的多容器应用编排工具，可以通过一个`docker-compose.yml` 文件，定义和管理多个容器服务，使用一条命令即可启动、停止和理整个应用环境。<br>
我们假设有三台设备：A、B、C。现在要跑一个网站项目，这个网站需要三个部分,
如果每个人都自己去手动启动、配端口、网络等，容易出错、顺序混乱、版本不一致，A设备可能成功，B和C设备却各种报错。<br>
而 Docker Compose 就像是一个全自动指挥官，提前把所有容器的镜像、启动命令、端口映射、网络关系，统统写在一个文件里。到时候，只要一条命令<br>
## 1.安装
Mac 和 Windows 安装 Docker Desktop 时已集成 Compose，Linux 下可执行：
```bash
sudo apt-get install docker-compose
```
## 2.基础操作
(1)指令操作<br>
`docker compose up`<br>
启动服务（前台）<br>
`docker compose up -d`<br>
启动服务（后台）<br>
`docker compose down`<br>
停止并移除容器、网络、挂载<br>
`docker compose ps`<br>
查看当前 Compose 服务状态<br>
`docker compose logs`<br>
查看服务日志<br>
`docker compose exec 服务名 bash`<br>
进入指定服务容器的终端<br>
(2)配置文件
Compose 使用 docker-compose.yml 文件定义服务，常见结构如下：
```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: 123456
```