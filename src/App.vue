<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <router-view></router-view>
  </div>
</template>

<script setup>
  //需要注意此处若script中的内容执行出错会导致挂载到#app的操作失败(中断)
  import { isMobile } from './utils/flexible';

</script>