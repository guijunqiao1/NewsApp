<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobile"></pc-payment-vue>
  </div>
</template>

<script setup>
    import { isMobile } from '@/utils/flexible'
    import pcPaymentVue from './pc-payment/index.vue'
</script>