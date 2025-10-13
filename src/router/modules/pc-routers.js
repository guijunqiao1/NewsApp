//pc端前端路由文件

export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    // 嵌套子路由
    // 此处的匹配顺序为：layout中的main-vue组件中的router-view直接被子路由命中并且渲染其中的navigation组件，最终匹配上pc-navigation的index.vue
    // 注意：此处还配置上了path的作用在于若存在多个与router-view匹配的组件则依据当前实际url进行匹配嵌入
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
  }
]