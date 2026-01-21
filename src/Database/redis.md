---
title: Redis
icon: gears
order: 4
editLink: false
category:
  - 知识点
tag:
  - 数据库
date: 2025-08-06
timeline: true
---
#
# Redis
## 简述
`Redis`是一个基于内存的键值数据库
特点:
1. 读写性能高
2. 适合热点数据(热点商品、咨询、新闻)
## 数据类型
### 字符串（string）
普通字符串，Redis中最简单的数据类型
### 哈希（hash）
也叫散列，类似于Java中的HashMap结构,适合存储`对象`
### 列表（list）
按照插入顺序排序，可以有重复元素，类似于Java中的LinkedList
,适合存储有`顺序`的数据(点赞)
### 集合（set）
无序集合，没有重复元素，类似于Java中的HashSet,可以进行集合的`运算`
### 有序集合（sorted set / zset）
集合中每个元素关联一个分数（score），根据分数升序排序，没有重复元素,适用于排行榜
## Redis 类型常用命令
### 字符串
- `SET key value`  
  设置指定 key 的值。

- `GET key`  
  获取指定 key 的值。

- `SETEX key seconds value`  
  设置指定 key 的值，并将 key 的过期时间设为 seconds 秒。

- `SETNX key value`  
  只有在 key 不存在时设置 key 的值。
### Hash
Redis 的 Hash 是一个 string 类型的 field 和 value 的映射表，非常适合用于存储对象。

- `HSET key field value`  
  将哈希表 key 中的字段 field 的值设为 value。

- `HGET key field`  
  获取存储在哈希表中指定字段的值。

- `HDEL key field`  
  删除存储在哈希表中的指定字段。

- `HKEYS key`  
  获取哈希表中所有字段（field）。

- `HVALS key`  
  获取哈希表中所有值（value）。
### List
Redis 列表是简单的字符串列表，按照插入顺序排序，支持从两端插入和弹出操作。

- `LPUSH key value1 [value2 ...]`  
  将一个或多个值插入到列表头部（左边）。

- `LRANGE key start stop`  
  获取列表指定范围内的元素。索引从 0 开始，`-1` 表示最后一个元素。

- `RPOP key`  
  移除并获取列表最后一个元素（右边）。

- `LLEN key`  
  获取列表的长度。
### Set
Redis Set 是 string 类型的无序集合。集合成员是唯一的，集合中不能出现重复的数据。

- `SADD key member1 [member2 ...]`  
  向集合添加一个或多个成员。

- `SMEMBERS key`  
  返回集合中的所有成员。

- `SCARD key`  
  获取集合的成员数。

- `SINTER key1 [key2 ...]`  
  返回给定所有集合的交集。

- `SUNION key1 [key2 ...]`  
  返回所有给定集合的并集。

- `SREM key member1 [member2 ...]`  
  删除集合中一个或多个成员。
### 有序集合
Redis 有序集合是 string 类型元素的集合，且不允许有重复成员。每个元素关联一个 double 类型的分数，用于排序。

- `ZADD key score1 member1 [score2 member2 ...]`  
  向有序集合添加一个或多个成员，并设置分数。

- `ZRANGE key start stop [WITHSCORES]`  
  通过索引区间返回有序集合中指定区间内的成员。可选参数 `WITHSCORES` 可同时返回分数。

- `ZINCRBY key increment member`  
  为有序集合中的指定成员的分数增加给定的增量 `increment`。

- `ZREM key member [member ...]`  
  移除有序集合中的一个或多个成员。
### 通用命令

这些命令适用于所有类型的 key，不区分数据类型。

- `KEYS pattern`  
  查找所有符合给定模式（pattern）的 key。  
  例：`KEYS user:*` 会返回所有以 `user:` 开头的 key。

- `EXISTS key`  
  检查给定 key 是否存在，存在返回 1，不存在返回 0。

- `TYPE key`  
  返回 key 所储存的值的数据类型（如：string、list、set、zset、hash）。

- `DEL key`  
  删除一个或多个 key。如果 key 存在则删除，返回删除的数量。
## Java应用程序
### 介绍
Redis 的 Java 客户端很多，常用的几种：
• Jedis
• Lettuce
• Spring Data Redis
Spring Data Redis 是Spring的一部分，对 Redis 底层开发包进行了高度封装。
在Spring 项目中，可以使用Spring Data Redis来简化操作。
### 操作步骤：
导入Spring Data Redis 的maven坐标
② 配置Redis数据源
③ 编写配置类，创建RedisTemplate对象
④ 通过RedisTemplate对象操作Redis