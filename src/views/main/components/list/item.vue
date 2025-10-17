<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1"
  >
    <div 
    class="group relative w-full cursor-zoom-in rounded"
    :style="{
      backgroundColor: randomRGB()
    }"  
    >
      <!-- 图片 -->
      <img
       ref="imgTarget"
       v-lazy 
       :src="data.pic" 
       class="w-full rounded" 
       />
      <!-- 遮罩层 -->
      <div
        class="hidden xl:block opacity-0 w-full h-full absolute bg-zinc-900/50 top-0 left-0 rounded duration-300 group-hover:opacity-100"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 收藏 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="save"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 下载 -->
        <m-button
          @click="onDownload"
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 详情 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- 类型/来源 -->
    <div class="flex items-center mt-1 px-1">
      <span class="text-sm text-zinc-500 ml-1">{{ data.category }}</span>
      <span class="text-sm text-zinc-500 ml-1">{{ data.src }}</span>
    </div>
  </div>
  <!-- {{ data }} -->
</template>

<script setup>
  import { useFullscreen } from '@vueuse/core';
  import { ref } from 'vue';
  import { message } from '@/libs'
  // 引入图片资源保存包
  import { saveAs } from 'file-saver'
  // 引入随机颜色方法
  import { randomRGB } from '@/utils/color.js'
  const props =  defineProps({
    data: {
      type: Object,
      required: true
    },
    width:{
      type: Number,
    }
  })


  /**
   * 下载按钮点击事件
   */
  const onDownload = ()=>{
      message('success', '图片正在下载中', 5000)
      // 传入下载的图片链接，相当于 window.open(props.data.photoDownLink)

      // 加个定时器稍微控制调度--也可以去掉，不影响
      setTimeout(() => {//此处传入的props.data为数据源项
        // 传入下载的图片链接
        fetch(props.data.pic)
          .then(res => res.blob())
          .then(blob => {
            saveAs(blob, props.data.pic)
          })
      }, 500)


    // 补充：
    // fetch() 获取远程图片资源；
    // .blob() 把它转换为二进制对象；
    // saveAs() 触发下载；
    // 即使图片原本只是用于 <img src="..."> 显示，现在也能被下载。


    // 若上述的props.data.pic存储的值是下载的url则直接调用:
    // saveAs(props.data.photoDownLink)即可触发开始下载



    /**
     * 生成全屏方法
     */
    const imgTarget = ref(null);//获取图像dom
    const { enter: onImgFullScreen } = useFullscreen(imgTarget);//调用全屏api同时解构以及别名获取到新对象---后续解释


  }




</script>