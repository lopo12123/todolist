<script lang="ts" setup>
import { shallowRef } from "vue";
import Banner, { YM } from "./Calendar/Banner.vue";
import CalenderChart from "./Calendar/CalendarChart.vue";
import WithBanner from "../layouts/WithBanner.vue";
import type { CalendarRenderer, CalendarTodoData } from "@/scripts/useCalendar";
import { useTodoList } from "@/scripts/useTodo";

const switchMonth = ({ year, month }: YM) => {
    const recordList: CalendarTodoData[] = useTodoList()
        .getMonthSummary(year, month)
        .map(day => ({ date: day.date, count: day.records.length }))
    renderer.value?.render(year, month, recordList)
}

const renderer = shallowRef<CalendarRenderer | null>(null)
const bindRenderer = (instance: CalendarRenderer) => {
    renderer.value = instance
}
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner @month-change="switchMonth"/>
        </template>
        <template #body>
            <CalenderChart @calendar-ready="bindRenderer"/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>