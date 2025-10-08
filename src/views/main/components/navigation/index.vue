<template>
  <mobile-navigation-vue v-if="isMobile"></mobile-navigation-vue>
  <pc-navigation-vue v-else :data="categoryData" ></pc-navigation-vue>
</template>

<script setup>
  import { isMobile } from '@/utils/flexible';
  import mobileNavigationVue from './mobile/index.vue';
  import pcNavigationVue from './pc/index.vue';
  import { getCategory } from "@/api/category.js";
  import { ref } from "vue";

  //定义分类列表响应式变量
  const categoryData = ref([]);
  //自定义分类获取方法(封装ajax,省的直接调用getCategory需要async\await以及当前响应式变量的赋值)
  const getCategoryData = async () => {
    const result = await getCategory();//解构取参
    categoryData.value = result;
    console.log(categoryData);
  }
  getCategoryData();//主动获取一次分类列表


  
</script>

<style lang="scss" scoped>

</style>