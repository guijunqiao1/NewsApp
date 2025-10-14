<template>
  <div class="">
    <m-waterfall :data="newsList" nodeKey="id" :column="2" :picturePreReading="true">
      <!-- 注意此处的插槽的用法：使用即将插入到的插槽本身所携带的item,width属性进行内容的进一步扩展 -->
      <template v-slot="{ item, width }">
        <item-vue :data="item"></item-vue>
      </template>
    </m-waterfall>
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