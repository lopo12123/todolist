<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

export interface ClockConfig {
    /**
     * @description 表盘
     */
    dial?: {
        /**
         * @description 半径 (px)
         * @default 75
         */
        radius?: number
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #777777
         */
        stroke?: string
        /**
         * @description 粗细 (px)
         * @default 2
         */
        strokeWidth?: number
    }
    /**
     * @description 时针
     */
    hour?: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.5
         */
        percent?: number
        /**
         * @description 反向长度 (px)
         * @default 3
         */
        tail?: number
        /**
         * @description 颜色 HEX in #RRGGBB
         * @default #333333
         */
        stroke?: string
        /**
         * @description 粗细 (px)
         * @default 5
         */
        strokeWidth?: number
    }
    /**
     * @description 分针
     */
    minute?: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.6
         */
        percent?: number
        /**
         * @description 反向长度 (px)
         * @default 4
         */
        tail?: number
        /**
         * @description 颜色 HEX in #RRGGBB
         * @default #444444
         */
        stroke?: string
        /**
         * @description 粗细 (px)
         * @default 4
         */
        strokeWidth?: number
    }
    /**
     * @description 秒针
     */
    second?: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.6
         */
        percent?: number
        /**
         * @description 反向长度 (px)
         * @default 5
         */
        tail?: number
        /**
         * @description 颜色 HEX in #RRGGBB
         * @default #555555
         */
        stroke?: string
        /**
         * @description 粗细 (px)
         * @default 3
         */
        strokeWidth?: number
    }
    /**
     * @description 数字类型
     */
    number?: 'roma' | 'arab'
}

const {config} = withDefaults(defineProps<{
    config?: ClockConfig
}>(), {
    config: () => ({
        dial: {
            radius: 75,
            stroke: '#777777',
            strokeWidth: 2
        },
        hour: {
            percent: 0.5,
            tail: 3,
            stroke: '#333333',
            strokeWidth: 5
        },
        minute: {
            percent: 0.6,
            tail: 4,
            stroke: '#444444',
            strokeWidth: 4
        },
        second: {
            percent: 0.6,
            tail: 5,
            stroke: '#555555',
            strokeWidth: 3
        },
        number: 'roma',
    })
})

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

    if (dialCanvas && pointerCanvas) {
        renderDial(dialCanvas)
        renderPointer(pointerCanvas)
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
        inset: 0;
        border: solid 1px #333333;
    }

    .front {
        z-index: 2;
    }

    .back {
        z-index: 1;
    }
}
</style>