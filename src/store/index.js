//vuex中枢文件

import { createStore} from 'vuex'
//引入持久化数据模块
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from "./modules/app"


const store = createStore({
  getters,
  modules:{
    category,
    //新增主题模块--并整合
    theme,
    //添加分类信息统一管理模块
    app
  },
  plugins: [
    createPersistedState({
      // 指定到localStorage 中的key
      key: 'News-app',
      // 需要保存的模块--注意保存的是state中的指定的下方的模块名--app不用，是会变化的
      paths: ['category','theme']
    })
  ]
})

export default store