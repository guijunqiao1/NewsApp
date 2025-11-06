<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px'}"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="m-waterfull-item absolute duration-500"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
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
<script>
  export default {
    name: 'waterfall'
  }
</script>

<script setup>
  import { computed, ref, onMounted, nextTick, watch } from 'vue'
  import {
    getImgElements,
    getAllImg,
    onComplateImgs,
    getMinHeightIndex,
    getMinHeight,
    getMaxHeight
  } from './utils'

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
            default: 20,
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

    /**
     * 初始化各列的高度为0
     */
    const useColumnHeightObj = () => {
        columnHeightObj.value = {}
        for (let i = 0; i < props.column; i++) {
            columnHeightObj.value[i] = 0
        }
    }
    /**
     * 计算容器宽度
     */
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
    /**
     * 计算列宽
     */
    const useColumnWidth = () => {
      // 获取容器宽度
      useContainerWidth()
      columnWidth.value =
          (containerWidth.value - columnSpacingTotal.value) / props.column
    }

    onMounted(() => {//计算方法的定义放在组件创建前区域，实际调用发生在挂载完毕阶段
        // 开始计算
        useColumnWidth()
    })

    onMounted(() => {
      // 清除所有的._style
      props.data.forEach((item) => {
        delete item._style
      })
    })



    // 图片高度集合
    let itemHeights = []
    /**
     * 需要等待图片预加载完成--触发在每次props数据源重新获取的时候立即进行src的预加载
     */
    const waitImgComplate = () => {
      itemHeights = []
      // 拿到所有元素
      let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
      // 获取所有的 img 元素
      const imgElements = getImgElements(itemElements)
      // 获取所有图片的链接
      const imgs = getAllImg(imgElements)
      // 等待图片加载完成
      onComplateImgs(imgs).then(() => {
        // 图片加载完成，可获取高度
        itemElements.forEach((el) => {
          itemHeights.push(el.clientHeight)
        })
        // 渲染位置--在确保加载完成之后再进行位置计算
        useItemLocation()
      })
    }
    /**
     * 得到每个 item 的位置信息
     */
    const useItemLocation = () => {
      // 获取位置信息前重新计算列宽
      useColumnWidth()
      // 遍历数据源
      props.data.forEach((item, index) => {
        // 避免重复计算
        if (item._style) {
          return
        }
        // 生成 style 元素
        item._style = {}
        item._style.left = getItemLeft()
        item._style.top = getItemTop()

        // 确定完当前 item 的位置后，对应列高度加上 itemHeight
        increaseHeight(index)
      })
      // 更新容器高度
      containerHeight.value = getMaxHeight(columnHeightObj.value)
    }

    /**
     * 获取下个 item 项的 left 值，等于最小高度所在列 * (列间距 + 列宽)
     */
    const getItemLeft = () => {
      // 获取最小列 index
      const minIndex = getMinHeightIndex(columnHeightObj.value)
      return (
        minIndex * (props.columnSpacing + columnWidth.value) + containerLeft.value
      )
    }

    /**
     * 获取下个 item 项的 top 值，等于最小高度所在列高度
     */
    const getItemTop = () => {
      return getMinHeight(columnHeightObj.value)
    }
    /**
     * 指定列高度自增
     */
    const increaseHeight = (index) => {
      //最小高度所在列
      const minIndex = getMinHeightIndex(columnHeightObj.value)
      columnHeightObj.value[minIndex] += itemHeights[index] + props.rowSpacing
    }




    /**
     * 不进行预加载，计算 item 的高度--在props没有相应传参的情况下进行调用
     */
    const useItemHeight = () => {
      itemHeights = []
      // 拿到所有元素
      let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
      // 直接获取 item 高度
      itemElements.forEach((el) => {
        itemHeights.push(el.clientHeight)
      })
      // 渲染位置
      useItemLocation()
    }
    // 触发计算
    watch(
      ()=>props.data,
      (newVal) => {
        console.log("数据触发了更新");
        // 如果数组每一个都没有._style，则重新构建容器
        const resetColumnHeight = newVal.every((item) => !item._style)
        if (resetColumnHeight) {
          useColumnHeightObj() 
        }
        nextTick(() => {// 将计算操作添加到微队列中--需要注意的是watch回调的内容本身也是微队列，此处还使用一次nextTick包裹内容进行微队列的加入的含义在于：
          //   //若当前watch还存在其他内容则优先执行其他内容，在本次微任务回调执行完成之后再执行nextTick微任务的回调
          if (props.picturePreReading) {
            console.log("选用了预加载");
            waitImgComplate()
          } else {
            useItemHeight()
          }
        })
      },
      {
        deep:true,
        //需要注意此处的deep的配置项产生地狱的原因来源于nextTick的
        immediate:true
        //需要注意此处的immediate配置项,
        //immediate: true 被注释掉了，这意味着：
        //Watch只会在 props.data 发生变化时触发
        //不会在组件初始化时触发
        //如果初始数据在组件挂载前就已经设置好，watch不会执行
      }
    )

    //监听传递的列相关纬度的信息
    watch(
    [() => props.column, () => props.rowSpacing, () => props.columnSpacing],
    (newVal)=>{
      // 重新计算列宽
      useColumnWidth()
      // 重置所有定位数据记录
      props.data.forEach((item) => {
        item._style = null
      })
    })

</script>

<style lang="scss" scoped></style>