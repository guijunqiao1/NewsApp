<template>
  <div
    class="flex"
    ref="containerTarget"
    :style="{ height: containerHeight }"
  >
    <!-- 数据渲染 -->
    <template v-if="data.length && columnWidth">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="m-waterfull-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
        }"
      >
        <!-- 插槽的传值用法 -->
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中</div>
  </div>
</template>

<script setup>
    import { computed, ref, onMounted } from 'vue'

    const props = defineProps({
        // 数据源
        data: {
            type: Array,
            required: true
        },
        // 列数
        column: {
            default: 2,
            type: Number
        },
        // 列间距
        columnSpacing: {
            type: Number,
            default: 20
        },
        // 行间距
        rowSpacing: {
            defaul: 20,
            type: Number
        },
        // 是否需要进行图片预读取
        picturePreReading: {
            type: Boolean,
            default: true
        }
    })
    // 容器实例
    const containerTarget = ref(null)
    // 容器总高度 == 最高一列的高度
    const containerHeight = ref(0)
    // 容器总宽度 (不含 padding margin border)
    const containerWidth = ref(0)
    // 容器左边距，计算item.left 时需要使用定位
    const containerLeft = ref(0)
    // 记录每列高度的容器
    const columnHeightObj = ref({})
    // 初始化各列的高度为0
    const useColumnHeightObj = () => {
        for (let i = 0; i < props.column; i++) {
            columnHeightObj.value[i] = 0
        }
    }
    // 计算容器宽度
    const useContainerWidth = () => {
        const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value);//利用document直接提供的Api直接获取容器的计算属性
        // 容器左边距
        containerLeft.value = parseFloat(paddingLeft)
        // 容器宽度--仅content部分
        containerWidth.value =
            containerTarget.value.clientWidth -
            containerLeft.value -
            parseFloat(paddingRight)

        // 回顾
        // 属性	            作用	    包含内容区域	包含内边距	包含边框	包含滚动条
        // offsetWidth	元素的总宽度	    是	        是	    是	        是
        // clientWidth	内容区域的宽度	  是	        是	    否	        否
    }
    // 列宽
    const columnWidth = ref(0)
    // 列间距合计
    const columnSpacingTotal = computed(() => {
        return (props.column - 1) * props.columnSpacing
    })
    // 计算列宽
    const useColumnWidth = () => {
        // 获取容器宽度
        useContainerWidth()
        columnWidth.value =
            (containerWidth.value - columnSpacingTotal.value) / props.column
    }

    onMounted(() => {//计算方法的定义放在组件创建前区域，实际调用发生在挂载完毕阶段
        // 开始计算
        useColumnWidth()
        console.log(columnWidth.value)
    })
</script>

<style lang="scss" scoped></style>