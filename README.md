# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

### GitHub Actions 部署到 ECS

流水线在 push 到 `main`/`master` 时会构建并 SCP 上传到 ECS。若出现 **"can't connect without a private SSH key or password"**，说明未配置或未正确配置仓库 Secrets。

请在 **仓库 → Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 说明 |
|------------|------|
| `ECS_HOST` | ECS 公网 IP 或域名 |
| `ECS_USER` | SSH 登录用户名 |
| `ECS_SSH_PRIVATE_KEY` | SSH 私钥**完整内容**（含 `-----BEGIN ... PRIVATE KEY-----` 与 `-----END ... PRIVATE KEY-----` 行，无多余首尾空格/空行） |

配置完成后重新跑对应 workflow 即可。
