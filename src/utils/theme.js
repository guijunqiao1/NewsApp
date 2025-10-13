import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'
import { watch } from 'vue'
import store from '../store'

// 监听系统主题变更
let matchMedia
const watchSystemTheme = () => {
  // 仅需一次初始化
  if (matchMedia) return
  //调用窗口API--获取的是操作系统相关的当前实际屏幕所呈现出来的偏向主题
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 补充：
  // （1）window.matchMedia('(prefers-color-scheme: dark)') 这个语句用来检测用户系统的颜色模式（暗色或亮色）。它会返回一个 MediaQueryList 对象。
  // （2）该对象有一个 matches 属性，表示用户是否使用暗色模式。
  // （3）该对象还支持 onchange 事件监听，当用户的系统主题发生变化时，触发 onchange 事件。

  // 监听主题变更--监听的是用户机器的主题
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

/**
 * 变更主题
 * @param {THEME_LIGHT | THEME_DARK | THEME_SYSTEM} theme 
 */

const changeTheme = (theme) => {
  let themeClass = ''
  switch (theme) {
    case THEME_LIGHT:
      break
    case THEME_DARK:
      themeClass = 'dark'
      break
    case THEME_SYSTEM:
      // 开始监听系统主题变化，变化后会再触发自身 changeTheme
      watchSystemTheme()
      // matchMedia.matches 判断系统是否为黑暗主题
      themeClass = matchMedia.matches ? 'dark' : ''
      break
  }
  // 修改html的class
  document.documentElement.className = themeClass
}
export default ()=>{
  watch(() => store.getters.themeType, changeTheme, { immediate: true });//监听的是客户端本身手动指定的主题变化
}

