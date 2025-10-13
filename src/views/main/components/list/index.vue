<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>

<script setup>
  import { getNewsList } from '@/api/news'
  //引入新闻项组件
  import itemVue from './item.vue'
  import {ref} from 'vue'
  
  let query = { chnnel:'头条',nums:10,start:0 };
  const newsList = ref([]);

  const getNewsData = async () => {
    let res = await getNewsList(query);
    newsList.value = res.list;
  }
  getNewsData();
</script>

<style lang="scss" scoped></style>