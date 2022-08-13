<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner, { SettingEmitType } from "./Setting/Banner.vue";
import SettingView from "./Setting/SettingView.vue";
import { defaultClockStyle, useGlobal } from "@/scripts/useGlobal";
import { ClockConfig } from "vue3clock";
import { ref } from "vue";

const emits = defineEmits<{
    (ev: 'rerender-clock', renderOption: Partial<ClockConfig>): void
}>()

const globalStore = useGlobal()

// region banner 部分
const solveEmits = (emitType: SettingEmitType) => {
    if(emitType === 'use-default') {
        globalStore.useDefault()
        emits('rerender-clock', defaultClockStyle)
    }
    else if(emitType === 'do-rollback') {
        clockStyles.value = globalStore.clockStyle
        emits('rerender-clock', globalStore.clockStyle)
    }
    else if(emitType === 'do-apply') {
        globalStore.mergeClockStyle(clockStyles.value)
    }
    else if(emitType === 'back') {
        emits('rerender-clock', globalStore.clockStyle)
    }
}
// endregion

// region 列表部分
const clockStyles = ref<Partial<ClockConfig>>(globalStore.clockStyle)
const doPreviewRender = () => {
    emits('rerender-clock', clockStyles.value)
}
// endregion
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner @btn-ev="solveEmits"/>
        </template>
        <template #body>
            <SettingView
                :dial-stroke="clockStyles.dialStroke"
                :number-text="clockStyles.numberText"
                :number-color="clockStyles.numberColor"
                :hour-stroke="clockStyles.hourStroke"
                :minute-stroke="clockStyles.minuteStroke"
                :second-stroke="clockStyles.secondStroke"
                @do-preview="doPreviewRender"/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>