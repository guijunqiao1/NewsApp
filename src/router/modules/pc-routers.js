//pc端前端路由文件

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/index.vue'),
  }
]