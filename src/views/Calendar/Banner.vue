<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const jump = (name: string) => {
    router.push({ name })
}
</script>

<template>
    <div class="banner">
        <button @click="jump('Specific')">Specific</button>
        <button @click="jump('Overview')">Overview</button>
        <button @click="jump('Create')">Create</button>
        <button @click="jump('Setting')">Setting</button>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>