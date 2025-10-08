<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :class="fillClass" :fill="color"/>
  </svg>
</template>

<!-- 解释：
使用了 <svg> 元素来显示 SVG 图标。这里的 aria-hidden="true" 表示该 SVG 图标不会被屏幕阅读器读取，这通常是为了让图标不影响可访问性，尤其是当图标只是装饰性时。
<use> 元素用来引用外部的 SVG 图标。通过 :href 属性，指向一个 symbol 元素，这里是通过 symbolId 来动态计算的。
1、:href="symbolId"：动态绑定 :href，它指向一个符号的 ID，symbolId 是根据 props.name 动态计算出来的。
2、:class="fillClass"：动态绑定 class，这通常是使用 Tailwind CSS 来控制颜色或者其他样式的类名。
3、:fill="color"：动态绑定 fill 属性，用来设置图标的颜色。
-->

<script setup>
  import { computed } from "vue"

  const props = defineProps({
    // 显示的 svg
    name: {
      type: String,
      required: true
    },
    // svg 图标的颜色
    color: {
      type: String
    },
    // tainwind 指定 svg 颜色的类名
    fillClass: {
      type: String
    }
  })

  // 真实现实的 svg 图标（#icon-)
  const symbolId = computed(()=>{
    return `#icon-${props.name}`
  })

  console.log("symbolId:",symbolId);
  console.log("class:",props.fillClass);
</script>

<style lang="scss" scoped></style>