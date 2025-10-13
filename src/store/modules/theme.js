// 引入亮色主题前缀字
import { THEME_LIGHT } from '@/constants'

export default {
  namespaced: true,//开启命名空间
  state: () => ({
    // 当前主题模式
    themeType: THEME_LIGHT
  }),
  mutations: {//同步改变主题变量的方法
    changeThemeType (state, themeType) {
      state.themeType = themeType
    }
  },
  actions: {}
}