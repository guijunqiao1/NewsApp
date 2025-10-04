import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
//引入nodejs内置模块path的content

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 软链接
  resolve: {
    alias: {
      //配置统一路径简写
      '@': join(__dirname, '/src')
    }
  }
})
