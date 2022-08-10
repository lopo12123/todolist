<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const jump = (name: string) => {
    router.push({ name })
}
</script>

<template>
    <div class="calendar-view">
        <button @click="jump('Specific')">To Specific</button>
        <br>
        <button @click="jump('Overview')">To Overview</button>
        <br>
        <button @click="jump('Create')">To Create</button>
        <br>
        <button @click="jump('Setting')">To Setting</button>
        <br>

        <span>echarts 日历</span>
    </div>
</template>

<style lang="scss" scoped>
.calendar-view {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: antiquewhite;

}
</style>