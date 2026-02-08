---
title: 天机学堂
index: false
editLink: false
icon: 'terminal'
order: 4
timeline: true
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcvKX0p8JeQ36AtLZ8qTiCqQwK-oJFeY-snQ&s
author: badbottle
footer: 天机学堂
copyright: 版权归badb0ttle所有
date: 2026-02-07
category:
  - 项目实战
---
**简介**
于2026年2月7日正式开始学习tjxt的项目,good luck
系统: mac
编辑器: cursor,idea,vscode
ai: gemini,gpt
## day1
把虚拟机用vmware fusion安装完成并设置好网卡,注意,mac在按照教程进行的时候需要根据虚拟机内的enp*的ip进行修改
### 关键知识点
#### 阅读代码
1. **找到请求入口**  
   在企业开发中，通常接手他人代码，可以通过与同事交流确定入口位置；如果无直接渠道，可从前端请求出发，逆向定位后端核心入口。

2. **理清请求链路**  
   找到入口后，先整体浏览项目结构，梳理前端请求如何一路传递到微服务，依次经过哪些模块与组件。此过程有助于定位和解决BUG。

3. **紧跟主线，逐步深入**  
   面对复杂源码，不必试图一开始就理解全部细节。应以业务主线为引导，聚焦核心流程，从宏观脉络逐步下沉到关键细节，理清主业务流程，再按需跟进细节问题。

4. **形成整体流程图**  
   梳理清楚请求链路与业务主线后，画出整体流程图，便于查找问题、团队沟通以及后续持续优化。
## day2
**开发一个新业务的一般流程**
1. 分析产品原型需求拆解基于产品原型和需求，分析业务流程，抽取业务实体，设计业务接口。
2. 设计数据结构建模与数据库设计根据业务实体和接口，设计数据库表以及接口关联的相关实体。
3. 实现功能接口代码开发基于之前定义的接口用代码实现相关功能，如有必要也可以对接口小调整。
4. 测试本地验证接口开发完成后先做本地测试，确保每一个接口基本可用且满足业务需求。
5. 联调前后端/多服务对接接口开发完毕后与其它微服务及前端联调，修复 BUG。
**设计接口**
[<img src="https://github.com/badb0ttle/picx-images-hosting/raw/master/4627f07c-3502-4ee0-b3f7-cd491986ecc6.58hw0foryf.webp">](https://github.com/badb0ttle/picx-images-hosting/raw/master/4627f07c-3502-4ee0-b3f7-cd491986ecc6.58hw0foryf.webp)
1. PO (Persistent Object) —— 持久化对象
定义：它与数据库中的表结构一一对应。

职责：它的字段必须和数据库表的字段名、类型完全匹配。

例子：比如你的课表表 tb_lesson。

数据库里有 create_time（创建时间）、update_user（更新人）等字段。

PO 类中也会有这些字段。

核心逻辑：PO 只负责把数据从数据库里“捞”出来，或者“存”进去。

2. VO (View Object) —— 视图对象
定义：它是接口返回给前端的数据结构。

职责：只包含前端页面真正需要展示的数据。

例子：参考你刚才提供的分页接口 /lessons/page。

前端可能只需要展示：课程名、讲师名、学习进度。

前端不需要看到：create_time、is_deleted（逻辑删除标志）。

核心逻辑：VO 会对数据进行“瘦身”或“组合”。比如数据库里存的是 teacher_id (PO)，但 VO 会通过查询转换成 teacher_name 返回给前端


