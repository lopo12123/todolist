<script lang="ts" setup>
import Vue3Clock, { ClockConfig } from "vue3clock";

const clockStyle: Partial<ClockConfig> = {
    dialStroke: '#fff',
    numberStyle: 'fill',
    numberText: 'Roma',
    numberColor: '#fff',
    hourStroke: '#91cc75',
    minuteStroke: '#fac858',
    secondStroke: '#ee6666',
}
</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <div class="clock-container"
             data-tauri-drag-region>
            <Vue3Clock :config="clockStyle"/>
        </div>
        <div class="overview-container"
             data-tauri-drag-region>
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
    border: solid 2px #eee;
    border-radius: 8px;
    background: #0006;
    cursor: move;
    overflow: hidden;
    display: flex;
    align-content: center;
    justify-content: space-between;

    &:hover {
        border: solid 2px #eee;
    }

    .clock-container {
        position: relative;
        width: 200px;
        height: 100%;
        cursor: move;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .overview-container {
        position: relative;
        width: calc(100% - 200px);
        height: 100%;
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>