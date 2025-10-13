//vuex中枢文件

import { createStore} from 'vuex'
//引入持久化数据模块
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'


const store = createStore({
  getters,
  modules:{
    category,
    //新增主题模块--并整合
    theme
  },
  plugins: [
    createPersistedState({
      // 指定到localStorage 中的key
      key: 'News-app',
      // 需要保存的模块--注意保存的是state中的所有的对象  
      path: ['category','theme']
    })
  ]
})

export default store