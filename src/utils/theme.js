import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'
import { watch } from 'vue'
import store from '../store'

/**
 * 当主题发生变化时，或者进入到系统时，可以进行 html class 的配置
 */
export default () => {
  watch(
    () => store.getters.themeType,
    (theme) => {
      let themeClass = ''
      switch (theme) {
        case THEME_LIGHT:
          break
        case THEME_DARK:
          themeClass = 'dark'
          break
        default:
          break
      }
      // 修改html的class--全局修改类名
      document.documentElement.className = themeClass
    },
    { immediate: true }//启动时触发一次回调
  )
}