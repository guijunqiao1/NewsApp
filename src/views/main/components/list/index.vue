<template>
  <div class="">
    <div v-for="item in newsList">
      <item-vue :data="item"></item-vue>
    </div>
  </div>
</template>

<script setup>
  import { getNewsList } from '@/api/news'
  //引入新闻项组件
  import itemVue from './item.vue'
  import {ref} from 'vue'
  
  let query = { channel:'头条',nums:10,start:0 };
  const newsList = ref([]);

  const getNewsData = async () => {
    let res = await getNewsList(query);//需要注意此处被响应拦截包装了一层对象，使用result属性访问原值
    newsList.value = res.result.list;
  }
  getNewsData();
</script>

<style lang="scss" scoped></style>