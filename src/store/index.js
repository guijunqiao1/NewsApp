//vuex中枢文件

import { createStore} from 'vuex'
//引入持久化数据模块
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'

const store = createStore({
  getters,
  modules:{
    category
  },
  plugins: [
    createPersistedState({
      // 指定到localStorage 中的key
      key: 'News-app',
      // 需要保存的模块
      path: ['category']
    })
  ]
})

export default store