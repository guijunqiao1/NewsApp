# request 请求库结构

本目录按照文档规范拆分为三层：

- `request-axios-imp`：请求实现层，当前基于 axios 发送请求。
- `request-core`：请求核心层，提供注入、重试、并发、串行、缓存、幂等等上层能力。
- `request-bus`：请求业务层，负责注入实现层，并绑定项目业务协议、鉴权、响应解包等规则。

对外兼容原有入口：

```js
import request from '@/utils/request'
```

大文件上传协议的业务封装预留在 `request-bus/upload-protocol`，后续公司内部上传协议、接口样板代码、业务补丁和 `upload-sdk` 适配都应放在该目录下。
