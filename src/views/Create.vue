<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const back = () => {
    router.push({ name: 'Calendar' })
}
</script>

<template>
    <div class="temp-class">
        <button @click="back">返回</button>
        新建
    </div>
</template>

<style lang="scss" scoped>
.temp-class {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: aquamarine;
}
</style>