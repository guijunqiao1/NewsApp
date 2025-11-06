<template>
  <div
    ref="scroll_all"
    class="fixed left-0 top-0 w-screen h-screen z-20 bg-zinc-200 pb-2 overflow-y-auto xl:p-2"
  >
    <!-- mobile的pins顶部 -->
    <!-- 移动端下展示 navbar -->
    <m-navbar v-if="isMobile" @clickLeft="onPop" @clickRight="onPop" sticky>
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- pc的pins顶部 -->
    <!-- pc 端下展示关闭图标 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>

    <div v-if="!isMobile" style="text-align: center;">《{{ now_item.title }}》</div>
    <!-- 公共内容区 -->
    <div v-if="now_item.title" class="xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <text v-if="isMobile">《{{ now_item.title }}》</text>
      <div 
      class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg bg-white"
      >
        <img
          ref="img_ele"
          :class="style[img_type]"
          :src="now_item.pic"
        />
      </div>
      
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3 overflow-y-auto"
      >
        <!-- pc端独有内容 -->
        <div v-if="!isMobile" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>

          <m-button
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          />
        </div>
        <!-- 原文跳转  -->
        <div class="">
          <m-button
            class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >
            <a :href="now_item.weburl" class="w-full" target="_blank" >点击此处进入原文</a>
          </m-button>
        </div>
        <!-- 具体文本 -->
        <div ref="contentRef" class="content">  
        </div>
        <!-- 类型/来源 -->
        <div class="flex items-center mt-1 px-1">
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            now_item.category
          }}</span>
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            now_item.src
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <scroll-back :isShow="isScrollBackVisible&&isMobile" @backTop="backTop"></scroll-back>
</template>

<script>
  const style = { 
    shu:"h-[100%] mb-2 mx-auto",
    heng:"w-screen mb-2 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
  }
</script>

<script setup>
  import { ref,onMounted, nextTick, watch, onUnmounted } from 'vue'
  import { isMobile } from '@/utils/flexible.js'
  import { useRouter } from 'vue-router'
  import scrollBack from "@/views/main/components/scroll-back/index.vue";

  const props = defineProps({
    now_item: {
        type: Object,
        required: true
    },
    img_type: {
      type:String,
      required:true,
    }
  })

  watch(() => props.img_type, () => {
    console.log("成功传入到pins的obj：",props.now_item);
  }, { deep: true })


  /** 
   * 关闭按钮处理事件
   */
  const router = useRouter()
  const onPop = () => {
    router.back()
  }

  // 使用 ref 直接引用 DOM 元素
  const contentRef = ref(null)

  // 填充内容的函数
  const fillContent = () => {
    nextTick(() => {
      console.log("contentRef:",contentRef.value);
      console.log("props.now_item:",props.now_item);
      
      // 如果 ref 引用失败，尝试使用 querySelector 作为备选方案
      let contentElement = contentRef.value;
      if (!contentElement) {
        contentElement = document.querySelector('.content');
        console.log("备选方案 contentElement:",contentElement);
      }
      
      if (contentElement && props.now_item.content) {
        contentElement.innerHTML = props.now_item.content;
        console.log("成功填充内容");
      } else {
        console.log("填充失败 - contentElement:", !!contentElement, "content:", !!props.now_item.content);
      }
    });
  }

  // 挂载完毕填充实际元素
  onMounted(() => {
    fillContent();
  })

  // 监听 props.now_item 变化，确保内容能及时更新
  watch(() => props.now_item, () => {
    fillContent();
  }, { deep: true })

  const scroll_all = ref();
  const isScrollBackVisible = ref(false);

  function backTop(){
    // 滚动到顶部
    if (scroll_all.value) {
      scroll_all.value.scrollTop = 0;
    }
  }

  // 监听滚动事件
  const handleScroll = () => {
    if (!scroll_all.value) return;
    
    const scrollTop = scroll_all.value.scrollTop;
    const scrollHeight = scroll_all.value.scrollHeight;
    const clientHeight = scroll_all.value.clientHeight;
    
    // 当滚动超过一半时显示回到顶部按钮
    const shouldShow = scrollTop > (scrollHeight - clientHeight) / 2;
  
    isScrollBackVisible.value = shouldShow;
  }

  // 在组件挂载后添加滚动监听
  onMounted(() => {
    if (scroll_all.value) {
      scroll_all.value.addEventListener('scroll', handleScroll);
    }
  })

  // 组件卸载时清理事件监听器
  onUnmounted(() => {
    if (scroll_all.value) {
      scroll_all.value.removeEventListener('scroll', handleScroll);
    }
  })


</script>