# NewsApp 面试说辞（按简历要点逐条）

## 0. 项目一句话（可选开场）
本项目是一个通用型前端工程：基于 `Vue3 + Vite + TailwindCSS`，集成了多前台业务模型实现方案（约 42 种）与中台通用组件物料库（约 15~16 个），并通过 `SVG 图标 / 全局组件 / 全局指令 / 多套路由表` 的自动化注册与移动端动效体系，提升开发效率与交互体验。

涉及的关键技术：`Vue Router + Vuex`（鉴权与状态）、`vueuse`（滚动/全屏/IntersectionObserver 等能力）、`vee-validate`（表单校验）、`GSAP`（过渡动效）、`Cropperjs`（头像裁切）、`ali-oss` + STS（上传）、以及 `driver.js`（新手引导）。

---

## 1. Vite 体系化：多套路由表 + SVG 图标/通用组件/指令自动化注册
- **遇到的问题**：在 PC/H5 差异明显的业务里，路由既要区分入口与页面布局，又要统一鉴权逻辑；同时 SVG 图标、UI 组件、全局指令如果全靠手动注册，容易遗漏、命名不一致、维护成本高。
- **选择方案的抉择**：在“单一路由表 + 分支判断”与“两套路由表（PC/移动端）”之间做权衡；在“显式 import/注册”与“利用 Vite 的 `import.meta.glob` 自动扫描注册”之间做权衡。
- **为什么选择这个方案**：当前工程采用 `src/router/index.js` 根据 `src/utils/flexible.js` 的 `isMobile` 在 `pcRoutes/mobileRoutes` 间切换，能把差异收敛到路由层；同时通过 `vite-plugin-svg-icons` 生成 symbol 并在 `src/main.js` 引入 `virtual:svg-icons-register`，再用 `src/libs/index.js`、`src/derectives/index.js` 的 glob 扫描实现全局自动注册，避免重复劳动并保证命名约定（如 `m-<name>`）。
- **这个方案的用法**：
  - 路由：`src/router/index.js` 中 `routes: isMobile.value ? mobileRoutes : pcRoutes`
  - SVG：`vite.config.ts` 配置 `iconDirs` 与 `symbolId: 'icon-[name]'`，`src/main.js` 引入 `virtual:svg-icons-register`
  - 通用组件：新增 `src/libs/<name>/index.vue`，由 `src/libs/index.js` 自动注册为全局组件 `m-<name>`
  - 全局指令：在 `src/derectives/modules/*.js` 新增指令文件，由 `src/derectives/index.js` 自动注册
- **带来的收益**：降低“手动注册遗漏”的概率；路由差异集中管理；新增组件/指令只关注能力本身，不用重复写注册胶水代码，从而提升交付速度与可维护性。
- **反向观看（优缺点）**：
  - 优点：约束清晰、扩展成本低、团队协作时更易对齐工程约定
  - 缺点：自动化依赖目录/命名约定，调试时需要定位到 glob 扫描逻辑；两套路由表会让路由结构更复杂，需要保证鉴权 `meta.user` 规则一致

---

## 2. 物料库化：16 个中台通用组件（Infinite/Waterfall/Popup/Popover/Confirm/Dialog/Countdown 等）
- **遇到的问题**：业务页面需要大量“可复用交互能力”（分页加载、瀑布流、弹层确认/对话、倒计时等），如果每个页面都重新实现，会导致交互风格不一致、Bug 重复出现。
- **选择方案的抉择**：在“页面内实现一次性逻辑”与“抽象为可配置组件 + 统一事件/props 规范”之间做选择；同时希望组件支持移动端/PC 共用能力。
- **为什么选择这个方案**：本项目的通用能力集中在 `src/libs/*`，并通过 `src/libs/index.js` 自动全局注册，能让业务侧以标准方式直接使用（减少样板代码与风格漂移）。例如核心加载能力通过 `m-infinite` + `m-waterfall` 组合完成长列表渲染。
- **这个方案的用法**：
  - 无限加载：`src/libs/infinite/index.vue` 内用 `useIntersectionObserver` 触发 `onLoad`，对外暴露 `v-model`（loading）与 `isFinished`
  - 瀑布流：`src/libs/waterfall/index.vue` 接收 `:data`、`:column`、`:rowSpacing`，并通过 slot 让业务渲染 `item-vue`
  - 弹层类能力（Popup/Popover/Confirm/Dialog）遵循统一的 `v-model`/Promise/事件输出方式（例如 `Confirm/Dialog` 通常提供确定/关闭行为）
