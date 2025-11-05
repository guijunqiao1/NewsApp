//判断当前运行设备为pc还是移动的文件,专门导出判断结果以及合适的响应式值


import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize();//获取当前实际设备屏幕的宽高

/**
 * 判断当前是都为移动设备，判断依据屏幕宽度否小于一个指定宽度
 */
export const isMobile = computed(() => {//比较后计算当前实际宽高和界定值的大小关系而后返回计算属性值
  // return width.value < PC_DEVICE_WIDTH
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * rem解释：
   1、rem 代表 "Root EM"，即“根元素的相对单位”。
   2、它是 相对单位，与 em 类似，但 rem 始终是基于文档根元素 (<html>) 的字体大小，而 em 则是相对于它的父元素的字体大小。
 * 动态指定 rem 基准值，最大40px
 * 根据屏幕宽度计算，赋值给html：fontsize
 */
export const useREM = ()=>{
  // 定义最大的fontsize
  const MAX_FONT_SIZE = 40  
  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded',()=>{
    const html = document.querySelector('html')
    // 计算 fontSize, 根据屏幕宽度 / 10  解释：window.innerWidth是窗口内容区域的宽度
    let fontSize = Math.min(MAX_FONT_SIZE, window.innerWidth / 10)
    html.style.fontSize = fontSize + 'px'
  })
}