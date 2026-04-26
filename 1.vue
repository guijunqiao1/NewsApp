<template>
    <input type="text" v-model="a">
    <button @click="fn">click</button>
</template>

<script lang="js" setup>
    import { ref } from 'vue';
    const a = ref("");
    function fn() {
        console.log("a:",a.value);
        console.log("b:",this);
    }
</script>