- **带来的收益**：显著减少重复实现，统一交互体验；通过组件化把复杂度下沉，让业务页面更聚焦业务数据流。
- **反向观看（优缺点）**：
  - 优点：复用性强、可维护、统一交互风格
  - 缺点：组件抽象前期成本更高，需要明确 props/事件规范；复杂组件（如瀑布流）若配置不当，性能优化与边界问题排查会更费时间

---

## 3. 性能难点：瀑布流卡顿 + 图片加载慢（首屏长列表 + 懒加载 + 渐进式预读）
- **遇到的问题**：瀑布流场景中如果“一次渲染全量图片 + 立即计算布局”，会造成主线程阻塞、滚动不连贯；同时图片资源若不延迟加载，会拖慢首屏与渲染稳定性。
- **选择方案的抉择**：在“先渲染后计算高度”与“图片预读后再布局”之间权衡；在“直接加载所有图片”与“IntersectionObserver 懒加载”之间做取舍。
- **为什么选择这个方案**：
  - 通过 `<m-infinite>` 控制“可视区域触发的增量请求”，避免长列表一次性膨胀
  - 通过 `<m-waterfall>` 支持 `picturePreReading`：当开启预读时会在 `waitImgComplate()` 中预加载图片，确保拿到正确高度再计算定位，降低布局抖动
  - 通过全局指令 `v-lazy`，让图片进入视口后才替换 `src`，减少首屏网络与渲染负担
- **这个方案的用法**：
  - 列表组合：`src/views/main/components/list/index.vue` 用 `<m-infinite>` 包裹 `<m-waterfall>`
  - 懒加载：`src/derectives/modules/lazy.js` 在 `mounted` 里用 `useIntersectionObserver` 把 `img.src` 从 `''` 延迟到可见时恢复
  - 瀑布流布局策略：`src/libs/waterfall/index.vue` 的 `picturePreReading` 决定走 `waitImgComplate()`（预读）还是直接 `useItemHeight()`（非预读）
- **带来的收益**：以实际对比指标为目标，线上表现为：正常浏览下堆内存同比减少约 `35%`；平均 `FCP` 降到 `1s` 左右；`Lighthouse` 分数同比提升约 `33%`（具体数值以当时对比周期为准）。
- **反向观看（优缺点）**：
  - 优点：减少首屏阻塞、降低布局抖动、提升滚动稳定性
  - 缺点：预读图片会增加一部分额外网络与计算开销；懒加载引入 IntersectionObserver，极端场景（比如快速滚动或低端设备）需要关注触发频率与资源缓存策略

---

## 4. 登录架构：SliderCaptcha 行为验证 + VeeValidate 校验 + 鉴权
- **遇到的问题**：仅靠表单校验无法抵抗自动化攻击；登录流程需要在“输入校验通过后”再进行人类行为验证，并把验证结果与登录鉴权打通。
- **选择方案的抉择**：在“纯前端表单校验”与“行为验证 + 表单校验组合”之间选择；在“验证码内部校验”与“把验证行为上报后由后端校验”的方案之间做权衡。
- **为什么选择这个方案**：
  - 行为验证：使用 `slidercaptcha`（`src/views/login-register/login/slider-captcha.vue`）在拼图成功后调用 `src/api/sys.js` 的 `getCaptcha()`，由 Express 后端 `/captcha` 做轨迹/行为分析（本仓库已有 `server/server.js` 相关路由）
  - 表单校验：登录表单使用 `vee-validate` 的 `<vee-form> / <vee-field> / <vee-error-message>`，并通过 `src/views/login-register/validate.js` 提供 `validateUsername/validatePassword`
  - 鉴权：路由层通过 `meta.user` + `src/permission.js` 在全局 beforeEach 做守卫；token 来自 Vuex（`src/store/modules/user.js`）并由请求层在 `src/utils/request.js` 处理（401 触发 logout）
