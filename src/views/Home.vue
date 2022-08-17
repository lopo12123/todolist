<script lang="ts" setup>
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import { useGlobal } from "@/scripts/useGlobal";
import Vue3Clock, { ClockConfig, UseClock } from "vue3clock";
import { useTodoList } from "@/scripts/useTodo";
import PopupLayer from "@/layouts/PopupLayer.vue";
import { listen } from "@tauri-apps/api/event";
import { closeWindow, doNotification } from "@/scripts/useTauri";
import { useRouter } from "vue-router";

const router = useRouter()
const globalStore = useGlobal()

try {
    const clockStyleIfExist = localStorage.getItem('clock-style')
    if(clockStyleIfExist) globalStore.mergeClockStyle(JSON.parse(clockStyleIfExist))
}
catch (e: any) {
    doNotification('初始化错误', e.toString())
}

const clock = shallowRef<UseClock | null>(null)
const bindClock = (instance: UseClock) => {
    clock.value = instance
}

// 重绘时钟
const rerenderClock = (renderOption: Partial<ClockConfig>) => {
    clock.value?.rerender(renderOption)
}

onMounted(() => {
    listen<'pin' | 'unpin' | 'quit'>("tray", ({ payload }) => {
        switch(payload) {
            case 'pin':
                doNotification('窗口设置', '当前窗口将始终保持最前!')
                break
            case 'unpin':
                doNotification('窗口设置', '当前窗口已取消保持最前!')
                break
            case 'quit':
                closeWindow(router)
                break
        }
    })
})
onBeforeUnmount(() => {
    useTodoList().close()
})
</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <transition name="fade" mode="in-out">
            <PopupLayer/>
        </transition>

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
                    <component :is="Component" @rerender-clock="rerenderClock"/>
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