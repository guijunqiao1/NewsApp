<!-- 布局文件初始化  -->
<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
  // 独立引入布局组件--注意和通用功能组件的全局注册进行区分
  import headerVue from './components/header/header.vue'
  import floatingVue from './components/floating/floating.vue'
  import mainVue from './components/main.vue'

</script>

<style lang="scss" scoped>

</style>