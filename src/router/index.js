//前端组件路由框架文件

import { createRouter, createWebHistory } from 'vue-router'
import { isMobile } from '@/utils/flexible'
import mobileRoutes from './modules/mobile-routers'
import pcRoutes from './modules/pc-routers'

// 创建vueRouter实例
const router = createRouter({
  //启用history的url显示模式
  history: createWebHistory(),
  routes:isMobile.value ? mobileRoutes : pcRoutes
})

export default router
