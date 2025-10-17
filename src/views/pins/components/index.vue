<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20  xl:backdrop-blur-3xl xl:bg-transparent bg-white pb-2 overflow-y-auto xl:p-2"
  >
    <!-- mobile的pins顶部 -->
    <!-- 移动端下展示 navbar -->
    <m-navbar v-if="isMobile" @clickLeft="onPop" @clickRight="onPop" sticky>
      {{ now_item.title }}
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


    <!-- 公共内容区 -->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="now_item.pic"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
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
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ now_item.title }}
        </p>
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
</template>

<script setup>
  import { ref } from 'vue'
  import { isMobile } from '@/utils/flexible.js'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    now_item: {
        type: Object,
        required: true
    }
  })

  console.log("成功传入到pins的obj：",props.now_item);

  /** 
   * 关闭按钮处理事件
   */
  const router = useRouter()
  const onPop = () => {
    router.back()
  }

</script>