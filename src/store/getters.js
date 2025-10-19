// store计算属性(计算state)文件

export default{
  // 简单访问--分类总list
  categorys: (state)=> {
    return state.category.categorys;//返回index主仓库程序文件中的category-module中的categorys变量
  },
  // 当前主题
  themeType: (state) => state.theme.themeType,
  // 当前category
  currentCategory: (state) => state.app.currentCategory,
  // 当前category 的下标
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => item.id === getters.currentCategory.id)
  },
  // 搜索历史数据
  historys: (state) => state.search.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  // 获取用户信息
  userInfo: (state) => state.user.userInfo
}
