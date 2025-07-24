---
title: hbase
icon: gears
order: 4
editLink: false
category:
  - 云计算

---
# Ubuntu 安装与配置 HBase 的步骤

##  1. 安装 JDK
HBase 需要 Java 运行环境，先安装 **JDK**：

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
```
检查 Java 安装是否成功...
```
java -version
```
##  2.安装 Hbase
我是用wget:(如果没有wget的话)
```
sudo apt update
sudo apt install wget -y
```
然后执行下载...
```
wget https://dlcdn.apache.org/hbase/2.6.2/hbase-2.6.2-bin.tar.gz
```
解压之后移动到相应位置，这里我以/usr/local为例：
```
sudo mv hbase-2.6.2 /usr/local/
cd /usr/local/hbase-2.6.2
```
##  3.基础配置

先配置一下JAVA路径，还记得javaweb的JAVA_HOME吗:如果不知道用以下方法查询:
```
readlink -f $(which java)
```
随后...<br>
1.编辑hbase-env.sh 文件，指定 JAVA_HOME：
```
vim conf/hbase-env.sh
```
在里面添加
```
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```
2.配置 hbase-site.xml
```
vim conf/hbase-site.xml
```
在里面修改形如此配置:
```xml  
<property>
    <name>hbase.rootdir</name>
    <value>file:///usr/local/hbase-2.6.2/data</value><!--data路径-->
  </property>
  <property>
    <name>hbase.cluster.distributed</name>
    <value>false</value>
  </property>
    <property>
        <name>hbase.tmp.dir</name>
        <value>/usr/local/hbase-2.6.2/tmp</value><!--临时文件路径-->
</property>
  <property>
    <name>hbase.unsafe.stream.capability.enforce</name>
    <value>false</value>
  </property>
  <property>
        <name>hbase.zookeeper.property.dataDir</name>
        <value>/usr/local/hbase-2.6.2/zookeeper</value><!--你的zookeeper路径-->
    </property>
</configuration>
```
## 5.启动Hbase

```
cd /usr/local/hbase-2.6.2
bin/start-hbase.sh
```
访问[qaq](http://localhost:16010/)恭喜你成功啦!