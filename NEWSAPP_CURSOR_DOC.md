# NewsApp Cursor 项目理解文档

本文件用于让 Cursor/Agent 在理解本仓库时拥有统一的“第一真源”。当你需要解析项目结构、找入口链路、定位数据流或提出实现方案时，请优先依据本文件，再对照代码进行确认。

---

## 1. 技术栈与整体形态

- 前端：Vue 3 + Vite（SFC 单文件组件）、Vue Router、Vuex
- 样式：TailwindCSS（暗黑模式使用 `dark` class）、并使用 `tailwind-scrollbar`
- 构建/图标：Vite + `vite-plugin-svg-icons`（全局 icon symbol 注册）
- 后端（本仓库内）：Express（`server/`），提供验证码校验与阿里云 OSS 上传凭证（STS）
- 数据与接口：
  - 前端 `src/api/*` 中大部分逻辑目前是“模拟 Promise 返回”，但仍保留了真实请求写法（注释掉的 `request`/axios 调用）
  - 真实请求时走 `src/utils/request.js` 统一封装（axios + token 注入 + 拦截器）

---

## 2. 目录结构速览（你应当重点关注什么）

- 前端入口与运行链路
  - `index.html`：加载脚本与挂载点
  - `src/main.js`：创建 Vue 应用、挂载路由、Vuex、全局组件与主题/鉴权
  - `src/router/*`：路由配置（并区分 PC/移动端路由表）
  - `src/permission.js`：全局前置鉴权（根据 `to.meta.user`）
  - `src/store/*`：Vuex 中枢与模块（并持久化）
- 业务与实现
  - `src/views/*`：路由对应页面与组件目录
  - `src/api/*`：接口封装（登录/新闻/分类/支付/STS 等）
  - `src/utils/*`：请求拦截与工具（request、theme、flexible、pay 等）
  - `src/libs/*`：全局 UI/能力库（如 `message`、`confirm`、自动注册组件）
  - `src/derectives/*`：全局自定义指令（目录名为 `derectives`，注意拼写）
- 后端
  - `server/server.js`：Express 服务与 `/captcha`
  - `server/sts.js`：Express Router，提供 `/sts`

---

## 3. 前端启动与渲染主链路

### 3.1 `index.html`

- 挂载点：`<div id="app"></div>`
- 入口脚本：`<script type="module" src="/src/main.js"></script>`
- 页面包含 QQ 登录与微博分享的外部脚本（用于登录/分享相关能力）

### 3.2 `src/main.js`（最重要的入口）

核心步骤（按顺序）：

1. 创建应用：`createApp(App)`
2. 样式导入：`./styles/index.scss`
3. 路由：`router`（`./router/index.js`）
4. rem 与主题/适配：
   - `useREM()`：监听 `DOMContentLoaded` 动态设置 `html.style.fontSize`
   - `useTheme()`：监听 Vuex 的 `themeType` 并修改 `documentElement.className`
5. 全局 SVG icon 注册：`virtual:svg-icons-register`
6. 全局指令：`use(mDirectives)`（`./derectives/index.js`，自动注册 `derectives/modules/*.js`）
7. 全局能力组件注册：`use(mLibs)`（`src/libs/index.js` 自动扫描并注册 `src/libs/*/index.vue`）
8. 鉴权文件全量引入：`import './permission'`（通过副作用注册 router guard）

---

## 4. 路由体系（PC / 移动端如何切换）

### 4.1 `src/router/index.js`

- 使用 `createRouter` + `createWebHistory()`
- 根据 `isMobile.value` 在 `mobileRoutes` 与 `pcRoutes` 之间选择路由表
- 移动端/PC 选择逻辑在 `src/utils/flexible.js` 中（`isMobile` 基于 userAgent 正则）

### 4.2 路由表文件

- PC：`src/router/modules/pc-routers.js`
  - `path: '/'` 命中 `src/views/layout/index.vue`，并作为 layout 的父路由
  - `/profile`、`/member`、`/pay/result` 等带 `meta.user: true` 的路由需要登录
