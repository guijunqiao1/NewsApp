<template>
  <mobile-navigation-vue v-if="isMobile"></mobile-navigation-vue>
  <pc-navigation-vue v-else="isMobile"></pc-navigation-vue>
</template>

<script setup>
  import { isMobile } from '@/utils/flexible';
  import mobileNavigationVue from './mobile/index.vue'
  import pcNavigationVue from './pc/index.vue'

  
</script>

<style lang="scss" scoped>

</style>