<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const jump = () => {
    router.push({ name: 'Overview' })
}
</script>

<template>
    <div class="calendar-view">
        <button @click="jump" style="position:absolute;bottom: 0">To Overview</button>
    </div>
</template>

<style lang="scss" scoped>
.calendar-view {
    position: relative;
    width: 100%;
    height: 100%;

}
</style>