- 移动端：`src/router/modules/mobile-routers.js`
  - 大体包含 `/`、`/login`、`/register`、`/profile`、`/member`、`/pay/result`
  - 带 `meta.user: true` 的路由需要登录

---

## 5. 鉴权（全局前置守卫）

文件：`src/permission.js`

逻辑：

- `router.beforeEach((to) => { ... })`
- 如果 `to.meta.user` 未开启：直接放行
- 如果 `to.meta.user` 开启：
  - 若 `store.getters.token` 存在：放行
  - 否则：提示 `message('warn', '登录失效，请重新登录!')` 并跳转 `/`

注意：该 guard 依赖 Vuex 的 token getter：`src/store/getters.js`

---

## 6. Vuex 数据层（中枢 + 模块 + 持久化）

### 6.1 `src/store/index.js`

- 使用 `createStore` 创建 Vuex
- 模块：
  - `category`：`src/store/modules/category.js`
  - `theme`：`src/store/modules/theme.js`
  - `app`：`src/store/modules/app.js`
  - `search`：`src/store/modules/search.js`
  - `user`：`src/store/modules/user.js`
- 持久化：
  - 使用 `createPersistedState`
  - `key: 'News-app'`
  - `paths: ['category','theme','search','user']`

### 6.2 `src/store/getters.js`（计算属性）

关键 getter：

- `categorys`、`themeType`、`currentCategory`、`currentCategoryIndex`
- `historys`（搜索历史）
- `searchText`（搜索文本）
- `token`、`userInfo`
- `routerType`
  - 非移动端返回 `'none'`
  - 移动端返回 `state.app.routerType`

---

## 7. 请求封装与数据返回约定

文件：`src/utils/request.js`

关键点：

- 使用 axios `service = axios.create({ baseURL: import.meta.env.VITE_BASE_API, timeout: 5000, headers })`
- 请求头：
  - Content-Type 固定为 JSON
  - 注入 `Authorization`：
    - 固定包含 `APPCODE 5caf6b27a0614b56b40155be96f68da9`
    - 若存在 `store.getters.token`，会在 Authorization 前追加 `Bearer ${token}`
      - 实际格式示例：`Bearer <token> APPCODE <appcode>`
- 响应拦截：
  - 期望服务端返回结构：`{ msg, result }`
  - `msg === 'ok'` 时返回 `result`
  - 否则 `Promise.reject(new Error(msg))`
- 错误拦截：
  - 若响应 code === 401：触发 `store.dispatch('user/logout')`

因此，若你在实现接口返回值时，需要保持 `{ msg, result }` 结构与 `msg: 'ok'` 约定一致（或者在前端相应调整拦截器）。

---

## 8. `src/api/*`：接口封装（模拟/真实两种写法）

接口模块：

- `src/api/sys.js`
  - `loginUser`、`getProfile`、`putProfile`、`registerUser`、`getCaptcha`、`getSts` 等
  - 当前大多是 `Promise.resolve(...)` 模拟返回；真实 `request` 调用被注释
- `src/api/news.js`
  - `getNewsList`（包含 `add_id`：从 `weburl` 派生 `id`）
  - `getHint`、`getThemes` 等（同样多为模拟）
- `src/api/category.js`
  - `getCategory`：走 `request({ url: '/channel' })`
- `src/api/pay.js`
  - `getVipPayList`、`getAliPay`、`getPayResult` 等（模拟为主）

实现建议：

- 新增接口优先放入对应 `src/api/<域>.js`
- 若接入真实后端，确保接口返回符合 `request.js` 的拦截器格式

---

## 9. 全局 UI 库与组件注册方式

### 9.1 `src/libs/index.js`：自动注册组件

- 通过 `import.meta.glob('./*/index.vue')` 扫描 `src/libs/<组件目录>/index.vue`
- 对每个组件：
  - 组件名：`m-${目录名}`
  - 注册方式：`app.component(componentName, defineAsyncComponent(...))`

