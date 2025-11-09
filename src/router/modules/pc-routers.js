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
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          // 路由元信息配置用于提示只有用户登录后才可进入，本身仅起到进行跳转的时候的to对象的user属性的挂载
          user: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/register/index.vue')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
    meta: {
      user: true // 需要登录才可以访问
    }
  },
  {
    path: '/pay/result',
    name: 'payResult',
    component: () => import('@/views/pay/index.vue'),
    meta: {
      user: true
    }
  }
]


//此处补充转移独立路由为子路由的原因：
// layout/index.vue 里：
// <template>
//   <div class="layout">
//     <Navbar />
//     <Sidebar />
//     <!-- 子路由在这里显示 -->
//     <router-view />
//   </div>
// </template>
// <router-view /> 会渲染当前匹配的子路由组件。

// 所以当你访问：
// / → 显示 Layout + Main
// /profile → 显示 Layout + Profile

// 即后续路径决定router-view的指向