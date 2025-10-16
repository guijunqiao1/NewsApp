<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <router-view></router-view>
  </div>
</template>

<script setup>
  //需要注意此处若script中的内容执行出错会导致挂载到#app的操作失败(中断)
  import { isMobile } from './utils/flexible';

//   import { watch,ref,nextTick, reactive } from "vue";


//   const obj1 = reactive({
//     a:1,
//     b:2
//   })

//   function change_test(value){
//     console.log("1111");
//     value.a ++;
//   }

  

//   watch(()=> obj1,(newVal)=>{
//     nextTick(()=>{
//       // change_test(newVal);
//       console.log("222222");
//     })
//     console.log("执行了n次");
//   },{
//     deep:true,
//     immediate:true
//   })

// // 主动触发一次变化
//   change_test(obj1);


</script>