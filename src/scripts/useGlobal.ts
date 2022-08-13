import { defineStore } from "pinia";
import { ClockConfig } from "vue3clock";
import { shallowMerge } from "@/scripts/util";

// 时钟默认样式
export const defaultClockStyle: Partial<ClockConfig> = {
    dialStroke: '#fffccf',
    numberText: 'Roma',
    numberColor: '#ffffff',
    hourStroke: '#91cc75',
    minuteStroke: '#fac858',
    secondStroke: '#ee6666',
}

export const useGlobal = defineStore({
    id: 'global',
    state() {
        return {
            // 时钟样式
            clockStyle: defaultClockStyle as Partial<ClockConfig>,
        }
    },
    actions: {
        // 部分更新时钟样式
        mergeClockStyle(styles: Partial<ClockConfig>) {
            this.clockStyle = shallowMerge(styles, this.clockStyle as Readonly<ClockConfig>)
            localStorage.setItem('clock-style', JSON.stringify(this.clockStyle))
        },
        // 使用默认配置
        useDefault() {
            this.mergeClockStyle(defaultClockStyle)
        }
    }
})