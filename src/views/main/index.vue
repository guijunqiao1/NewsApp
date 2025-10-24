<template>
  <!-- 利用tailwind插件添加上该元素身上的滚动条设计 -->
  <div
    class="h-full bg-white dark:bg-zinc-800 duration-500 xl:scrollbar-thin xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <navigation></navigation>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
      <list-vue></list-vue>
    </div>
    <!-- 移动端的 -->
    <m-trigger-menu
      v-if="isMobile"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<script setup>
  import navigation from "./components/navigation/index.vue";
  import listVue from "./components/list/index.vue";
  import { isMobile } from '@/utils/flexible'
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { ref, onActivated } from 'vue'
  import { useScroll } from '@vueuse/core'


  const store = useStore()
  const router = useRouter()


  /**
   * 我的按钮点击事件
   */
  const onMyClick = () => {
    store.commit('app/changeRouterType', 'push');//修改此次路由操作为push
    // 配置跳转方式
    if (store.getters.token) {//存在登陆标识
      router.push('/profile')
    } else {
      router.push('/login')
    }
  }



  /**
   * 记录页面滚动位置
   */
  const containerTarget = ref(null)
  const { y: containerTargetScrollY } = useScroll(containerTarget);//需要注意此处获取的是整个框架的scroll响应值
  // 被缓存的组件再次可见，会回调 onActivated 方法
  // 补充解释：onActivated 钩子是 Vue 3 中 组合式 API 提供的一个生命周期钩子，主要用于组件被 <keep-alive> 激活时触发。
  onActivated(() => {//以前缓存过即进行下方操作
    if (!containerTarget.value) {//还没渲染框架就算了
      return
    }
    // 跳转
    containerTarget.value.scrollTop = containerTargetScrollY.value;//此处跳转发生在路由缓存被激活回来的时候
  })



  /**
   * VIP 按钮点击事件
   */
  const onVipClick = () => {
    // 配置跳转方式
    store.commit('app/changeRouterType', 'push')
    router.push('/member')
  }

</script>