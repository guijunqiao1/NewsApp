//移动端前端路由文件

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue'),
  }
]