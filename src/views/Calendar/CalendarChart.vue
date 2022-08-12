<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { CalendarRenderer, CalendarTodoData } from "@/scripts/useCalendar";
import { useTodoList } from "@/scripts/useTodo";

const emits = defineEmits<{
    (ev: 'calendar-ready', renderer: CalendarRenderer): void
}>()

const chartDOM = ref<HTMLDivElement | null>(null)
const chartRenderer = shallowRef<CalendarRenderer | null>(null)

const doRender = (el: HTMLDivElement) => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1

    const recordList: CalendarTodoData[] = useTodoList()
        .getMonthSummary(year, month)
        .map(day => ({ date: day.date, count: day.records.length }))

    const calendar = new CalendarRenderer(el)
    chartRenderer.value = calendar
    calendar.render(year, month, recordList)

    emits('calendar-ready', calendar)
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