- **这个方案的用法**：
  - 表单：`src/views/login-register/login/index.vue` 中 `:rules="validateUsername/validatePassword"`，并在提交回调 `onLoginHandler` 后弹出 `slider-captcha`
  - 行为验证：`slider-captcha.vue` 的 `onSuccess(arr)` 调 `getCaptcha({ behavior: arr })`；验证成功触发 `@success="onCaptchaSuccess"`
  - 鉴权：`src/permission.js`：`if (to.meta.user) && !store.getters.token -> message + return '/'`
- **带来的收益**：登录链路更安全、更可控；把“行为验证”与“业务登录态/页面鉴权”解耦，后续扩展其他验证码或增强策略成本更低。
- **反向观看（优缺点）**：
  - 优点：安全性更高，且工程上把校验分层（表单校验 vs 行为验证 vs 鉴权）
  - 缺点：行为验证引入额外异步步骤，可能影响极端情况下的首次登录体验；若后端验证码接口返回/超时策略不合理，可能导致用户等待或失败率升高

---

## 5. 头像裁切与上传：Cropperjs（PC/移动端差异）+ ali-oss + STS 更新用户信息
- **遇到的问题**：头像裁切需要兼顾 PC 与 H5 的交互差异；同时如果直接在前端使用 OSS 的长期密钥风险很高，所以需要临时凭证机制。
- **选择方案的抉择**：在“使用简单的固定裁剪”与“可交互裁切体验”之间做选择；在“前端直连 OSS 密钥”与“STS 临时凭证”之间做选择。
- **为什么选择这个方案**：
  - Cropperjs：`src/views/profile/components/change-avatar.vue` 中根据 `isMobile` 切换 `mobileOptions` 与 `pcOptions`（例如移动端固定裁剪框比率、禁用调整框）
  - OSS 安全上传：通过 `server/sts.js` 提供 STS 临时凭证，前端在 `src/utils/sts.js` 的 `getOSSClient()` 中用 `ali-oss` 初始化 client，然后 `ossClient.put('images/<fileName>', blob)`
  - 更新用户态：上传成功后触发 `putProfile` 更新服务端与 Vuex 用户信息
- **这个方案的用法**：
  - 裁切：`cropper.getCroppedCanvas().toBlob(...)`
  - 上传：`src/utils/sts.js` -> `getSts()` -> `new OSS({ accessKeyId/accessKeySecret/stsToken, bucket, refreshSTSToken })`
  - 更新：`store.commit('user/setUserInfo', { ... , avatar })` + `await putProfile(store.getters.userInfo)`
- **带来的收益**：用户体验更一致（PC/移动端裁切策略不同但结果一致）；上传链路更安全（STS 替代长期密钥）。
- **反向观看（优缺点）**：
  - 优点：安全合规、工程可维护、交互体验可控
  - 缺点：STS 每次请求会带来一次额外网络延迟；上传过程中如果 blob 太大或网络波动，需要做好进度/重试策略

---

