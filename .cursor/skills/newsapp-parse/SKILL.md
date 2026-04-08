---
name: newsapp-parse
description: 使用本仓库的 `NEWSAPP_CURSOR_DOC.md` 作为第一真源，对 NewsApp 进行结构化解析
---

## 目标

当用户要求“解析/梳理/理解/找入口/画数据流/描述实现步骤/定位应该改哪里”时，按本技能流程输出对齐代码的结果。

## 执行步骤

1. 读取项目根目录的 `NEWSAPP_CURSOR_DOC.md`，把它当作“第一真源/目标结构”。
2. 对照仓库实际代码（优先检查这些路径：`src/main.js`、`src/router/index.js`、`src/router/modules/*`、`src/permission.js`、`src/store/*`、`src/utils/request.js`、`src/api/*`、`src/libs/*`、`src/derectives/*`、`server/*`）。
3. 当文档与代码出现不一致时：
   - 先说明“不一致点是什么”
   - 再给出“以代码为准”的修正结论（并指出应查看的具体文件路径）
4. 输出时建议包含以下信息（按需裁剪）：
   - 关键入口文件与初始化顺序（例如 `src/main.js`）
   - 路由结构概览（PC/移动端如何选择、`meta.user` 鉴权在哪里）
   - Vuex 模块与持久化 key（`News-app`）
   - 请求封装约定（`src/utils/request.js` 的 `msg/result` 与 token 注入）
   - 后端端点（`/captcha`、`/sts`）
   - 全局 UI 能力注册方式（`src/libs/index.js`）与指令机制（`src/derectives/index.js`）
5. 不要凭空编造仓库里不存在的文件/接口/字段；若无法确认，列出“待确认点 + 应检查路径”。

