<template>
  <transition name="down" >
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<script>
    /**
     * 消息类型可选项
     */
    const typeEnum = ['success', 'warn', 'error']
</script>

<script setup>
    import { ref, onMounted } from 'vue'
    const props = defineProps({
        /**
         * message 的消息类型
         */
        type: {
            type: String,
            default: 'success',
            validator(val) {
                const result = typeEnum.includes(val)
                if (!result) {
                    throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
                }
                return result
            }
        },
        /**
         * 描述文本
         */
        content: {
            type: String,
            required: true
        },
        /**
         * 展示时长
         */
        duration: {
            type: Number
        },
        /**
         * 关闭时的回调
         */
        destroy: {
            type: Function
        }
    })

    // 样式表数据
    const styles = {
        // 警告
        warn: {
            icon: 'warn',
            fillClass: 'fill-warn-300',
            textClass: 'text-warn-300',
            containerClass:
            'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
        },
        // 错误
        error: {
            icon: 'error',
            fillClass: 'fill-error-300',
            textClass: 'text-error-300',
            containerClass:
            'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
        },
        // 成功
        success: {
            icon: 'success',
            fillClass: 'fill-success-300',
            textClass: 'text-success-300',
            containerClass:
            'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
        }
    }

    //信息弹窗动画时间变量
    const animDuration = '0.5s'

    // 控制显示处理
    const isVisable = ref(false)
    /**
     * 保证动画展示，需要在 mounted 之后进行展示
     */
    onMounted(() => {
        isVisable.value = true
        /**
         * 延迟时间关闭
         */
        setTimeout(() => {  
            isVisable.value = false

            //此处使用两个定时器的原因在于前者定时器用于触发整体回调逻辑的执行，后者用于与触发动画的起点进行分割，动画完毕后立即销毁组件，需要注意的是destroy是直接卸载不会触发动画，整个都没了，所以需要使用
            //v-show控制动画的开始

            // 延时销毁
            setTimeout(
              props.destroy,
              parseInt(animDuration.replace('0.', '').replace('s', '')) * 100
            )
        }, props.duration)
    })
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>