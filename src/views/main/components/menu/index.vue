<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <!-- 纵轴溢出使用scroll类名赋值 -->
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.categorys"
        @click="childItemClick(index)"
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>


  const emits = defineEmits(['menuItemClick']);

  function childItemClick(index){
    console.log("index:",index);
    emits('menuItemClick',index);
  }



</script>

<style lang="scss" scoped></style>