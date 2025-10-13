<template>
  <!-- 头部框架--添加过渡动画持续时间 -->
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500" 
  >
    <div class="flex items-center">
      <img
        v-lazy
        src="@/assets/icons/news.svg"
        class="h-4 cursor-pointer mr-2 guide-home"
        @click="to_Home"
      />
      <header-search></header-search>
      <header-theme></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
  import headerMy from './header-my.vue'
  import headerTheme from './header-theme.vue'
  import headerSearch from './header-search.vue'
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