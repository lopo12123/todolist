<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from "vue";
import WithBanner from "@/layouts/WithBanner.vue";
import Banner, { SettingEmitType } from "./Setting/Banner.vue";
import SettingView from "./Setting/SettingView.vue";
import { defaultClockStyle, useGlobal } from "@/scripts/useGlobal";
import { ClockConfig } from "vue3clock";

const emits = defineEmits<{
    (ev: 'rerender-clock', renderOption: Partial<ClockConfig>): void
}>()

const globalStore = useGlobal()

// region banner 部分
const solveEmits = (emitType: SettingEmitType) => {
    if(emitType === 'do-default') {
        for (let k in defaultClockStyle) {
            // @ts-ignore
            clockStyles.value[k] = defaultClockStyle[k]
        }
        globalStore.useDefault()
        emits('rerender-clock', defaultClockStyle)
    }
    else if(emitType === 'do-rollback') {
        for (let k in globalStore.clockStyle) {
            // @ts-ignore
            clockStyles.value[k] = globalStore.clockStyle[k]
        }
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

const cancelWatch = watch(clockStyles.value, (_) => {
    emits('rerender-clock', clockStyles.value)
})

onBeforeUnmount(() => {
    cancelWatch()
})
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner @btn-ev="solveEmits"/>
        </template>
        <template #body>
            <SettingView
                v-model:dial-stroke="clockStyles.dialStroke"
                v-model:number-text="clockStyles.numberText"
                v-model:number-color="clockStyles.numberColor"
                v-model:hour-stroke="clockStyles.hourStroke"
                v-model:minute-stroke="clockStyles.minuteStroke"
                v-model:second-stroke="clockStyles.secondStroke"
                @do-preview="doPreviewRender"/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>