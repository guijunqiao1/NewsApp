<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1"
  >
    <div 
    data-news-card-image
    class="group relative w-full cursor-zoom-in rounded"
    :style="{
      backgroundColor: randomRGB()
    }"  
    @click="onToPinsClick"
    >
      <!-- 图片 -->
      <div
        ref="fullScreenTarget"
        class="news-image-fullscreen-target"
        :class="{
          'is-fullscreen-exiting': isExitingFullscreen,
          'is-orientation-animating': isOrientationAnimating
        }"
        @click="onFullscreenTargetClick"
      >
      <img
       ref="imgTarget"
       v-lazy
       :src="data.pic" 
          class="news-image-fullscreen-img w-full rounded"
       />
        <button
          v-show="isFullscreen"
          class="fullscreen-exit-button"
          aria-label="退出全屏"
          @click.stop="onExitFullScreen"
        >
          <m-svg-icon name="close" class="w-3 h-3"></m-svg-icon>
        </button>
      </div>
      <!-- 遮罩层 -->
      <div
        class="hidden xl:block opacity-0 w-full h-full absolute bg-zinc-900/50 top-0 left-0 rounded duration-300 group-hover:opacity-100"
      >
        <!-- 分享 -->
        <m-button
         @click="onShareClick"
         class="absolute top-1.5 left-1.5"
         >分享</m-button>
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
          data-testid="news-image-fullscreen-button"
          aria-label="全屏查看图片"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
      <m-button
        class="xl:hidden absolute bottom-1 right-1 bg-zinc-100/80"
        data-testid="news-image-fullscreen-button"
        aria-label="全屏查看图片"
        type="info"
        size="small"
        icon="full"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onImgFullScreen"
      ></m-button>
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
  <teleport to="body">
    <transition name="fallback-fullscreen">
      <div
        v-if="isFallbackFullscreen"
        class="fallback-fullscreen-view"
        :class="{ 'is-orientation-animating': isOrientationAnimating }"
        @click="onExitFullScreen"
      >
        <button
          class="fullscreen-exit-button"
          aria-label="退出全屏"
          @click.stop="onExitFullScreen"
        >
          <m-svg-icon name="close" class="w-3 h-3"></m-svg-icon>
        </button>
        <img
          :src="data.pic"
          class="fallback-fullscreen-img"
          alt=""
          @click.stop
        />
      </div>
    </transition>
  </teleport>
  <!-- {{ data }} -->
</template>

<script setup>
  import { useEventListener, useFullscreen } from '@vueuse/core'
  import { weiboShare } from '@/utils/share'

  import { ref, computed, onBeforeUnmount } from 'vue'
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
    const fullScreenTarget = ref(null)
    const isFallbackFullscreen = ref(false)
    const isExitingFullscreen = ref(false)
    const isOrientationAnimating = ref(false)
    let orientationTimer = null
    const {
      enter: enterFullScreen,
      exit: exitFullScreen,
      isFullscreen,
      isSupported
    } = useFullscreen(fullScreenTarget);//调用全屏api同时解构以及别名获取到新对象---后续解释

    const onImgFullScreen = async () => {
      try {
        if (isSupported.value) {
          await enterFullScreen()
          return
        }
      } catch (error) {
        console.warn('Fullscreen API is not available, fallback to fixed view.', error)
      }
      isFallbackFullscreen.value = true
    }

    const delay = (time) => new Promise((resolve) => {
      setTimeout(resolve, time)
    })

    const runOrientationAnimation = () => {
      if (!isFullscreen.value && !isFallbackFullscreen.value) {
        return
      }
      isOrientationAnimating.value = false
      requestAnimationFrame(() => {
        isOrientationAnimating.value = true
        window.clearTimeout(orientationTimer)
        orientationTimer = window.setTimeout(() => {
          isOrientationAnimating.value = false
        }, 380)
      })
    }

    const onExitFullScreen = async () => {
      if (isFallbackFullscreen.value) {
        isFallbackFullscreen.value = false
        return
      }
      if (isFullscreen.value) {
        isExitingFullscreen.value = true
        try {
          await delay(180)
          await exitFullScreen()
        } finally {
          isExitingFullscreen.value = false
        }
      }
    }

    const onFullscreenTargetClick = (event) => {
      if (!isFullscreen.value) {
        return
      }
      event.stopPropagation()
      onExitFullScreen()
    }

    useEventListener(window, 'keydown', (event) => {
      if (event.key === 'Escape' && isFallbackFullscreen.value) {
        isFallbackFullscreen.value = false
      }
    })

    useEventListener(window, 'orientationchange', runOrientationAnimation)
    useEventListener(window, 'resize', runOrientationAnimation)

    onBeforeUnmount(() => {
      window.clearTimeout(orientationTimer)
    })

    const emits = defineEmits(['change_img_type', 'open-pins'])
    
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
      if (!imgTarget.value) {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          translateX: 0,
          translateY: 0
        }
      }
      const {
        x,
        y,
        width,
        height
      } = imgTarget.value.getBoundingClientRect()
      return {
        x,
        y,
        width,
        height,
        translateX: parseInt(x + width / 2),
        translateY: parseInt(y + height / 2)
      }
    })


    /**
     * 进入详情点击事件---为子项目进一步绑定点击的pins展示事件，可能中间的空余部分不会在整个item-vue中被点击到
     */
    const onToPinsClick = () => {//当前组件本身就是item项故无需传参指定target
      if (isFullscreen.value || isFallbackFullscreen.value) {
        return
      }
      console.log("触发的是item的topins")
      const { height, width } = imgContainerCenter.value
      const img_type = height >= width ? 'shu' : 'heng'
      const payload = {
        ...props.data,
        location: imgContainerCenter.value,
        img_type
      }
      emits('change_img_type', payload)
      emits('open-pins', payload)
    }





    /**
     * 分享按钮点击处理
     */
    const onShareClick = () => {
      weiboShare(
        props.data.pic,
        `http://localhost:5173/pins/${props.data.id}`
      )
    }