## 6. 移动端路由动效：虚拟任务栈缓存页面 + 记录滚动位置实现“丝滑切换”
- **遇到的问题**：移动端页面切换时，如果每次都销毁/重建页面，滚动位置丢失、动画无法平滑衔接，用户会感知到明显卡顿。
- **选择方案的抉择**：在“每次切换直接渲染新页面”与“保留页面缓存并能按导航栈管理”之间做选择；同时要兼顾 push/back 两种路由方向。
- **为什么选择这个方案**：项目里将缓存与动效统一到 `src/libs/transition-router-view/index.vue`：用 `keep-alive` + “虚拟任务栈” `virtualTaskStack` 控制哪些路由组件保持缓存；再在首页组件 `src/views/main/index.vue` 的 `onActivated` 中用 `useScroll(containerTarget)` 恢复 `scrollTop`，保证 back/push 之后视口状态一致。
- **这个方案的用法**：
  - 虚拟任务栈：`virtualTaskStack.value.push(to.name)` / `pop()`，并通过 `keep-alive :include="virtualTaskStack"`
  - 恢复滚动：`src/views/main/index.vue` 的 `onActivated(() => containerTarget.value.scrollTop = containerTargetScrollY.value)`
  - push/back 动效：`transition-router-view/index.vue` 内定义 `push-in/push-out/back-in/back-out` 对应动画
  - 动效触发：由 Vuex `app/changeRouterType` 控制 `routerType`（push/back/none）
- **带来的收益**：H5 页面切换过程更流畅；滚动位置不丢失，让用户“感觉像原生 App”的导航体验。
- **反向观看（优缺点）**：
  - 优点：体验效果显著，且缓存策略可被导航栈精细控制
  - 缺点：缓存会占用内存，需要控制缓存规模/清理策略（例如切回 main 时 `clearTask()`）；复杂栈场景下调试难度会提升

---

## 7. 第三方模块：QQ/微信扫码登录、支付宝支付、微博分享、兔小巢反馈
- **遇到的问题**：第三方能力接入通常涉及跨域脚本、回调落地页、不同平台（PC/H5）跳转行为差异，容易造成登录态与业务流程不一致。
- **选择方案的抉择**：在“每个平台单独写一套流程”与“统一抽象回调数据 -> 统一登录入口”的方案之间权衡。
- **为什么选择这个方案**：项目采用 `oauthLogin` 统一处理第三方登录结果：`src/views/login-register/login/oauth.js` 把 `oauthType + oauthData` 归一化后派发 `user/login`；如果返回“未注册码”（如 `LOGIN_TYPE_OAUTH_NO_REGISTER_CODE`），再跳转注册页并把第三方信息带入注册表单（`router.push({ path:'/register', query:{...}})`）。
- **这个方案的用法**：
  - QQ 扫码登录：`index.html` 引入 QQ SDK；落地在 `src/views/login-register/login/qq-login.vue`（监听 QC.Login、解析 `access_token`、通过 `brodacast` 跨页面传输后调用 `oauthLogin`）
  - 支付宝支付：`src/views/member/components/payment/*` 根据 `isMobile` 展示不同支付入口，触发 `src/utils/pay.js` 的 `alipay()`，再由 `src/api/pay.js` 生成跳转参数并 `window.location.href` 前往支付结果页
  - 微博分享：`index.html` 引入微博分享脚本；业务侧在 `src/views/main/components/list/item.vue` 调用 `weiboShare(imgUrl, path)`（`src/utils/share.js` 拼接微博分享 URL 并打开新窗口）
  - 兔小巢反馈：`src/constants/index.js` 定义 `FEEDBACK_URL`；`src/views/layout/components/floating/floating.vue` 中点击“立即吐槽”通过 `window.open(FEEDBACK_URL, '_blank')`
  - 微信扫码登录：当前仓库在 UI 层预留了微信入口（`src/views/login-register/login/index.vue`），并可复用同一套 `oauthLogin` 抽象扩展到具体实现
- **带来的收益**：第三方登录/支付/分享/反馈在工程上“流程归一”，后续新增 Provider（如微信）只需要实现 Provider 回调数据适配，而不是重写登录主链路。
- **反向观看（优缺点）**：
  - 优点：统一入口降低维护成本、减少状态不一致
  - 缺点：Provider SDK/回调落地策略差异很大时，需要做适配层；同时跨窗口/跨页面通信（如 QQ 的 `brodacast`）要更严格处理时序与异常

---

