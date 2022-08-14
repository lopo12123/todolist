<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner from "./Overview/Banner.vue";
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner/>
        </template>
        <template #body>
            <router-view v-slot="{Component}">
                <transition name="scale" mode="out-in">
                    <component :is="Component"/>
                </transition>
            </router-view>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>
</style>