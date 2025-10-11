<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <!-- 指定插入dropdown下拉框插槽中 -->
      <template #dropdown>
        <div>
          dropdown
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const inputValue = ref(null);

  console.log("search");
</script>

<style lang="scss" scoped>

</style>