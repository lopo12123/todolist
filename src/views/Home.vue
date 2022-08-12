<script lang="ts" setup>
import { shallowRef } from "vue";
import { useGlobal } from "@/scripts/useGlobal";
import Vue3Clock, { UseClock } from "vue3clock";

const globalStore = useGlobal()

const clock = shallowRef<UseClock | null>(null)
const bindClock = (instance: UseClock) => {
    clock.value = instance
}

// 重绘时钟
const rerenderClock = () => {
    clock.value?.rerender(globalStore.clockStyle)
}
</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <div class="clock-container"
             data-tauri-drag-region>
            <Vue3Clock
                :config="{
                    ...globalStore.clockStyle,
                    numberStyle: 'fill'
                }"
                @clock-ready="bindClock"/>
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