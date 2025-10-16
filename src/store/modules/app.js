import { ALL_CATEGORY_ITEM } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: ''
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
        //注意需要获取的是整个obj
      state.currentCategory = newCategory
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  }
}