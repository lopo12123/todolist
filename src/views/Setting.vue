<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner from "./Setting/Banner.vue";
import SettingView from "./Setting/SettingView.vue";

</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner/>
        </template>
        <template #body>
            <SettingView/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>