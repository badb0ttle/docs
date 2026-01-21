---
title: SpringBoot
icon: gears
order: 4
editLink: false
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcvKX0p8JeQ36AtLZ8qTiCqQwK-oJFeY-snQ&s
category:
  - 知识点
tag:
  - 控制系统
date: 2025-07-27
timeline: true
---
# Spring Boot
## 简介
### 基础介绍
Spring Boot是Spring提供的一个子项目，用于快速构建`Spring`应用程序
数据获取 `Spring Data`<br>
消息传递 `Spring AMQP`<br>
核心功能 `Spring Framework`<br>
认证授权 `Spring Security`<br>
服务治理 `Spring Cloud`<br>
Spring Boot:<br>
1．起步依赖<br>
2. 自动配置<br>
3.其他特性<br>
•内嵌的Tomcat、Jetty（无需部署WAR文件）<br>
•外部化配置<br>
• 不需要XML配置（properties/yml）<br>
### 自动配置
遵循约定大约配置的原则，在boot程序启动后，一些bean对象会自动注入到ioc容器，不需要手动声明，简化开发
## 基础篇
### 基础配置
#### properties
[application.properties](docs.spring.io/spring-boot/docs/current/reference/html/application-properties.htm|#appendix.application-properties)
#### 书写yml和获取
1. 配置信息书写
• 值前边必须有空格，作为分隔符
• 使用空格作为缩进表示层级关系，相同的层级左侧对齐
2. 配置信息获取
@Value（"$｛键名｝”）
@ConfigurationProperties（prefix ="前缀”）
### 关联MyBatis
详情见MyBatis章节
### Bean扫描
SpringBoot默认扫描启动类所在的包及其子包<br>
if需要扫描指定包需要:
```Java
@ComponentScan(basePackages = "")
```
| Bean注册注解 | 说明                 | 位置                                            |
| :----------: | :------------------- | :---------------------------------------------- |
|  @Component  | 声明bean的基础注解   | 不属于以下三类时，用此注解                      |
| @Controller  | @Component的衍生注解 | 标注在控制器类上                                |
|   @Service   | @Component的衍生注解 | 标注在业务类上                                  |
| @Repository  | @Component的衍生注解 | 标注在数据访问类上（由于与mybatis整合，用的少） |
#### mvn安装本地jar包
mvn install:install-file 
  -Dfile=<本地 JAR 文件路径> 
  -DgroupId=<Maven 坐标的 groupId> 
  -DartifactId=<Maven 坐标的 artifactId> 
  -Dversion=<版本号> 
  -Dpackaging=jar 
| 参数                 | 说明                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `-Dfile`             | 本地 JAR 文件的绝对路径（Windows 注意转义 `\` 或用 `/`，如 `C:/xxx/xx.jar`） |
| `-DgroupId`          | Maven 依赖的 `groupId`，一般用公司 / 组织域名倒写（如 `cn.itcast`）          |
| `-DartifactId`       | Maven 依赖的 `artifactId`，标识具体项目 / 模块（如 `common-pojo`）           |
| `-Dversion`          | 版本号（如 `1.0` `1.0-SNAPSHOT`）                                            |
| `-Dpackaging`        | 包类型，JAR 包填 `jar`，WAR 包填 `war` 等                                    |
| **可选参数**         |                                                                              |
| `-Dclassifier`       | 分类器（如区分 `javadoc` `sources`，非必须）                                 |
| `-DgeneratePom=true` | 自动生成 POM 文件（默认 `true`，可不写）                                     |

example:<br>
Windows:
```bash
mvn install:install-file \
  -Dfile=C:\Users\Administrator\Desktop\资料\02_Bean注册资料\common-pojo-1.0-SNAPSHOT.jar \
  -DgroupId=cn.itcast \
  -DartifactId=common-pojo \
  -Dversion=1.0 \
  -Dpackaging=jar 
```
mvn install:install-file \
  -Dfile="/Users/mac/Downloads/common-1.0-20180904.013101-1.jar" \
  -DgroupId=com.xujc \
  -DartifactId=common-pojo \
  -Dversion=1.0 \
  -Dpackaging=jar
### Bean注册
如果要注册的bean对象来自于第三方（不是自定义的），是无法用 @Component 及衍生注解声明bean的
如果要注册第三方bean，建议在配置类中集中注册
```java
@Configuration
public class CommonConfig {
@Bean
public Resolver resolver (){return new Resolver();
}
}
```
#### @Import
• 导入配置类
• 导入 ImportSelector 接口实现类
• @EnableXxxx注解，封装@Import注解
| 注解                      | 说明                                      |
| ------------------------- | ----------------------------------------- |
| @ConditionalOnProperty    | 配置文件中存在对应的属性时，才声明该 bean |
| @ConditionalOnMissingBean | 当不存在当前类型的 bean 时，才声明该 bean |
| @ConditionalOnClass       | 当前环境存在指定的类时，才声明该 bean     |
### 自动配置
遵循约定大约配置的原则，在boot程序启动后，起步依赖中的一些bean对象会自动注入到ioc容器
### SpringBoot 自动配置流程（四点总结）

1. **注解驱动启动**  
   在主启动类上添加 `@SpringBootApplication` 注解，该注解组合了 `@EnableAutoConfiguration`、`@ComponentScan` 和 `@Configuration`。其中，`@EnableAutoConfiguration` 是触发自动配置的核心注解。

2. **导入自动配置选择器**  
   `@EnableAutoConfiguration` 通过 `@Import(AutoConfigurationImportSelector.class)` 导入 `AutoConfigurationImportSelector` 类。该类的 `selectImports` 方法会被调用，开始自动配置类的发现过程。

3. **加载自动配置类**  
   - **Boot 2.7 及以后**：读取 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件，获取所有自动配置类的全限定名。  
   - **Boot 2.7 以前**：读取 `META-INF/spring.factories` 文件中 `EnableAutoConfiguration` 键对应的值。

4. **条件过滤与 Bean 注册**  
   对加载的自动配置类进行条件过滤，根据 `@Conditional` 及其衍生注解（如 `@ConditionalOnClass`、`@ConditionalOnProperty` 等）判断是否满足注册条件。满足条件的配置类会被解析，并将其中定义的 Bean 注册到 Spring 的 IOC 容器中。
## 实战篇
### 注册接口

#### 接口开发思路
明确需求->阅读接口文档->思路分析->开发->测试
#### lombok
Lombok 在编译阶段，为实体类自动生成setter getter toString
pom文件中引入依赖在实体类上添加注解
`@Data`
#### 实现流程
<img src="https://github.com/badb0ttle/picx-images-hosting/raw/master/3601753345385_.pic.9kghbnyuke.webp">

#### 参数校验
Spring Validation
1. 导入validation坐标
2. 在参数上添加@Pattern注解，指定校验规则
3. 在Controller类上添加@Validated注解
4. 在全局异常处理器中处理参数校验失败的异常

### 登录接口
实现参考注册接口，即多了一个验证密码
#### jwt令牌生成验证
*注意*
JWT校验时使用的签名秘钥，必须和生成JWT令牌时使用的秘钥是配套的。
如果JWT令牌解析校验时报错，则说明JWT令牌`被篡改` 或 `失效了`，令牌非法。
1. 组成
• Header（头），记录令牌类型和签名算法等
• PayLoad（荷载），携带自定义的信息
• Signature（签名），对头部和荷载进行加密计算得来
2. 使用
• 引入java-jwt坐标
• 调用API生成和校验令牌
• 解析令牌抛出异常，就证明令牌被篡改或者过期了
#### 拦截器
1. 注册 `@Component`,`implements HandlerInterceptor`
2. config:
    ```java
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor).excludePathPatterns("/user/login","/user/register");
    }
    ```

### 更新用户信息
#### RequestBody
当你前端通过 HTTP 的 PUT（或 POST 等 ）请求发送 JSON 格式数据（像更新用户信息时，传 {"id":594513921,"nickname":"wb","email":"wb@itcast.cn"} 这类 JSON ），@RequestBody 能让 Spring 把请求体（Request Body）里的 JSON 数据，自动转换成对应的 Java 对象（这里就是 User 实体类对象 ）。
### 令牌主动失效机制
#### Redis
详情见Redis文章
#### 操作
• 登录成功后，给浏览器响应令牌的同时，把该令牌存储到redis中
• Loginlnterceptor拦截器中，需要验证浏览器携带的令牌，并同时需要获取到redis中存储的与之相同的令牌
• 当用户修改密码成功后，删除redis中存储的旧令牌
### Spring Boot 部署
#### plugin
1. 安装依赖  

```
 <artifactId>spring-boot-maven-plugin</artifactId>
