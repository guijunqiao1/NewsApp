<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <m-transition-router-view
      mainComponentName="home"
      :routerType="store.getters.routerType"
    ></m-transition-router-view>
  </div>

</template>

<script setup>
  import { useStore } from 'vuex';
  //需要注意此处若script中的内容执行出错会导致挂载到#app的操作失败(中断)
  const store = useStore();


</script>