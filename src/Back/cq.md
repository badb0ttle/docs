---
title: cq
icon: gears
order: 4
editLink: false
cover: 
category:
  - 知识点
tag:
  - 控制系统
  - 登录
date: 2025-07-31
timeline: true
---
# 苍穹外卖
## 项目结构
```markdown
| 模块名称       | 模块类型       | 主要功能描述                                                                 |
|----------------|----------------|------------------------------------------------------------------------------|
| `sky-take-out` | 父工程（Maven） | 作为项目的父工程，负责统一管理所有子模块的依赖版本，同时聚合其他子模块，实现项目的整体构建与管理。 |
| `sky-common`   | 子模块         | 存放项目中通用的公共类，包括但不限于工具类（如日期处理、加密工具等）、常量类（如业务状态码、配置常量等）、异常类（如自定义业务异常、全局异常等）。 |
| `sky-pojo`     | 子模块         | 存放数据模型相关的类，包括实体类（对应数据库表结构的POJO）、VO（视图对象，用于前端展示的数据封装）、DTO（数据传输对象，用于层间数据传递）等。 |
| `sky-server`   | 子模块         | 作为后端服务核心模块，包含项目的配置文件（如数据库配置、Spring配置等），以及Controller（请求处理层）、Service（业务逻辑层）、Mapper（数据访问层）等核心业务组件。 |
```
## HttpClient
### 介绍
`HttpClient` 是Apache Jakarta Common 下的子项目，可以用来提供高效的、最新的、功能丰富的支持 HTTP协议的客户端编程工具包，并且它支持 HTTP 协议最新的版本和建议。
## 技术
### 登录拦截器
```java
@Component
public class JwtTokenAdminInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 1. 从请求头中获取 token
        String token = request.getHeader(jwtProperties.getAdminTokenName());

        try {
            // 2. 解析 token （用事先配置好的秘钥）
            Claims claims = JwtUtil.parseJWT(jwtProperties.getAdminSecretKey(), token);

            // 3. 从 token 里取出管理员ID
            Long empId = Long.valueOf(claims.get(JwtClaimsConstant.EMP_ID).toString());

            // 4. 存到 BaseContext (ThreadLocal) 里，方便后续代码直接拿当前用户ID
            BaseContext.setCurrentId(empId);

            // 5. 通过，继续执行 Controller
            return true;
        } catch (Exception ex) {
            // 解析失败（token 无效/过期等），返回 401 未授权
            response.setStatus(401);
            return false;
        }
    }
}
```
 管理员访问后台接口 时，用来校验 JWT token 是否有效，并把 当前管理员ID 存到上下文里，后续就能知道是谁在操作
### ThreadLocal上下文管理

#### BaseContext工具类
```java
public class BaseContext {
    // 定义一个 ThreadLocal，用来保存用户ID，保证每个线程独立存储
    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();
    
    // 设置当前用户ID（通常在拦截器解析出JWT后调用）
    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }
    
    // 获取当前用户ID（在 Service、DAO、自动填充器里直接用）
    public static Long getCurrentId() {
        return threadLocal.get();
    }
    
    // 清除当前用户ID（请求结束时调用，防止内存泄漏）
    public static void removeCurrentId() {
        threadLocal.remove();
    }
}
```
1. ThreadLocal 的作用:给每个线程单独开一个“变量副本”。
Web 应用里，请求是多线程并发的，如果用全局变量保存用户 ID，会出现串号问题。
用 ThreadLocal，每个请求线程只看到自己存的 ID，互不影响。
2.	为什么要保存用户ID
方便后续逻辑（比如写数据库时填充 createUser、updateUser）。
避免每一层方法都要手动传 userId 参数。
3.	removeCurrentId() 的必要性
Tomcat、Spring Boot 线程池会复用线程。
如果不在请求结束时清除 ThreadLocal，旧请求的 userId 可能“污染”下一个请求。
所以一般会在 拦截器的 afterCompletion() 或 过滤器 finally 块里调用removeCurrentId()。
#### 声明式缓存
```java
// 缓存查询结果
@Cacheable(cacheNames = "setmealsCache", key = "#categoryId")
public Result<List<Setmeal>> list(Long categoryId) {
    // 查询逻辑
}

// 清除缓存
@CacheEvict(cacheNames = "setmealsCache", allEntries = true)
public Result<String> update(@RequestBody SetmealDTO setmealDTO) {
    // 更新逻辑
}
```
`@Cacheable` = 查时缓存
当调用数据时，会先去缓存里查有没有结果，如果缓存里有，就直接返回，不会执行查询逻辑。
如果缓存里没有，就执行查询逻辑，并把结果存入缓存。
`@CacheEvict` = 改时清除缓存
更新了数据后，原来缓存的结果可能已经过期了，需要全部清理掉，避免用户查到旧数据。
### 5. 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result exceptionHandler(BaseException ex) {
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }
    
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex) {
        String message = ex.getMessage();
        if(message.contains("Duplicate entry")) {
            String[] split = message.split(" ");
            String username = split[2].replace("'", "");
            return Result.error(username + MessageConstant.ALREADY_EXIST);
        }
        return Result.error(MessageConstant.UNKNOWN_ERROR);
    }
}
```

### 6. WebSocket实时通信
WebSocket 是一种 全双工（full-duplex）、长连接 的网络通信协议。
运行在 TCP 之上，浏览器和服务器之间只需要一次握手，就可以建立持久连接。
建立连接后，客户端和服务器都可以主动发送消息，不再像 HTTP 一样只能客户端请求服器响应。
实时聊天or消息通知（比如新订单提醒、股票价格变化）or在线协作（文档编辑、协同白板）or游戏同步等等等
用传统 HTTP 就很麻烦，需要不停轮询。WebSocket 则能轻松解决
#### WebSocket配置
```java
@Configuration   // 声明这是一个配置类，相当于XML配置
@EnableWebSocket // 开启WebSocket功能
public class WebSocketConfiguration {
    
