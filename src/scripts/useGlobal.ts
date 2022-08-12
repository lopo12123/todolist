import { defineStore } from "pinia";
import { ClockConfig } from "vue3clock";

// 时钟默认样式
const defaultClockStyle: Partial<ClockConfig> = {
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
            } as Partial<ClockConfig>
        }
    },
    actions: {
        // 重置时钟样式
        resetClockStyle() {
            this.clockStyle = defaultClockStyle
        }
    }
})