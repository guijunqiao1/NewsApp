import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
//引入nodejs内置模块path的content
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ],
  // 软链接
  resolve: {
    alias: {
      //配置统一路径简写
      '@': join(__dirname, '/src')
    }
  },
  // 代理配置
  server: {
    proxy: {
      //注意巧用vite配置规则（替换后的整体仍然存在）
      '/news': {
        target: 'https://jisunews.market.alicloudapi.com',
        changeOrigin: true,
      }
    }
  }
})
