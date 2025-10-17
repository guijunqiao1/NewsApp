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
      :column="isMobile ? 2 : 5"
      :picturePreReading="false"
      :rowSpacing="10"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width" @click="onToPins(item)" ></item-vue>
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
  import { ref,watch } from 'vue'
  //引入储存库对象
  // import store from '@/store';
  import { useStore } from "vuex";
  // 需要注意此处获取的库对象是非响应式的，只能当前影响到stroe中，其他地方的影响此处无法察觉，而import { useStore } from "vuex",const store = useStore()的方式获取到的是响应式的store对象，
  //其实也可以在每次使用前来一次import('@/stote')的方式等价

  const store = useStore();

  console.log("挂载list成功");
  
  // 数据是否在加载中
  const loading = ref(false)
  // 数据是否全部加载完成
  const isFinished = ref(false)

  let query = { start: 0, nums: 10, channel:'头条' };

  /**
   * 通过重置quer有，重新发起请求
   */
  const resetQuery = (newQuery) => {
    query = { ...query, ...newQuery };//此处利用对象合并取后value的技巧
    // 重置状态
    isFinished.value = false
    // waterfall 会监听数据变化，重新渲染布局
    newsList.value = []
  }
  // 监听 currentCategory 变化
  watch(
    () => store.getters.currentCategory,
    (currentCategory) => {
      resetQuery({ start: 0, channel: currentCategory.name })
    }
  )

  // 监听搜索内容项的变化
  watch(
    () => store.getters.searchText,
    (val) => {
      // 重置请求参数
      resetQuery({
        start: 0,
        searchText: val
      })
    }
  )


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


  /**
   * 进入 pins
   */
  const onToPins = (item) => {
    history.pushState(null, null, `/pins/${item.id}`)

    // api信息补充：
    // history.pushState(state, title, url)
    // state：一个与新历史记录条目关联的 状态对象（可以是任意可序列化的 JS 对象）。
    // title：目前大多数浏览器会忽略该参数，通常传 null 即可。
    // url：要显示在地址栏的新 URL（必须与当前源同域）。
    // 功能：
    // 在不重新加载页面的情况下，将一个新的记录压入浏览器的历史栈，并改变地址栏显示的 URL。
  }
</script>

<style lang="scss" scoped></style>