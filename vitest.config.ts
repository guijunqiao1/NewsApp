import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// ESM 兼容的 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'src/**/*_test.{js,ts,jsx,tsx}'],
    // 设置超时时间
    testTimeout: 10000,
    // 使用 setup 文件初始化环境
    setupFiles: ['./vitest.setup.ts'],
    // 使用 forks 模式以避免某些兼容性问题
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  // 优化依赖处理
  optimizeDeps: {
    exclude: ['jsdom'],
  },
})