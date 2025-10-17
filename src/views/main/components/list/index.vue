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
    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :now_item="currentPins" />
    </transition>
  </div>
</template>

<script setup>
  import pinsVue from "@/views/pins/components/index.vue";
  import { isMobile } from "@/utils/flexible"
  import { getNewsList } from '@/api/news'
  //引入新闻项组件
  import itemVue from './item.vue'
  import { ref,watch } from 'vue'
  import gsap from 'gsap'
  import { useEventListener } from '@vueuse/core'
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

  // 控制 pins 展示
  const isVisiblePins = ref(false)
  // 当前选中的 pins 属性
  const currentPins = ref({})

  /**
   * 进入 pins
   */
  const onToPins = (item) => {//注意和item.vue中该方法不传参的情况进行区分
    console.log("触发的是list的topins")
    console.log('itemitem:',item);
    history.pushState(null, null, `/pins/${item.id}`)

    // api信息补充：
    // history.pushState(state, title, url)
    // state：一个与新历史记录条目关联的 状态对象（可以是任意可序列化的 JS 对象）。
    // title：目前大多数浏览器会忽略该参数，通常传 null 即可。
    // url：要显示在地址栏的新 URL（必须与当前源同域）。
    // 功能：
    // 在不重新加载页面的情况下，将一个新的记录压入浏览器的历史栈，并改变地址栏显示的 URL。
    // 和实际网页的回退存在细微的区别此方式需要手动修改回触发当前topins的一系列操作，而实际网页则自动回退

    currentPins.value = item
    isVisiblePins.value = true
  }


  // 开始手动回退到原状态

  /**
   * 监听浏览器后退按钮事件
   */
  useEventListener(window, 'popstate', () => {
    isVisiblePins.value = false
  })

  // 为过渡组件钩子绑定上回调

  const beforeEnter = (el) => {
    //需要注意的是el绑定的是实际参与过渡的element--实际为transition组件中的整体内容，恰好与gsap需要绑定的target相同

    //下方gsap动画解释：
    // 瞬间设置样式，不产生动画。作为进入动画的起点。
    gsap.set(el, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: '0 0',
      translateX: currentPins.value.location?.translateX,
      translateY: currentPins.value.location?.translateY,
      opacity: 0
    })
  }
  const enter = (el, done) => {
    // gsap.to：从当前状态补间到目标状态。
    gsap.to(el, {
      duration: 0.5,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      translateX: 0,
      translateY: 0,
      onComplete: done
    })
    //onComplete: done：非常关键，通知 Vue 过渡已结束，否则 <transition> 不知道何时收尾。
  }
  const leave = (el, done) => {
    gsap.to(el, {
      duration: 0.5,
      scaleX: 0,
      scaleY: 0,
      x: currentPins.value.location?.translateX,
      y: currentPins.value.location?.translateY,
      opacity: 0,
      onComplete: done
    })
  }


</script>

<style lang="scss" scoped></style>