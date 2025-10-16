<template>
  <div class="w-full">
    <m-search ref="search" v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示列表 -->
          <hint-vue v-show="inputValue" :search-text="inputValue" @item-click="onSearchHandler"></hint-vue>
          <!-- 历史记录--输入框为空时显示 -->
          <history-vue v-show="!inputValue" @item-click="onSearchHandler"></history-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import hintVue from "./hint.vue";
    import historyVue from './history.vue'
    import { useStore } from "vuex";

    const store = useStore();

    //获取搜索框组件对象
    const search = ref(null)


    const inputValue = ref('')
    /**
     * 搜索回调
     */
    const onSearchHandler = (text) => {
      //触发搜索事件的情况下进行输入框内容的文本填充
      inputValue.value = text
      // 关闭搜索框
      search.value.isFocus = false
      //填充历史，store存在去重逻辑
      store.commit('search/addHistory', text)
    }
</script>

<style lang="scss" scoped></style>