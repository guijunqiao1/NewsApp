<template>
  <div class="relative">
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-1 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script>
    //属性名枚举
    const TYPE_TEXT = 'text'
    const TYPE_TEXTAREA = 'textarea'

</script>

<script setup>
    import { useVModel } from '@vueuse/core'
    import { computed } from 'vue'
    

    const props = defineProps({
        modelValue: {
            required: true,
            type: String
        },
        type: {
            type: String,
            default: TYPE_TEXT,
            validator(value) {
                const arr = [TYPE_TEXT, TYPE_TEXTAREA]
                const result = arr.includes(value)
                if (!result) {
                    throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
                }
                return result
            }
        },
        max: {
            type: [String, Number]
        }
    })

    // 输入的字符
    const text = useVModel(props);//注意该方法简写的含义：
    // const props = defineProps(['modelValue'])
    // const emit = defineEmits(['update:modelValue'])
    // 这种情况下modelValue为绑定的变量名
    // // 一行搞定
    // const value = useVModel(props, 'modelValue', emit)--针对-v-model的简写可以直接是上述的props的形式

    // 输入的字符数
    const currentNumber = computed(() => {
      const now_len = text.value?text.value.length:0;
      return now_len;
    })
</script>

<style lang="scss" scoped></style>