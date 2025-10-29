<template>
    <transition name='scroll-back'>
        <m-button
        v-show="isShow" 
        class='h-[42px] min-w-[32px] fixed top-[50%] left-[90%] translate-x-[-50%] z-[100] flex items-center px-3 py-1.5 rounded border cursor-pointer'
        @click="backTop"
        >
            <m-svg-icon 
            name="back-top"
            ></m-svg-icon>
        </m-button>
    </transition>
</template>

<script>
    export default {
        name:'scroll-back'
    }
</script>

<script setup>

    defineProps({
        isShow:{
            default:false,
            type:Boolean
        }
    })

    const emit = defineEmits(['backTop']);

    const backTop = ()=>{
        //发射回到顶部的事件
        emit('backTop');
    };
</script>

<style lang="scss" scoped>

.scroll-back-enter-active,
.scroll-back-leave-active {
  transition: all 2s;
}

.scroll-back-enter-from,
.scroll-back-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>