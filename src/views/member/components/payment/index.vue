<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobile" :payData="payData"></pc-payment-vue>
    <!-- 移动端支付 -->
    <mobile-payment-vue v-else :payData="payData"></mobile-payment-vue>

  </div>
</template>

<script>
  export default {
    name:'p-i'
  }
</script>

<script setup>
  import { isMobile } from '@/utils/flexible'
  import pcPaymentVue from './pc-payment/index.vue'
  import mobilePaymentVue from './mobile-payment/index.vue'


  defineProps({
    payData: Object
  })
</script>