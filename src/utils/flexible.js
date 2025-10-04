//判断当前运行设备为pc还是移动的文件,专门导出判断结果以及合适的响应式值


import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize();//获取当前实际设备屏幕的宽高

/**
 * 判断当前是都为移动设备，判断依据屏幕宽度否小于一个指定宽度
 */
export const isMobile = computed(() => {//比较后计算当前实际宽高和界定值的大小关系而后返回计算属性值
  return width.value < PC_DEVICE_WIDTH
})