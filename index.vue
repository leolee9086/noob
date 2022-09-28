<script setup>
import {ref} from 'vue'
import { NButton } from 'naive-ui'

const props = defineProps({
    foo: { type: String, required: true },
    bar: Number
})

</script>
    
<template>
    <n-button @click="count++">Count is: {{ count }}</n-button>
</template>
    
<style scoped>
button {
    font-weight: bold;
}
</style>
    