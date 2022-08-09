<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

setTimeout(() => {
    router.push({ name: 'Home' })
}, 3000)
</script>

<template>
    <div class="order-list-view">
        OrderList
    </div>
</template>

<style lang="scss" scoped>
.order-list-view {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px;
    border: solid 1px #333;
    border-radius: 8px;
}
</style>