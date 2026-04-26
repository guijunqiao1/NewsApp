<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
    <ul
      ref="categoryListRef"
      class="w-[910px] m-auto relative flex flex-wrap content-start px-[10px] py-1 text-base duration-300 overflow-hidden"
      :style="{ height: `${containerHeight}px` }"
    >
      <!-- 右边箭头 -->
      <div
        class="absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"        
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
      </div>
      <!-- item -->
      <li
        v-for="(item,index) in store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-1 z-10 ml-[14px] duration-200 mt-1 font-bold rounded cursor-pointer text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        :class="[
          index === currentCategoryIndex
            ? 'bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300'
            : ''
        ]"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul> 
  </div>
</template>

<script setup> 
  import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const categoryListRef = ref(null)
  const currentCategoryIndex = computed(() => store.getters.currentCategoryIndex)

  // 收起高度（保持与原来 h-[70px] 一致）
  const COLLAPSED_HEIGHT = 70
  // 展开时在最后一项底部额外留出的间距（可按需微调）
  const EXPANDED_GAP = 10

  const containerHeight = ref(COLLAPSED_HEIGHT)

  /**
   * 展开状态切换
   */
  const isOpenCategory = ref(false)
  const triggerState = () => {
    isOpenCategory.value = !isOpenCategory.value
  }

  const updateContainerHeight = async () => {
    // 收起：直接回到固定高度，避免测量抖动
    if (!isOpenCategory.value) {
      containerHeight.value = COLLAPSED_HEIGHT
      return
    }

    await nextTick()
    const el = categoryListRef.value
    if (!el) return

    // scrollHeight = 内容实际高度（含 padding），非常适合 flex-wrap 的场景
    const full = el.scrollHeight
    containerHeight.value = Math.max(full + EXPANDED_GAP, COLLAPSED_HEIGHT)
  }

  watch(
    () => isOpenCategory.value,
    () => {
      updateContainerHeight()
    }
  )

  // 分类列表变化时，如果处于展开态也要重新计算高度（比如异步拉取分类）
  watch(
    () => store.getters.categorys,
    () => {
      updateContainerHeight()
    },
    { deep: true }
  )

  const handleResize = () => updateContainerHeight()
  onMounted(() => {
    window.addEventListener('resize', handleResize)
    updateContainerHeight()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  /**
   * 选中状态处理
   */
  const onItemClick = (item) => {
    store.commit('app/changeCurrentCategory', item)
  }


</script>

<style lang="scss" scoped>

</style>