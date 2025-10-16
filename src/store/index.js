//vuex中枢文件

import { createStore} from 'vuex'
//引入持久化数据模块
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from "./modules/app"
import search from './modules/search'


const store = createStore({
  getters,
  modules:{
    category,
    //新增主题模块--并整合
    theme,
    //添加分类信息统一管理模块
    app,
    search
  },
  plugins: [
    // 需要注意的是下方持久化处理的作用流程为：
    //当外部文件需要通过store.状态名 访问到下方模块中/或与getters产生联系的模块的时候则优先使用localstorage中的内容替代，同时getters中的该模块的值同时也会被修改为localstorage存的相同的值
    createPersistedState({//当项目成功获取到状态库中的初始值的时候立即将空的localstorage进行相应模块内容填充
      // 指定到localStorage 中的key
      key: 'News-app',
      // 需要保存的模块--注意保存的是state中的指定的下方的模块名--app不用，是会变化的,搜索历史模块需要保存-故添加
      paths: ['category','theme','search']
    })
  ]
})

export default store