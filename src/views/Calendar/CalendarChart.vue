<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { CalendarRenderer } from "@/scripts/useCalendar";

const emits = defineEmits<{
    (ev: 'chart-ready', renderer: CalendarRenderer): void
}>()

const chartDOM = ref<HTMLDivElement | null>(null)
const chartRenderer = shallowRef<CalendarRenderer | null>(null)

const doRender = (el: HTMLDivElement) => {
    const calendar = new CalendarRenderer(el)
    chartRenderer.value = calendar
    calendar.render(2022, 7, [
        {date: '2022-7-2', count: 3},
        {date: '2022-7-12', count: 6},
        {date: '2022-7-24', count: 10},
        {date: '2022-7-5', count: 50},
    ])
    emits('chart-ready', calendar)
}

onMounted(() => {
    const dom = chartDOM.value

    // 等待切换动画结束再获取值
    setTimeout(() => {
        if(!!dom) doRender(dom)
    }, 500)
})
onBeforeUnmount(() => {
    chartRenderer.value?.dispose()
})
</script>

<template>
    <div class="calendar-chart">
        <div class="chart" ref="chartDOM"/>
    </div>
</template>

<style lang="scss" scoped>
.calendar-chart {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .chart {
        position: relative;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        margin: 10px 10px;
    }
}
</style>