<template>
  <div>
    <!-- 内置组件指定挂载位置 -->
    <teleport to="body">
      <!-- 蒙版--控制pop弹窗的显示 -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up"> 
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 fixed bottom-0 z-50"
          >
          <!-- v-bind=""即为将剩余属性渗透到子组件中的特殊用法(不用一个个写剩余属性的赋值了) -->
          <slot></slot>
        </div>
      </transition>
    </teleport>

  </div>
</template>

<script setup>
  import { watch } from "vue";
  import { useScrollLock,useVModel } from '@vueuse/core';

  const props = defineProps({
    modelValue:{//此处为v-model的全量特定写法
      require:true,
      type:Boolean
    }
  })

  // const { Lock,unlock } = useScrollLock();//解构获取对象中的锁定方法、解锁的方法
  const isLocked = useScrollLock();//直接获取对象，其中value属性直接control锁定状态

  const emits = defineEmits(['update:modelValue']);//注意和正常的function的emit进行区分

  const isVisible = useVModel(props, 'modelValue', emits);//变为双向绑定的ref了

  //监听弹出框状态
  watch(()=>isVisible,(val)=>{
    console.log("发生变化");
    isLocked.value = val;
  },{deep:true,immediate:true});

  //此处需要注意的是watch第一参数为function，若为直接的value的写法会被理解为funtion,同时执行并且使用其return的value
  
</script>

<style lang="scss" scoped>
  // 内置过渡组件的类名设置解释：
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
    // 属性取值解释：
    // all（过渡的属性）
    // 0.3s（过渡的持续时间）
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    // 控制元素进入和离开时的透明度（opacity: 0）
  }

  .popup-down-up-enter-active,
  .popup-down-up-leave-active {
    transition: all 0.3s;
    // 控制元素进入和离开时的透明度（opacity: 0）
  }
  .popup-down-up-enter-from,
  .popup-down-up-leave-to {
    opacity: 0;
    transform: translateY(100%);
    // 进入时，元素从 translateY(100%)（即屏幕底部）开始，最终恢复到正常位置。
    // 离开时，元素会淡出并且向下滑动（translateY(100%)）
  }

// 组件类名规则：--下方描述的元素指的是transition组件最近层的标签元素
// name-enter：元素进入时应用的类名（即元素从 DOM 中添加时）。
// name-enter-active：元素进入时过渡效果的类名（例如定义过渡的持续时间等）。
// name-enter-from：元素进入时的起始状态。
// name-enter-to：元素进入时的结束状态。

// name-leave：元素离开时应用的类名（即元素从 DOM 中移除时）。
// name-leave-active：元素离开时过渡效果的类名。
// name-leave-from：元素离开时的起始状态。
// name-leave-to：元素离开时的结束状态。
</style>