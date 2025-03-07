---
title: Shell
icon: gears
order: 4
editLink: false
category:
  - 使用指南
tag:
  - 知识点


---
# 
# Linux 常用命令

## 1. 基本命令

### 目录操作


<img src="https://badb0ttle.github.io/picx-images-hosting/1.打印当前目录：pwd.6m419w5pfu.webp">

1. **打印当前目录** ：`pwd`
2. **列出目录内容**：`ls`
   - `ls -l`: 以长格式显示文件详细信息（权限、所有者、大小等）。
   - `ls -a`: 显示所有文件，包括隐藏文件（以 `.` 开头的文件）。
   - `ls -h`: 以人类可读的格式显示文件大小（如 KB, MB）。
3. **切换目录**：`cd [路径]`
   - `cd ~`: 切换到当前用户的主目录。
   - `cd ..`: 切换到上一级目录。
   - `cd -`: 切换到上一次所在的目录。
4. **创建目录**：`mkdir [文件夹名]`
   - `-p`: 递归创建目录（如果父目录不存在，则一并创建）。
   - 示例：`mkdir -p project/src bin doc` 创建 `project` 目录，并在其中创建 `src`, `bin`, `doc` 子目录。
5. **删除文件或目录**：`rm [文件夹名]`
   - `rm -r`: 递归删除目录及其内容。
   - `rm -f`: 强制删除，不提示确认。
   - 示例：`rm -rf ./*` 删除当前目录下所有文件。
  <br>如下图...
  <img src="https://badb0ttle.github.io/picx-images-hosting/root@iZgw075bwgq0gfreepkaoyZhome">

1. **新建文件或更新文件时间戳**：`touch`
2. **移动文件**：`mv [原文件位置] [新文件位置]`
   - `-i`: 覆盖前提示确认。
   - `-v`: 显示移动过程。
3. **复制文件**：`cp [原文件位置] [新文件位置]`
   - `-i`: 覆盖前提示确认。
   - `-v`: 显示复制过程。
4. **查看文件内容**：`cat [文件名]`
   - `-n`: 显示行号。
5.  **查看文件末尾**：`tail -n [行数] [文件名]`
6.  **打印字符串到屏幕**：`echo [字符串]`
7.  **把字符串追加到文件中**：`echo [字符串] >> [文件名]`
8.  **查询历史命令**：键盘上下键，或命令 `history`。
<img src="https://badb0ttle.github.io/picx-images-hosting/6.新建文件或更新文件时间戳：touch.3k858o61qg.webp">

### 文件操作

- `cat 文件名 | tee -a 文件名`: 将文件中的所有内容复制一遍。
- `tail -n 12 文件名 | nl`: 标上行号。

---


## 2. 进程管理

### 实时监控系统资源

1. **`top` 命令**：实时监控系统资源。
   - **PID**：进程的标识符。
   - **USER**：运行进程的用户名。
   - **PR（优先级）**：进程的优先级。
   - **NI（Nice值）**：进程的优先级调整值。
   - **VIRT（虚拟内存）**：进程使用的虚拟内存大小。
   - **RES（常驻内存）**：进程实际使用的物理内存大小。
   - **SHR（共享内存）**：进程共享的内存大小。
   - **%CPU**：进程占用 CPU 的使用率。
   - **%MEM**：进程占用内存的使用率。
   - **TIME+**：进程的累计 CPU 时间。
   - 按下 `K`，输入 PID 可以杀掉对应的进程。
  
  <img src="https://badb0ttle.github.io/picx-images-hosting/Pasted-Graphic-1.9dd3hyutsi.webp">

1. **显示进程信息**：`ps`
   - `ps -a`: 显示所有用户进程。
   - `ps -u`: 显示进程所属用户。
   - `ps -x`: 显示没有控制终端的进程（如守护进程）。
  
<img src="https://badb0ttle.github.io/picx-images-hosting/2.显示进程信息：ps.6bh7gqtk51.webp">

---

## 3. 网络管理

### 显示网络连接信息

1. **`netstat` 命令**：显示网络连接信息。
   - `netstat -n`: 以数字形式显示地址和端口。
   - `netstat -l`: 显示监听端口。
   - `netstat -t`: 显示 TCP 连接。
   - `netstat -u`: 显示 UDP 连接。
   - `netstat -p`: 显示 PID 和进程名。
   - 示例：`netstat -nltp`。

2. **安装网络工具**：
   - 使用 `apt` 包管理系统安装网络工具：
     ```bash
     apt install net-tools
     ```

3. **查找进程**：
   - `ps -aux | grep name`: 查找一个名为 `name` 的进程。
<img src="https://badb0ttle.github.io/picx-images-hosting/3.显示网络连接信息：netstat.67xlj10ju5.webp">

