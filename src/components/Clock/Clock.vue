<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { ClockConfig, UseClock } from "@/components/Clock/useClock";
import { DeepPartial, DeepRequired } from "@/scripts/util";

const { config } = withDefaults(defineProps<{
    config?: DeepPartial<ClockConfig>
}>(), {
    config: () => ({
        dial: {
            radius: 75,
            stroke: '#777777',
            strokeWidth: 1
        },
        hour: {
            percent: 0.5,
            tail: 3,
            stroke: '#555555',
            strokeWidth: 4
        },
        minute: {
            percent: 0.6,
            tail: 4,
            stroke: '#444444',
            strokeWidth: 3
        },
        second: {
            percent: 0.7,
            tail: 5,
            stroke: '#555555',
            strokeWidth: 2
        },
        number: {
            show: true,
            text: 'Arab',
            style: 'stroke',
            color: '#333333'
        },
    })
})

const clock = shallowRef<UseClock | null>(null)
const pointer = ref<HTMLCanvasElement | null>(null)
const dial = ref<HTMLCanvasElement | null>(null)

const timerId = ref<any>()
const renderPointer = (pointerEl: HTMLCanvasElement) => {
    const _date = new Date()
    const _h = _date.getHours()
    const _m = _date.getMinutes()
    const _s = _date.getSeconds()

    // 时针
}

const renderDial = (dialEl: HTMLCanvasElement) => {
    const ctx = dialEl.getContext('2d')!
    // 表盘外圈
    const radius = config.dial!.radius!
    ctx.strokeStyle = config.dial!.stroke!
    console.log(config.dial!.stroke!)
    ctx.beginPath()
    ctx.arc(radius, radius, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    // 刻度
}
onMounted(() => {
    const dialCanvas = dial.value
    const pointerCanvas = pointer.value

    if(dialCanvas && pointerCanvas) {
        const _clock = new UseClock(dialCanvas, pointerCanvas, config as DeepRequired<ClockConfig>)
        _clock.renderDial()
            .renderPointer()
        clock.value = _clock
        // renderDial(dialCanvas)
        // renderPointer(pointerCanvas)
    }
})
onBeforeUnmount(() => {
    clearInterval(timerId.value)
})
</script>

<template>
    <div class="clock"
         :style="`width: ${config.dial.radius * 2}px; height: ${config.dial.radius * 2}px;`">
        <canvas class="clock-canvas front" ref="pointer"
                :width="config.dial.radius * 2"
                :height="config.dial.radius * 2"/>
        <canvas class="clock-canvas back" ref="dial"
                :width="config.dial.radius * 2"
                :height="config.dial.radius * 2"/>
    </div>
</template>

<style lang="scss" scoped>
.clock {
    position: relative;
    display: flex;
    align-content: center;
    justify-content: center;

    .clock-canvas {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .front {
        z-index: 2;
    }

    .back {
        z-index: 1;
    }
}
</style>