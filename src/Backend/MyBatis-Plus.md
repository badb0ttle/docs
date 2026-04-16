---
title: MyBatis-Plus
icon: database
order: 2
editLink: false
cover: https://raw.githubusercontent.com/baomidou/logo/master/mybatis-plus-logo-new-mini.png
category:
  - 知识点
tag:
  - 后端开发
  - ORM框架
  - 数据库
date: 2024-08-19
star: true
timeline: true
---

# MyBatis-Plus
## 简介
MyBatis-Plus 是一个MyBatis 的增强工具，在MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生
### 废话
任何刚开始学MyBatis-Plus的都会从满脸的质疑到成为忠诚的MP信徒这样的转变,一开始我是不信的，学了3分钟之后就变脸了XD
## 基础操作
本章节展示如何在您的项目中使用MyBatis-Plus的常用功能
### 继承接口
MyBatis-Plus最核心的功能就是通过继承`BaseMapper<T>`接口，自动获得基础的CRUD操作方法：
``` java
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> {
    // 继承BaseMapper后，无需编写基础CRUD方法
    // 自动获得以下方法：
    // - insert(T entity): 插入一条记录
    // - deleteById(Serializable id): 根据ID删除
    // - updateById(T entity): 根据ID更新
    // - selectById(Serializable id): 根据ID查询
    // - selectList(Wrapper<T> queryWrapper): 条件查询
    // - selectPage(IPage<T> page, Wrapper<T> queryWrapper): 分页查询
    // ... 还有更多方法
}
```
### BaseMapper提供的核心方法
``` java
// 1. 插入操作
int insert(T entity);

// 2. 删除操作
int deleteById(Serializable id);
int deleteByMap(Map<String, Object> columnMap);
int delete(Wrapper<T> wrapper);
int deleteBatchIds(Collection<? extends Serializable> idList);

// 3. 更新操作
int updateById(T entity);
int update(T entity, Wrapper<T> updateWrapper);

// 4. 查询操作
T selectById(Serializable id);
List<T> selectBatchIds(Collection<? extends Serializable> idList);
List<T> selectByMap(Map<String, Object> columnMap);
T selectOne(Wrapper<T> queryWrapper);
Integer selectCount(Wrapper<T> queryWrapper);
List<T> selectList(Wrapper<T> queryWrapper);
List<Map<String, Object>> selectMaps(Wrapper<T> queryWrapper);
List<Object> selectObjs(Wrapper<T> queryWrapper);
IPage<T> selectPage(IPage<T> page, Wrapper<T> queryWrapper);
```
### 基础配置
```java
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

### 公共字段自动填充
自动填充处理器 (MetaObjectHandler)，作用是：在执行数据库插入（insert）的时候，自动给某些字段赋值
```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        Long currentId = BaseContext.getCurrentId();
        if (currentId != null) {
            this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
            this.strictInsertFill(metaObject, "createUser", Long.class, currentId);
        }
    }
}
```
## 进阶操作(并非进阶)
#### Lambda查询构造器
```java
// 基于BaseMapper的条件查询
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
    
    public PageResult pageQuery(EmployeePageQueryDTO queryDTO) {
        // 创建Lambda查询构造器（类型安全）
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        
        // 动态条件查询
        queryWrapper
            .like(StringUtils.hasText(queryDTO.getName()), Employee::getName, queryDTO.getName())  // 姓名模糊查询
            .eq(queryDTO.getStatus() != null, Employee::getStatus, queryDTO.getStatus())           // 状态精确查询
            .orderByDesc(Employee::getCreateTime);  // 按创建时间降序
            
        // 分页查询
        Page<Employee> page = new Page<>(queryDTO.getPage(), queryDTO.getPageSize());
        IPage<Employee> pageResult = employeeMapper.selectPage(page, queryWrapper);
        
        return new PageResult(pageResult.getTotal(), pageResult.getRecords());
    }
    
    // 普通条件查询
    public Employee getByUsername(String username) {
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Employee::getUsername, username)
                   .eq(Employee::getStatus, StatusConstant.ENABLE);
        
        return employeeMapper.selectOne(queryWrapper);  // 查询单条记录
    }
    
    // 批量操作
    public void batchDelete(List<Long> ids) {
        employeeMapper.deleteBatchIds(ids);  // 批量删除
    }
    
    // 统计查询
    public Long countActiveEmployees() {
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Employee::getStatus, StatusConstant.ENABLE);
        
        return employeeMapper.selectCount(queryWrapper);  // 统计数量
    }
}
```
#### 更新构造器的使用
```java
// 条件更新（不需要查询后再更新）
public void updateStatusByIds(List<Long> ids, Integer status) {
    LambdaUpdateWrapper<Employee> updateWrapper = new LambdaUpdateWrapper<>();
    updateWrapper.in(Employee::getId, ids)  // WHERE id IN (ids)
                .set(Employee::getStatus, status)  // SET status = ?
                .set(Employee::getUpdateTime, LocalDateTime.now())  // SET update_time = ?
                .set(Employee::getUpdateUser, BaseContext.getCurrentId());  // SET update_user = ?
                
    employeeMapper.update(null, updateWrapper);  // 执行更新
}
```

#### 分页查询详解
```java
// MyBatis-Plus分页功能的完整使用
@Service 
public class EmployeeServiceImpl implements EmployeeService {
    
    public PageResult pageQuery(EmployeePageQueryDTO queryDTO) {
        // 1. 创建分页对象 (当前页, 每页大小)
        Page<Employee> page = new Page<>(queryDTO.getPage(), queryDTO.getPageSize());
        
        // 2. 构建查询条件
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(StringUtils.hasText(queryDTO.getName()), Employee::getName, queryDTO.getName())
                   .eq(queryDTO.getStatus() != null, Employee::getStatus, queryDTO.getStatus())
                   .orderByDesc(Employee::getCreateTime);
        
        // 3. 执行分页查询 - BaseMapper提供的方法
        IPage<Employee> pageResult = employeeMapper.selectPage(page, queryWrapper);
        
        // 4. 封装返回结果
        return new PageResult(pageResult.getTotal(), pageResult.getRecords());
    }
}

// PageResult封装类
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult implements Serializable {
    private long total; // 总记录数
    private List records; // 当前页数据集合
}
```
#### 实体类配置与BaseMapper的配合
```java
// Employee实体类需要配置注解以配合BaseMapper工作
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("employee")  // 指定表名
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)  // 主键自增
    private Long id;

    @TableField("username")  // 字段映射
    private String username;

    @TableField("name")
    private String name;

    @TableField("password")
    private String password;

    @TableField("phone")
    private String phone;

    @TableField("sex")
    private String sex;

    @TableField("id_number")
    private String idNumber;

    @TableField("status")
    private Integer status;

    @TableField(value = "create_time", fill = FieldFill.INSERT)  // 插入时自动填充
    private LocalDateTime createTime;

    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)  // 插入和更新时自动填充
    private LocalDateTime updateTime;

    @TableField(value = "create_user", fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(value = "update_user", fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;
}
```