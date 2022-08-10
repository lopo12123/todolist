<script lang="ts" setup>
import Clock from "@/components/Clock/Clock.vue";
import { ClockConfig } from "@/components/Clock/useClock";

const clockConfig: Partial<ClockConfig> = {
    dialRadius: 75
}
</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <div class="clock-container">
            <Clock :config="clockConfig"/>
        </div>
        <div class="overview-container">
            <router-view v-slot="{Component}">
                <transition name="slide" mode="out-in">
                    <component :is="Component"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-view {
    position: relative;
    width: 100%;
    height: 100%;
    border: solid 1px #333;
    border-radius: 8px;
    display: flex;
    align-content: center;
    justify-content: space-between;

    .clock-container {
        position: relative;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .overview-container {
        position: relative;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>