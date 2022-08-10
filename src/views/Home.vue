<script lang="ts" setup>
import { useRouter } from "vue-router";
import Clock from "@/components/Clock/Clock.vue";

const router = useRouter()

</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <Clock/>
    </div>
</template>

<style lang="scss" scoped>
.home-view {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px;
    border: solid 1px #333;
    border-radius: 8px;
}
</style>