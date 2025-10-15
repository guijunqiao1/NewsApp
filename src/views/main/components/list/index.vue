<!-- 注意此处的插槽的用法：使用即将插入到的插槽本身所携带的item,width属性进行内容的进一步扩展 -->
<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getNewsData"
    >
    <m-waterfall
      class="p-1 w-full"
      :data="newsList"
      nodeKey="id"
      :column="isMobile ? 2 : 4"
      :picturePreReading="true"
      :rowSpacing="10"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
  import { isMobile } from "@/utils/flexible"
  import { getNewsList } from '@/api/news'
  //引入新闻项组件
  import itemVue from './item.vue'
  import {ref} from 'vue'

  console.log("挂载list成功");
  
  // 数据是否在加载中
  const loading = ref(false)
  // 数据是否全部加载完成
  const isFinished = ref(false)

  let query = { start: 0, nums: 20, channel:'头条' };
  // 数据源  
  const newsList = ref([]);

  const getNewsData = async () => {
    console.log("此时需要更新数据");
    if (isFinished.value) return;
    // 让 page/start页数记录 自增
    query.start++;
    let res = await getNewsList(query);//需要注意此处被响应拦截包装了一层对象，使用result属性访问原值
    newsList.value.push(...res.result.list)
    console.log("newsList:",newsList.value);
    // 判断是否全部加载完成
    if (newsList.value.length === res.result.num) {
      isFinished.value = true
    }
    loading.value = false
  }
</script>

<style lang="scss" scoped></style>