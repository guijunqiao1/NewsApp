<template>
  <!-- 利用tailwind插件添加上该元素身上的滚动条设计 -->
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation></navigation>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
      <list-vue></list-vue>
    </div>
  </div>
</template>

<script setup>
  import navigation from "./components/navigation/index.vue";
  //应用瀑布流架构
  import listVue from './components/list/index.vue'


</script>