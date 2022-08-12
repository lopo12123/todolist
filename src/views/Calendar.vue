<script lang="ts" setup>
import Banner from "./Calendar/Banner.vue";
import CalenderChart from "./Calendar/CalendarChart.vue";
import WithBanner from "../layouts/WithBanner.vue";

</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner/>
        </template>
        <template #body>
<!--            <CalenderChart/>-->
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>