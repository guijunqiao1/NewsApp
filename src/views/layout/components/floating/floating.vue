<template>
    <!-- 引导页 -->
    <div
      class="fixed bottom-[30vh] right-[10px] guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
        @click="onGuideClick"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="guide-feedback flex items-center" placement="top-left">
      <template #reference>
        <div
          class="fixed bottom-[40vh] right-[10px] w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
          @click="onToFeedback"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
</template>

<script setup>
  // 引入引导页api
  import Driver from 'driver.js'
  // 补充：此处需要注意后续可以动态import引入npm包中的css内容进行优化，一般情况下直接使用的是非css文件不需要手动import需要使用该api自带的style则需要import
  import 'driver.js/dist/driver.min.css'
  import steps from './steps'
  import { onMounted } from 'vue'
  import { FEEDBACK_URL } from '@/constants'

  /**
   * 引导页处理
   */
  let driver = null
  onMounted(() => {
    //挂载完毕使得deriver可用
    driver = new Driver({
      // 禁止点击蒙版关闭
      allowClose: false,
      closeBtnText: '关闭',
      nextBtnText: '下一个',
      prevBtnText: '上一个'
    })
  })

  /**
   * 开始引导
   */
  const onGuideClick = () => {
    //调用后仅在driver不为null的时候生效
    driver.defineSteps(steps)
    driver.start()
  }


/**
 * 反馈处理
 */
const onToFeedback = () => {
  window.open(FEEDBACK_URL, '_blank')
}

</script>

<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>