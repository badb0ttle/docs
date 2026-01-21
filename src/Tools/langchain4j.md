---
title: langchain4j
icon: gears
order: 4
editLink: false
category:
  - 知识点
tag:
  - AI
date: 2026-01-21
timeline: true
---

# LangChain4j
## 简介
**LangChain4j** 是 LangChain 的 Java 社区版本，旨在简化 Java 应用程序与大语言模型（LLM）的集成。它不仅复刻了 Python 版的核心理念，还针对 Java 生态（如 Spring Boot、Reactor）做了深度优化，让 Java 开发者能用熟悉的面向对象方式开发 AI 应用。


## Service层
### 1. AI Service（声明式服务）
这是 LangChain4j 最具 Java 味的设计。你只需定义一个接口，通过注解描述任务，框架会自动生成代理实现。
- 实战举例 ：在项目中，我们定义了 AiCodeHelperService 接口，配合 @SystemMessage 注解设定 AI 为“提示词工程师”，完全解耦了业务代码与 Prompt:
### `String chat(String message)`

```java
@SystemMessage(fromResource="system-prompt.txt")
Stringchat(Stringmessage);
```

#### 功能：
- 最基础的文本聊天接口。
- 接收用户输入`message`，返回一个字符串类型的回复。
- 使用`@SystemMessage`注解加载系统提示词（例如“你是AI助手，请用中文回答”），作为模型的上下文引导。
#### 特点：
- 同步调用，阻塞等待结果。
- 输出为普通字符串，适合简单问答场景。
- 不保存会话历史（除非配合`@MemoryId`）。

#### 适用场景：
>用户发送一条消息→AI回复一句自然语言。
---

### 2.`Report chatForReport(String message)`

```java
@SystemMessage(fromResource="system-prompt.txt")
ReportchatForReport(Stringmessage);

recordReport(Stringname,List<String>suggestionList){};
```

#### 功能：
- 调用同一个系统提示词，但要求模型返回**结构化数据**。
- 返回类型是自定义记录类`Report`，表示一种“学习报告”格式。
- 模型需理解并生成符合该结构的JSON或对象形式输出。

#### 特点：
- 利用**函数调用（FunctionCalling）**或**JSONSchema输出**技术，让LLM输出结构化数据。
- SpringAI会自动将模型输出反序列化为`Report`对象。
- 可以在后端直接处理字段（如`name`,`suggestionList`）。

#### 适用场景：
>用户问：“帮我分析一下这个项目的问题”，AI返回一个包含名称和建议列表的结构化报告。

#### 示例输出（JSON形式）：
```json
{
"name":"项目优化建议",
"suggestionList":[
  "增加缓存机制",
  "重构登录流程",
  "引入监控告警"
]
}
```

---

### 3.`Result<String> chatWithRag(StringuserMessage)`

```java
@SystemMessage(fromResource="system-prompt.txt")
Result<String>chatWithRag(StringuserMessage);
```
#### 功能：
-结合**RAG（Retrieval-AugmentedGeneration）**的聊天接口。
- 在生成回答前，先从知识库中检索相关文档，再结合检索内容进行推理。
- 返回值是`Result<String>`，通常封装了成功/失败状态、结果内容、可能的错误信息等。
#### 特点：
- 支持外部知识增强，提升回答准确性和专业性。
- `Result<T>`是典型的函数式编程风格封装，常用于处理异步或有副作用的操作。
- 常见于需要结合企业文档、FAQ、API文档等场景。

#### 适用场景：
>用户问：“如何配置Redis缓存？”→系统从内部文档库检索相关内容→再由LLM综合生成答案。

---

### 4.`Flux<String>chatStream(@MemoryIdintmemoryId,@UserMessageStringmessage)`

```java
@SystemMessage(fromResource="system-prompt.txt")
Flux<String>chatStream(@MemoryIdintmemoryId,@UserMessageStringmessage);
```

#### 功能：
- 实现**流式输出（Streaming）**的聊天接口。
- 返回`Flux<String>`，表示一个响应流（ReactiveStream），可逐块接收模型输出。
- 使用`@MemoryId`标记当前会话的记忆ID，实现多轮对话的状态保持。

#### 特点：
-实时性强：前端可以边接收边显示内容（如打字机效果）。
-支持长对话上下文管理（通过`memoryId`关联会话）。
-需要配合WebFlux或WebSocket使用。

#### 适用场景：
>构建实时聊天机器人、AI助手网页应用，希望看到逐步生成的内容。
#### 示例使用（前端）：
```javascript
constresponse=awaitfetch('/chat/stream',{
method:'POST',
body:JSON.stringify({message:"你好",memoryId:123})
});

constreader=response.body.getReader();
while(true){
const{value}=awaitreader.read();
if(!value)break;
console.log(newTextDecoder().decode(value));
}
```

---

### 总结对比表

|方法|返回类型|是否流式|是否结构化|是否支持RAG|是否支持记忆|
|------|----------|-----------|--------------|----------------|----------------|
|`chat()`|`String`|❌同步|❌普通文本|❌|❌|
|`chatForReport()`|`Report`|❌同步|✅结构化|❌|❌|
|`chatWithRag()`|`Result<String>`|❌同步|❌普通文本|✅|❌|
|`chatStream()`|`Flux<String>`|✅流式|❌普通文本|❌|✅|

---
## 模型层
支持 OpenAI、HuggingFace、 DashScope (通义千问) 等主流模型。
- 流式支持 ：通过 StreamingChatModel 配合 Reactor 的 Flux ，实现了类似 ChatGPT 的打字机输出体验，极大提升了交互感。
在**application.yml**中进行相关的模型配置(当然是local啦，总不可能让其他人看到key吧)
### RAG
解决 LLM 知识过时或私有数据缺失的问题，是企业级 AI 应用的核心技术。

*   **Ingestor（数据摄入管道）**：
    *   **加载（Loader）**：支持 FileSystem、S3、URL 等多种源，解析 PDF、Word、Markdown 等格式。
    *   **切分（Splitter）**：将长文档按段落、句子或固定字符数切分为小片段（Segment），保留上下文语义。
    *   **向量化（Embedding）**：使用 Embedding Model（如 text-embedding-v3）将文本转化为高维向量。
*   **Retriever（智能检索器）**：
    *   **语义检索**：计算用户问题向量与知识库向量的余弦相似度，召回最相关的片段。
    *   **查询重写（Query Rewriting）**：高级 RAG 会先优化用户问题（如补全省略语），再进行检索。
*   **实战演进**：
    *   **基础版**：本项目中使用 `InMemoryEmbeddingStore` + `FileSystemDocumentLoader`，适合快速验证和小规模数据。
    *   **进阶版（TODO）**：生产环境建议迁移至 **PGVector** 或 **Milvus** 等持久化向量数据库，支持海量数据存储；并引入 **Re-ranking（重排序）** 模型，对检索结果进行二次精排，大幅提升回答准确率。
## memory层
管理多轮对话的上下文。

- WindowMemory ：项目中使用了 MessageWindowChatMemory ，仅保留最近 10 条消息，既保证了上下文连贯，又避免了 Token 消耗过大。
## 其他
### Guardrails
在 LLM 处理前拦截敏感词，防止 Prompt 注入攻击。
听不懂？Interceptor。懂了吗 ^ _ ^