</script>

<style lang="scss" scoped>
  .news-image-fullscreen-target {
    position: relative;
    width: 100%;
    line-height: 0;
  }

  .news-image-fullscreen-target:fullscreen,
  .news-image-fullscreen-target:-webkit-full-screen {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-width: none;
    max-height: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: max(12px, env(safe-area-inset-top))
      max(12px, env(safe-area-inset-right))
      max(12px, env(safe-area-inset-bottom))
      max(12px, env(safe-area-inset-left));
    background: #020617;
    border-radius: 0;
    cursor: zoom-out;
    transition:
      padding 320ms cubic-bezier(0.22, 1, 0.36, 1),
      background-color 260ms ease;
  }

  .news-image-fullscreen-target:fullscreen .news-image-fullscreen-img,
  .news-image-fullscreen-target:-webkit-full-screen .news-image-fullscreen-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0;
    animation: fullscreen-image-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
    transition:
      max-width 320ms cubic-bezier(0.22, 1, 0.36, 1),
      max-height 320ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 180ms ease;
  }

  .news-image-fullscreen-target.is-fullscreen-exiting:fullscreen .news-image-fullscreen-img,
  .news-image-fullscreen-target.is-fullscreen-exiting:-webkit-full-screen .news-image-fullscreen-img {
    transform: scale(0.96);
    opacity: 0;
  }

  .news-image-fullscreen-target.is-orientation-animating:fullscreen .news-image-fullscreen-img,
  .news-image-fullscreen-target.is-orientation-animating:-webkit-full-screen .news-image-fullscreen-img,
  .fallback-fullscreen-view.is-orientation-animating .fallback-fullscreen-img {
    animation: fullscreen-orientation-settle 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fullscreen-exit-button {
    position: absolute;
    top: max(12px, env(safe-area-inset-top));
    right: max(12px, env(safe-area-inset-right));
    z-index: 10;
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    color: #fff;
    background: rgb(24 24 27 / 70%);
    transition:
      transform 180ms ease,
      opacity 180ms ease,
      background-color 180ms ease;
  }

  .fullscreen-exit-button:hover {
    transform: scale(1.04);
    background: rgb(39 39 42 / 86%);
  }

  .fallback-fullscreen-view {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: max(12px, env(safe-area-inset-top))
      max(12px, env(safe-area-inset-right))
      max(12px, env(safe-area-inset-bottom))
      max(12px, env(safe-area-inset-left));
    background: #020617;
    cursor: zoom-out;
  }

  .fallback-fullscreen-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition:
      max-width 320ms cubic-bezier(0.22, 1, 0.36, 1),
      max-height 320ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 180ms ease;
  }

  .fallback-fullscreen-enter-active,
  .fallback-fullscreen-leave-active {
    transition:
      opacity 220ms ease,
      background-color 220ms ease;
  }

  .fallback-fullscreen-enter-active .fallback-fullscreen-img,
  .fallback-fullscreen-leave-active .fallback-fullscreen-img {
    transition:
      transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 220ms ease;
  }

  .fallback-fullscreen-enter-from,
  .fallback-fullscreen-leave-to {
    opacity: 0;
  }

  .fallback-fullscreen-enter-from .fallback-fullscreen-img,
  .fallback-fullscreen-leave-to .fallback-fullscreen-img {
    transform: scale(0.96);
    opacity: 0;
  }

  @media (orientation: landscape) {
    .news-image-fullscreen-target:fullscreen,
    .news-image-fullscreen-target:-webkit-full-screen,
    .fallback-fullscreen-view {
      padding: max(8px, env(safe-area-inset-top))
        max(8px, env(safe-area-inset-right))
        max(8px, env(safe-area-inset-bottom))
        max(8px, env(safe-area-inset-left));
    }

    .fullscreen-exit-button {
      top: max(8px, env(safe-area-inset-top));
      right: max(8px, env(safe-area-inset-right));
    }
  }

  @keyframes fullscreen-image-enter {
    from {
      transform: scale(0.96);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fullscreen-orientation-settle {
    0% {
      transform: scale(0.98);
      opacity: 0.88;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
