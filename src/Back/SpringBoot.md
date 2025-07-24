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
date: 2025-07-24
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
| 注解 | 说明 |
| ---- | ---- |
| @ConditionalOnProperty | 配置文件中存在对应的属性时，才声明该 bean |
| @ConditionalOnMissingBean | 当不存在当前类型的 bean 时，才声明该 bean |
| @ConditionalOnClass | 当前环境存在指定的类时，才声明该 bean |
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

