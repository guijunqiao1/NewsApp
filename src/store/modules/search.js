// 搜索历史模块库
export default {
  namespaced: true,//开启命名空间
  state: () => ({
    historys: []
  }),
  mutations: {
    /**
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.historys.findIndex(
        (item) => item === newHistory
      )
      // 剔除旧数据中的new——item项，防止unshift发生重复问题
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1);//注意splice方法调用修改原数组
      }
      // 新增记录
      state.historys.unshift(newHistory)
    },
    /**
     * 删除指定数据
     */
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    /**
     * 删除所有历史记录
     */
    deleteAllHistory(state) {
      state.historys.length = 0;
    }
  }
}