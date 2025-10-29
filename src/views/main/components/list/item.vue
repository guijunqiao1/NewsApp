<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1"
  >
    <div 
    class="group relative w-full cursor-zoom-in rounded"
    :style="{
      backgroundColor: randomRGB()
    }"  
    @click="onToPinsClick"
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
  import { useFullscreen, useElementBounding } from '@vueuse/core'
  import { ref, computed } from 'vue'
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

    }

    // 若上述的props.data.pic存储的值是下载的url则直接调用:
    // saveAs(props.data.photoDownLink)即可触发开始下载

    

    /**
     * 生成全屏方法
     */
    const imgTarget = ref(null);//获取图像dom
    const { enter: onImgFullScreen } = useFullscreen(imgTarget);//调用全屏api同时解构以及别名获取到新对象---后续解释

    const emits = defineEmits(['change_img_type'])
    
    const imgContainerCenter = computed(() => {
      // useElementBounding 仅在 window的 scroll 方法时被触发，所以移动端的 useElementBounding 不再具备响应式--此处改用getBoundingClientRect方法替代功能
      // 补充：
      // 对比维度	    getBoundingClientRect()（原生）       	useElementBounding()（VueUse）
      // 类型         	原生 DOM API                        	VueUse 组合式函数
      // 响应性	        ❌ 不响应变化（静态结果）	              ✅ 响应式更新（自动监听）
      // 返回值类型	      普通对象 (DOMRect)	                  一组 ref 响应式变量
      // 是否自动更新     	❌ 需要手动调用更新	            ✅ 会自动在窗口变化 / 元素变化时更新
      // 内部依赖机制	      浏览器布局计算	                ResizeObserver、window 事件等
      // 使用场景	      仅需要一次性测量（如拖拽起始点）	    需要实时追踪元素位置或大小变化（如浮层定位）
      // 性能开销	      小（但频繁调用会触发重排）              	稍高（持续监听变化）
      // 是否依赖 Vue	    ❌ 与框架无关	                  ✅ 仅能在 Vue 组合式 API 中使用
      const {
        x: imgContainerX,
        y: imgContainerY,
        width: imgContainerWidth,
        height: imgContainerHeight
      } = imgTarget.value.getBoundingClientRect()
      return {
        translateX: parseInt(imgContainerX + imgContainerWidth / 2),
        translateY: parseInt(imgContainerY + imgContainerHeight / 2)
      }
    })


    /**
     * 进入详情点击事件---为子项目进一步绑定点击的pins展示事件，可能中间的空余部分不会在整个item-vue中被点击到
     */
    const onToPinsClick = () => {//当前组件本身就是item项故无需传参指定target
      console.log("触发的是item的topins")
      //计算img盒子类型
      const { height,width } = window.getComputedStyle(imgTarget.value);
      const img_type = height>=width?'shu':'heng';
      emits('change_img_type', {//发射所触发的并不是自定义事件，同时传参为obj模拟item的信息对象
        id: props.data.id,
        location: imgContainerCenter,
        img_type
      })
    }

</script>