<template>
  <div class="h-full overflow-x-auto bg-white dark:bg-zinc-800 duration-500">
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