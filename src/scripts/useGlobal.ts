import { defineStore } from "pinia";
import { ClockConfig } from "vue3clock";
import { shallowMerge } from "@/scripts/util";

// 时钟默认样式
export const defaultClockStyle: Partial<ClockConfig> = {
    dialStroke: '#fff',
    numberText: 'Roma',
    numberColor: '#fff',
    hourStroke: '#91cc75',
    minuteStroke: '#fac858',
    secondStroke: '#ee6666',
}

export const useGlobal = defineStore({
    id: 'global',
    state() {
        return {
            // 时钟样式
            clockStyle: {
                dialStroke: '#fff',
                numberText: 'Roma' as 'Arab' | 'Roma',
                numberColor: '#fff',
                hourStroke: '#91cc75',
                minuteStroke: '#fac858',
                secondStroke: '#ee6666',
            } as Partial<ClockConfig>,
        }
    },
    actions: {
        // 部分更新时钟样式
        mergeClockStyle(styles: Partial<ClockConfig>) {
            this.clockStyle = shallowMerge(styles, this.clockStyle as Readonly<ClockConfig>)
        },
        // 使用默认配置
        useDefault() {
            this.clockStyle = defaultClockStyle
        }
    }
})