    // 声明一个 ServerEndpointExporter Bean
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

#### WebSocket服务端
```java
@Component
@ServerEndpoint("/ws/{sid}")
public class WebSocketServer {
    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid) {
        // 连接建立
    }
    
    @OnMessage
    public void onMessage(String message, @PathParam("sid") String sid) {
        // 消息接收
    }
    
    public void sendToAllClient(String message) {
        // 群发消息
    }
}
```

### 7. 定时任务处理

```java
@Component
public class OrderTask {
    @Scheduled(cron = "0 * * * * ?")  // 每分钟执行
    public void processTimeoutOrder() {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Orders::getStatus, Orders.PENDING_PAYMENT)
                   .lt(Orders::getOrderTime, time);
        
        List<Orders> ordersList = orderMapper.selectList(queryWrapper);
        // 处理超时订单
    }
}
```
`cron 表达式`
### 8. 文件上传服务

#### 阿里云OSS配置
```java
@Data
@Component
@ConfigurationProperties(prefix = "sky.alioss")
public class AliOssProperties {
    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;
}
```

#### 文件上传工具
```java
@Component
public class AliOssUtil {
    public String upload(byte[] bytes, String objectName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        try {
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(bytes));
        } finally {
            ossClient.shutdown();
        }
        return "https://" + bucketName + "." + endpoint + "/" + objectName;
    }
}
```

### 9. 数据统计与报表

#### 营业数据统计
```java
public BusinessDataVO getBusinessData(LocalDateTime begin, LocalDateTime end) {
    // 查询总订单数
    LambdaQueryWrapper<Orders> totalQuery = new LambdaQueryWrapper<>();
    totalQuery.between(Orders::getOrderTime, begin, end);
    Long totalOrderCount = orderMapper.selectCount(totalQuery);
    
    // 查询有效订单和营业额
    LambdaQueryWrapper<Orders> validQuery = new LambdaQueryWrapper<>();
    validQuery.eq(Orders::getStatus, Orders.COMPLETED)
              .between(Orders::getOrderTime, begin, end);
    
    BigDecimal turnover = orderMapper.selectList(validQuery).stream()
        .map(Orders::getAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
        
    return BusinessDataVO.builder()
            .turnover(turnover.doubleValue())
            .validOrderCount(validOrderCount.intValue())
            .orderCompletionRate(validOrderCount.doubleValue() / totalOrderCount)
            .build();
}
```

### 10. Excel报表导出
```java
public void exportBusinessData(HttpServletResponse response) {
    // 设置响应结果
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.setCharacterEncoding("utf-8");
    
    // 通过输入流读取模板文件
    InputStream in = this.getClass().getClassLoader().getResourceAsStream("template/运营数据报表模板.xlsx");
    
    try {
        XSSFWorkbook excel = new XSSFWorkbook(in);
        XSSFSheet sheet = excel.getSheet("Sheet1");
        
        // 填充数据
        sheet.getRow(1).getCell(1).setCellValue(businessData.getTurnover());
        
        ServletOutputStream out = response.getOutputStream();
        excel.write(out);
        out.close();
        excel.close();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```
## 项目结构
### 1. Maven多模块分层架构

#### 项目模块结构
```
sky-take-out (父模块)
├── sky-common (公共模块)
├── sky-pojo (数据对象模块) 
└── sky-server (服务模块)
```

#### sky-common 公共模块
**作用**: 存放项目中的公共组件、工具类、常量等，供其他模块复用

```
sky-common/
├── src/main/java/com/sky/
│   ├── constant/         # 常量类
│   │   ├── AutoFillConstant.java      # 自动填充相关常量
│   │   ├── JwtClaimsConstant.java     # JWT声明常量
│   │   ├── MessageConstant.java       # 消息提示常量
│   │   ├── PasswordConstant.java      # 密码相关常量
│   │   └── StatusConstant.java        # 状态常量
│   ├── context/          # 上下文工具
│   │   └── BaseContext.java          # ThreadLocal上下文管理
│   ├── enumeration/      # 枚举类
│   │   └── OperationType.java         # 操作类型枚举
│   ├── exception/        # 自定义异常
│   │   ├── BaseException.java         # 基础异常类
│   │   ├── AccountNotFoundException.java
│   │   └── LoginFailedException.java  # 各种业务异常
│   ├── json/            # JSON处理
│   │   └── JacksonObjectMapper.java   # Jackson配置
│   ├── properties/      # 配置属性类
│   │   ├── AliOssProperties.java      # 阿里云OSS配置
│   │   ├── JwtProperties.java         # JWT配置
│   │   └── WeChatProperties.java      # 微信相关配置
│   ├── result/          # 统一返回结果
│   │   ├── Result.java               # 统一响应格式
│   │   └── PageResult.java           # 分页结果封装
│   └── utils/           # 工具类
│       ├── AliOssUtil.java           # 阿里云OSS工具
│       ├── HttpClientUtil.java       # HTTP客户端工具
│       └── JwtUtil.java              # JWT工具类
```

#### sky-pojo 数据对象模块  
**作用**: 存放所有的数据传输对象，实现数据的封装和传输

```
sky-pojo/
├── src/main/java/com/sky/
│   ├── dto/              # 数据传输对象 (Data Transfer Object)
│   │   ├── EmployeeDTO.java          # 员工数据传输对象
│   │   ├── EmployeeLoginDTO.java     # 员工登录传输对象
│   │   ├── EmployeePageQueryDTO.java # 员工分页查询传输对象
│   │   ├── CategoryDTO.java          # 分类传输对象
│   │   └── DishDTO.java              # 菜品传输对象
│   ├── entity/           # 实体对象 (与数据库表对应)
│   │   ├── Employee.java             # 员工实体
│   │   ├── Category.java             # 分类实体  
│   │   ├── Dish.java                 # 菜品实体
│   │   ├── Setmeal.java              # 套餐实体
│   │   └── Orders.java               # 订单实体
│   └── vo/               # 视图对象 (View Object)
│       ├── EmployeeLoginVO.java      # 员工登录返回视图
│       ├── BusinessDataVO.java       # 营业数据视图
│       └── TurnoverReportVO.java     # 营业额报表视图
```

**DTO vs Entity vs VO 的区别**:
- **Entity**: 与数据库表一对一映射的实体类
- **DTO**: 用于不同层之间传输数据，通常用于接收前端参数
- **VO**: 返回给前端的视图对象，通常包含页面展示需要的数据

#### sky-server 服务模块
**作用**: 项目的核心业务模块，包含所有的业务逻辑、控制器、配置等

```
sky-server/
├── src/main/java/com/sky/
│   ├── SkyApplication.java           # Spring Boot启动类
│   ├── config/           # 配置类
│   │   ├── RedisConfiguration.java   # Redis配置
│   │   ├── OssConfiguration.java     # 对象存储配置
│   │   ├── WebMvcConfiguration.java  # Web MVC配置
│   │   └── WebSocketConfiguration.java # WebSocket配置
│   ├── controller/       # 控制器层
│   │   ├── admin/        # 管理端控制器
│   │   │   ├── EmployeeController.java    # 员工管理
│   │   │   ├── CategoryController.java    # 分类管理
│   │   │   ├── DishController.java        # 菜品管理
│   │   │   └── OrderController.java       # 订单管理
│   │   └── user/         # 用户端控制器
│   │       ├── ShoppingCartController.java # 购物车
│   │       └── OrderController.java        # 用户订单
│   ├── service/          # 服务层
│   │   ├── EmployeeService.java           # 员工服务接口
│   │   ├── impl/         # 服务实现类
│   │   │   ├── EmployeeServiceImpl.java   # 员工服务实现
│   │   │   ├── CategoryServiceImpl.java   # 分类服务实现
│   │   │   └── DishServiceImpl.java       # 菜品服务实现
│   ├── mapper/           # 数据访问层
│   │   ├── EmployeeMapper.java            # 员工数据访问
│   │   ├── CategoryMapper.java            # 分类数据访问
│   │   └── DishMapper.java                # 菜品数据访问
│   ├── interceptor/      # 拦截器
│   │   ├── JwtTokenAdminInterceptor.java  # 管理端JWT拦截器
│   │   └── JwtTokenUserInterceptor.java   # 用户端JWT拦截器
│   ├── handler/          # 处理器
│   │   ├── GlobalExceptionHandler.java    # 全局异常处理
│   │   └── MyMetaObjectHandler.java       # MyBatis-Plus自动填充
│   └── task/             # 定时任务
│       └── OrderTask.java                 # 订单定时任务
├── src/main/resources/
│   ├── application.yml                    # 主配置文件
│   ├── application-dev.yml               # 开发环境配置
│   └── mapper/           # MyBatis映射文件
│       └── EmployeeMapper.xml            # 员工映射文件
```

### 2. 各层职责详解

#### Controller层 (控制器层)
**职责**: 
- 接收HTTP请求并解析参数
- 调用Service层处理业务逻辑  
- 返回统一格式的响应数据
- 参数校验和异常处理

```java
@RestController
@RequestMapping("/admin/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    
    @PostMapping("/login")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) {
        // 1. 接收前端参数
        // 2. 调用service处理业务
        EmployeeLoginVO employeeLoginVO = employeeService.login(employeeLoginDTO);
        // 3. 返回统一响应格式
        return Result.success(employeeLoginVO);
    }
}
```

#### Service层 (业务逻辑层)
**职责**:
- 实现具体的业务逻辑
- 事务管理
- 调用Mapper层进行数据操作
- 数据转换和校验

```java
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
    
    @Override
    public EmployeeLoginVO login(EmployeeLoginDTO employeeLoginDTO) {
        // 1. 业务逻辑处理
        // 2. 调用mapper查询数据
        Employee employee = employeeMapper.getByUsername(username);
        // 3. 数据转换和返回
        return EmployeeLoginVO.builder().id(employee.getId()).build();
    }
}
```

#### Mapper层 (数据访问层)
**职责**:
- 与数据库交互
- 执行SQL语句
- 数据的CRUD操作

```java
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> {
    // 继承BaseMapper获得基础CRUD方法
    // 可添加自定义查询方法
    Employee getByUsername(String username);
}
```

#### Config配置层
**职责**:
- 第三方组件配置
- Bean的创建和管理
- 系统参数配置

```java
@Configuration
public class RedisConfiguration {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        // 配置Redis序列化等
        return template;
    }
}
```

### 3. 模块间依赖关系
```
sky-server (服务模块)
    ↓ depends on
sky-pojo (数据对象模块)  
    ↓ depends on
sky-common (公共模块)
```

**依赖说明**:
- `sky-server` 依赖 `sky-pojo` 和 `sky-common`
- `sky-pojo` 依赖 `sky-common`  
- `sky-common` 不依赖其他模块，作为基础模块

### 4. 统一响应格式
```java
@Data
public class Result<T> {
    private Integer code;
    private String msg;
    private T data;
    
    public static <T> Result<T> success() {
        Result<T> result = new Result<T>();
        result.code = 1;
        return result;
    }
    
    public static <T> Result<T> error(String msg) {
        Result result = new Result();
        result.code = 0;
        result.msg = msg;
        return result;
    }
}
```

### 5. 配置文件管理
```yaml
# application.yml
spring:
  profiles:
    active: dev
  datasource:
    druid:
      driver-class-name: ${sky.datasource.driver-class-name}
      url: jdbc:mysql://${sky.datasource.host}:${sky.datasource.port}/${sky.datasource.database}
      username: ${sky.datasource.username}
      password: ${sky.datasource.password}

mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      id-type: auto
      logic-delete-field: deleted
```

---