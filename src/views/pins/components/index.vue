<template>
  <div class="fixed left-0 top-0 w-screen h-screen text-xl bg-slate-500 z-20">
    <!-- mobile的pins顶部 -->
    <m-navbar></m-navbar>

    <!-- pc的pins顶部 -->

    <!-- 公共内容区 -->
    {{ id }}
  </div>
</template>

<script setup>

  const props = defineProps({
    id: {
        type: String,
        required: true
    }
    })

</script>