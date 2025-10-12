<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-base text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 弹窗显示按钮 -->
      <li
        class="fixed top-0.5 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
        @click="onshowPopup"
      >
        <m-svg-icon name="hamberger" class="w-2 h-2"></m-svg-icon>
      </li>
      <!-- 滑块（指的是当选中元素动态过渡的背景的盒子）,通过absolute的脱离文档流的效果完成 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 my-0.5"
      ></li>
      <!-- 列表项内容 -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4"
        :ref="setItemRef"
        :class="{ 'text-zinc-100': index === currentCategoryIndex }"
        @click="onItemClick(index)"
      >
      <!-- 上述ref属性的特殊用法，每当 v-for 遍历到一个新的 li 元素时，setItemRef 会被调用，并且该元素会作为参数传递给它。
      注意和绑定元素获取元素的ref的用法进行区别 -->
        {{ item }}
      </li>
    </ul>
    <m-popup v-model="popupVisible" >
      <menu-vue @menuItemClick="onItemClick"></menu-vue>
      <!-- 注意自定义事件传参机制--上述仅需绑定方法,否则产生副作用 -->
    </m-popup>
  </div>
</template>

<script setup>
  import { useScroll } from '@vueuse/core'
  import { onBeforeUpdate, ref, watch } from 'vue'
  //单独引入menu组件--非通用形
  import MenuVue from "../../menu/index.vue";


  //初始化弹窗显示var
  const popupVisible = ref(false);

  //弹窗show方法
  function onshowPopup(){
    popupVisible.value = true;
  }

  watch(()=>popupVisible,(val)=>{
    console.log("当前可见状态:",val.value);
  },{deep:true})

  
  const onItemClick = (index) => {
    console.log('-----------------------',index);
    currentCategoryIndex.value = index
  }


  // 滑块
  const sliderStyle = ref({
    transform: 'translateX(0px)',
    width: '53px'
  })

  // 选中 item 元素--默认取值为第一项
  const currentCategoryIndex = ref(0)

  // 获取所有的 item 元素--利用ref的工作特性使得有了数据就往当前itemRefs中填充元素
  let itemRefs = []
  const setItemRef = (el) => {
    if (el) {
      itemRefs.push(el)
    }
  }

  // 数据变化之后，DOM变化之前(视图更新前的钩子)
  onBeforeUpdate(() => {
    itemRefs = []
  })

  // 获取 ul 元素
  const ulTarget = ref(null)
  // 获取scroll滚动的响应式数据
  const { x: ulScrollLeft } = useScroll(ulTarget);//解构赋值的别名命名方式


  // 1:
  // watch(()=>currentCategoryIndex, (val) => {//当选中元素发生变化的时候--第一个参数为newVal
  //   // 相对于屏幕的位置信息以及大小信息
  //   const { left, width } = itemRefs[val.value].getBoundingClientRect();//使用HTMLElement元素特有的getBoundingClientRect方法

  //   let ulPadding = getComputedStyle(ulTarget.value, null).paddingLeft // getComputedStyle获取的所有value都是string类型的object
  //   ulPadding = parseInt(ulPadding);//强制转化的同时去0

  //   sliderStyle.value = {
  //     // 滑块的位置 = ul 横向滚动的位置 + 当前元素相对于视口的 left - ul 的padding,因为transform属性<0的时候会从视口的位置向左边移动(并不会脱离视口)
  //     transform: `translateX(${ulScrollLeft.value + left - ulPadding}px)`,//横向移动滑块
  //     width:`${width}px`//修改滑块体积
  //   }
  // },{deep:true})
  // 2:
  watch(()=>currentCategoryIndex, (val) => {
    // 相对于屏幕的位置信息
    // console.log('itemRefs:');
    // console.dir(itemRefs);
    // console.log('val:');
    // console.dir(val.value);
    // console.log('object:');
    // console.dir(itemRefs[val.value]);
    const { left, width } = itemRefs[val.value].getBoundingClientRect()
    let ulPadding = getComputedStyle(ulTarget.value, null).paddingLeft // 这里因为这种方法获取的是带有9.375px的字符串
    ulPadding = parseInt(ulPadding)
    // 滑块的位置 = ul 横向滚动的位置 + 当前元素相对于视口的 left - ul 的padding
    sliderStyle.value.transform = `translateX(${
      ulScrollLeft.value + left - ulPadding
    }px)`
    sliderStyle.value.width = `${width}px`
    console.log("222222");



    // 点击navigation以外的目录，滚动ul
    if(popupVisible.value){
      console.log("111111");
      popupVisible.value = false;//立即退出弹窗状态同时选中为当前的list项
      //模拟滑块和滚动条同步运动的效果--有偏差
      ulTarget.value.scrollLeft += left;
      // 将选中item尽可能放置在视图中间
      ulTarget.value.scrollLeft -= 140;//减去了总padding的量
    }
  },{deep:true})



  
</script>

<style lang="scss" scoped>

</style>