```

2. 在项目根目录执行：
```bash
mvn clean package
```

3. 运行则:

```bash
java -jar target/your-project-0.0.1-SNAPSHOT.jar
```
#### docker
1. 安装 Docker 见docker文章[docker](https://badb0ttle.github.io/docs/Other/docker.html)
2. 在项目根目录下创建 Dockerfile
```dockerfile
# 基础镜像（使用官方 OpenJDK）
FROM openjdk:17-jdk-slim

# 设置工作目录
WORKDIR /app

# 复制打包好的 JAR 文件
COPY target/your-project-0.0.1-SNAPSHOT.jar app.jar

# 暴露应用端口（根据你的应用修改）
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "app.jar"]
```
3. 构建 Docker 镜像
在项目根目录下执行（先打包 Maven 项目）：
```bash
mvn clean package
docker build -t your-project:1.0.0 .
```
参数说明：
-t your-project:1.0.0：指定镜像名称和版本。
.：当前目录（Dockerfile 所在位置）
4. 运行docker容器
```bash
docker run -d -p 8080:8080 your-project:1.0.0
```
## 技术
以下内容详情看[cq章节](https://badb0ttle.github.io/docs/Back/cq.html)
### Spring Boot 配置
配置优先级`从上往下递减`
• 项目中resources目录下的application.yml
• Jar包所在目录下的application.yml
• 操作系统环境变量
• 命令行参数
### Spring Cache
`Spring Cache` 是一个框架，实现了基于注解的缓存功能，只需要简单地加一个注解，就能实现缓存功能。
Spring Cache 提供了一层抽象，底层可以切换不同的缓存实现，例如：
• EHCache
• Caffeine
• Redis
### Spring Task 介绍
Spring Task 是Spring框架提供的任务调度工具，可以按照约定的时间自动执行某个代码逻辑。
### WebSocket 介绍
WebSocket 是基于TCP 的一种新的网络协议。它实现了浏览器与服务器全双工通信——浏览器和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。
### Apache POI 介绍(感觉没啥用)
Apache POl 是一个处理Miscrosoft Office各种文件格式的开源项目。简单来说就是，我们可以使用POI 在Java 程序中对Miscrosoft Office各种文件进行读写操作。
一般情况下，POl 都是用于操作 Excel 文件。