### 9.2 `src/libs/message/*`

- 导出方法：`message(type, content, duration)`
- 使用 `h` + `render` 动态渲染到 `document.body`

### 9.3 `src/libs/confirm/*`

- 导出方法：`confirm(title, content, cancelText, confirmText)`
- 返回 Promise，在 `确定` 时 `resolve()`，并提供关闭逻辑

---

## 10. 全局指令与图片懒加载

入口：`src/derectives/index.js`

- 使用 `import.meta.glob('./modules/*.js')` 扫描指令文件
- 指令名取文件名（去掉 `.js` 后缀）

关键指令：`src/derectives/modules/lazy.js`

- 在 `mounted` 时拿到 `img` 的原始 `src`
- 将 `el.src` 临时清空
- 使用 `useIntersectionObserver`：
  - 元素进入视口时恢复 `el.src = imgSrc`
  - 并停止观察

---

## 11. 主题与适配

- `src/utils/flexible.js`
  - `useREM()`：根据屏幕宽度设置 `html font-size`，用于 `rem` 布局
  - `isMobile`：基于 userAgent 正则进行设备类型判断
- `src/utils/theme.js`
  - 监听 `store.getters.themeType`
  - 根据 `THEME_LIGHT / THEME_DARK / THEME_SYSTEM` 修改 `document.documentElement.className`
  - `THEME_SYSTEM` 会订阅系统 `prefers-color-scheme: dark` 变化

---

## 12. 后端：Express 服务

### 12.1 `server/server.js`

- 使用 `express` + `cors` + `express.json()`
- 服务端口：`4000`
- 路由：
  - `/sts`：挂载 `./sts`
  - `/captcha`：
    - 接收 `req.body.behavior`（期望为数组）
    - 基于时间间隔、轨迹长度、标准差与连续性做验证
    - 返回 `{ msg: 'ok' | 'error', result: { success: boolean, message, details } }`

### 12.2 `server/sts.js`

- `GET /sts`
- 依赖环境变量（见文件中 `process.env.*`）：
  - `OSS_BUCKET`、`OSS_REGION`、`OSS_STS_ROLE_ARN`
  - `ALIBABA_CLOUD_ACCESS_KEY_ID`、`ALIBABA_CLOUD_ACCESS_KEY_SECRET`
  - `OSS_STS_DURATION`、`OSS_DIR_PREFIX`（可选）
- 返回结构：
  - `Credentials`（AccessKeyId/Secret/SecurityToken/Expiration）
  - `Bucket`、`Region`、`Dir`
  - `Host`（上传域名）

---

## 13. 构建与代理（Vite）

`vite.config.ts`

- alias：
  - `@` -> `/src`
- svg icon：
  - `iconDirs: ['src/assets/icons']`
  - `symbolId: 'icon-[name]'`
- 代理：
  - `/news` -> `https://jisunews.market.alicloudapi.com`（`changeOrigin: true`）

---

## 14. Tailwind 配置要点

`tailwind.config.js`

- `content: ['./index.html', './src/**/*.{vue,js}']`
- `darkMode: 'class'`
- 自定义字体大小/阴影/高度/颜色
- 使用 `tailwind-scrollbar` 插件

---

## 15. 当你要做“解析/实现”时的推荐工作流

1. 先在本文件中定位“你要改的层级”：路由/组件/状态/接口/请求封装/后端。
2. 再对照代码确认对应文件：
   - 路由：`src/router/modules/*` + `src/views/*`
   - 状态：`src/store/modules/*` + `src/store/getters.js`
   - 接口：`src/api/*` + `src/utils/request.js`
   - UI 能力：`src/libs/*`（message/confirm/其他 index.vue）
   - 指令：`src/derectives/modules/*`
   - 后端：`server/*`
3. 输出实现方案时遵循现有数据流约定：
   - token 注入由 `request.js` 统一处理
   - 拦截器返回约定 `{ msg, result }`（`msg === 'ok'`）
   - 登录鉴权由 `src/permission.js` 处理 `meta.user`