## 8. 特别功能：明暗主题切换 + 新手引导 + 文件下载 + 指定 DOM 全屏 + GSAP 动画
- **遇到的问题**：产品需要在“视觉风格一致性”和“交互引导/高频操作”上同时满足要求：主题切换要全局一致；引导要不打断主要操作；图片下载与全屏要简单可靠；过渡动效要可控且不丢帧。
- **选择方案的抉择**：在“手写引导/动画”与“基于成熟库（driver.js、GSAP、vueuse）封装能力”之间做权衡。
- **为什么选择这个方案**：
  - 主题切换：通过 `dark` class（Tailwind `darkMode: 'class'`）与 `src/utils/theme.js` 监听 `themeType`，由 Vuex 驱动更新
  - 新手引导：用 `driver.js` 在 `src/views/layout/components/floating/floating.vue` 定义引导步骤（`src/views/layout/components/floating/steps.js`）
  - 下载与全屏：图片 item 使用 `file-saver` 下载（`src/views/main/components/list/item.vue`），全屏使用 `useFullscreen`（VueUse）
  - GSAP：在瀑布流详情（pins）过渡中用 `gsap.set/to` 配合 `<transition :css="false">` 完成从卡片到详情的动画
- **这个方案的用法**：
  - 主题：`header-theme` 等 UI 触发 Vuex `themeType`；`src/utils/theme.js` 订阅系统 dark/light（system 模式）
  - 引导：点击引导入口调用 `driver.defineSteps(steps); driver.start()`
  - 下载：`fetch(imgUrl).then(res=>res.blob()).then(blob=>saveAs(blob, props.data.pic))`
  - 全屏：`const { enter } = useFullscreen(imgTarget)`，在点击“全屏”按钮后触发
  - GSAP：`src/views/main/components/list/index.vue` 在 `beforeEnter/enter/leave` 中分别 `gsap.set` 与 `gsap.to`，并在 `onComplete: done` 通知 Vue 过渡结束
- **带来的收益**：提升可用性（引导与反馈）、提升用户体验（全屏/下载/动效），并让动画与 UI 状态有明确生命周期控制。
- **反向观看（优缺点）**：
  - 优点：依托成熟库，减少实现风险；动画生命周期明确（done 回调）
  - 缺点：引入第三方库后，包体积与调试成本上升；GSAP/Driver 需要注意在低端设备上的性能与交互可达性

---

## 9. CICD 双方案：传统 SCP 部署（已落地）+ 容器化方案（Dockerfile 支撑）
- **遇到的问题**：CI/CD 需要在“主分支质量保证（lint/test/build）”与“部署稳定性（可重复、可回滚）”之间平衡；同时希望支持不同部署形态（裸机/容器）。
- **选择方案的抉择**：在“直接上传构建产物到 ECS（SCP）”与“构建镜像推送容器仓库（registry）”之间做取舍。
- **为什么选择这个方案**：
  - 传统 SCP：当前仓库的 `./.github/workflows/main.yml` 已实现从 `npm ci -> vitest -> build -> tar/dist -> scp 到 ECS -> 远端解压并配置 Nginx` 的完整链路
  - 容器化准备：仓库提供 `Dockerfile`（多阶段构建，把 `dist` 复制到 `nginx` 镜像），以及 `deploy/nginx.conf`，能直接用于镜像化部署
- **这个方案的用法**：
  - 传统 SCP：`main.yml` 中的 `build_and_compress` + `deploy` job，关键步骤包括 `tar -czf dist.tar.gz dist/`、并用 SSH/SCP 上传到 ECS，再解压到 `DEPLOY_DIR` 并重载 Nginx
  - 容器化：使用现有 `Dockerfile` 可在 CI 中构建镜像，然后 push 到容器仓库；运行端只需拉镜像并映射 Nginx 端口
- **带来的收益**：稳定交付主分支；SCP 方案更直观、落地快；容器化方案更利于标准化部署与环境一致性。
- **反向观看（优缺点）**：
  - SCP 优点：实现简单、依赖少、快速落地
  - SCP 缺点：产物部署链路与环境耦合更强，不如镜像天然可回滚
  - 容器化优点：标准化、回滚路径清晰、可扩展到更多环境
  - 容器化缺点：镜像构建/推送步骤多，配置成本更高

