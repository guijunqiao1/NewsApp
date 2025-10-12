import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理navigationBar 中的数据 categorys
 */
export default {
  // 独立作用域--后续声明使用内容需要加上category的命名空间的前缀
  namespaced: true,
  state: () => ({
    categorys: []
  }),
  mutations: {//同步方法
    setCategorys(state, categorys) {
        console.log("cate:",categorys);
      state.categorys = [ALL_CATEGORY_ITEM.name, ...categorys]
    }
  },
  actions: {//异步方法
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const result = await getCategory();
      context.commit('setCategorys', result)
    }
  }
}