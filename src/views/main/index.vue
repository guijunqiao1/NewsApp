<template>
  <!-- 利用tailwind插件添加上该元素身上的滚动条设计 -->
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 xl:scrollbar-thin xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation></navigation>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
      <list-vue></list-vue>
    </div>
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

</script>