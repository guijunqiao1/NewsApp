<template>
  <!-- 头部框架 -->
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        src="@/assets/icons/news.svg"
        class="h-4 cursor-pointer mr-2 guide-home"
        @click="toHome"
      />
      <header-search-vue></header-search-vue>
      <header-theme-vue></header-theme-vue>
      <header-my-vue></header-my-vue>
    </div>
  </div>
</template>

<script>
  import headerMyVue from './header-my.vue'
  import headerThemeVue from './header-theme.vue'
  import headerSearchVue from './header-search.vue'
  import { useRouter } from 'vue-router'


  const router = useRouter();//首部路由切换图标方法存放对象的获取

  const to_Home = ()=>{
    console.log("go home");
    router.push('/');
    // '@/views/layout/index.vue'--与home组建对应
  }


</script>

<style lang="scss">



</style>