<template>
  <div class="">
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"     
      v-html="highlightText(item)"
    >
    </div>
  </div>
</template>


<script setup>
    import { getHint } from '@/api/news'
    import { ref, watch } from 'vue'
    import { watchDebounced } from '@vueuse/core';
    //针对该api做出解释：
    //🧩 watchDebounced() 就是 带防抖功能的 watch。
    // 它在被监听的值变化时，不会立刻执行回调，而是等到一段时间内没有进一步变化后再执行。

    // 相当于在 Vue 的 watch 外层自动包了一层防抖逻辑。

    /**
     * 接收搜索数据
     */
    const props = defineProps({
        searchText: {
            type: String,
            required: true
        }
    })
    /**
     * item 被点击触发事件
     */
    const emits = defineEmits(['itemClick'])

    /**
     * 处理搜索提示数据获取
     */
    const hintData = ref([])
    const getHintData = async () => {
        console.log("搜索了n次关键字");
        //为空的情况下则清空及不搜索
        if (!props.searchText) {    
            hintData.value = '';
            return;            
        }
        const res = await getHint(props.searchText)
        // console.log("搜索list内容：",res.data.result);
        hintData.value = res.data.result;
    }
    /**
     * 监听搜索文本的变化，并获取对应提示数据
     */
    watchDebounced(() => props.searchText, getHintData, {
        debounce:500,
        immediate: true
    })

    /**
     * item 点击事件处理
     */
    const onItemClick = (item) => {
        emits('itemClick', item)
    }


    /**
     * 处理关键字高亮
     */
    const highlightText = (text) => {
      // 生成高亮标签
      const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
      // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
      const reg = new RegExp(props.searchText, 'gi')
      // 替换
      return text.replace(reg, highlightStr)
    }




</script>