<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef, watch, WatchStopHandle } from "vue";
import WithBanner from "@/layouts/WithBanner.vue";
import Banner, { SettingEmitType } from "./Setting/Banner.vue";
import SettingView from "./Setting/SettingView.vue";
import { defaultClockStyle, useGlobal } from "@/scripts/useGlobal";
import { ClockConfig } from "vue3clock";
import { usePopup } from "@/scripts/usePopup";
import { doNotification } from "@/scripts/useTauri";
import { useRouter } from "vue-router";

const emits = defineEmits<{
    (ev: 'rerender-clock', renderOption: Partial<ClockConfig>): void
}>()

const router = useRouter()
const globalStore = useGlobal()
const popupStore = usePopup()

// 是否有修改未应用
const ifEdit = ref(false)

// region banner 部分
const solveEmits = (emitType: SettingEmitType) => {
    if(emitType === 'do-default') {
        popupStore.showPopup('confirm', {
            message: '重置为默认样式?',
            left: {
                label: '取消',
                cb() {
                    doNotification('并没有重置', '下次想想清楚!')
                }
            },
            right: {
                label: '确认',
                cb() {
                    for (let k in defaultClockStyle) {
                        // @ts-ignore
                        clockStyles.value[k] = defaultClockStyle[k]
                    }
                    globalStore.useDefault()
                    // 应用后清楚修改未应用标识
                    ifEdit.value = false
                    emits('rerender-clock', defaultClockStyle)
                }
            }
        })
    }
    else if(emitType === 'do-rollback') {
        popupStore.showPopup('confirm', {
            message: '取消当前更改?',
            left: {
                label: '取消',
                cb() {
                    doNotification('并没有取消', '下次想想清楚!')
                }
            },
            right: {
                label: '确认',
                cb() {
                    for (let k in globalStore.clockStyle) {
                        // @ts-ignore
                        clockStyles.value[k] = globalStore.clockStyle[k]
                    }
                    // 应用后清楚修改未应用标识
                    ifEdit.value = false
                    emits('rerender-clock', globalStore.clockStyle)
                }
            }
        })
    }
    else if(emitType === 'do-apply') {
        popupStore.showPopup('confirm', {
            message: '应用当前更改?',
            left: {
                label: '取消',
                cb() {
                    doNotification('并没有应用', '下次想想清楚!')
                }
            },
            right: {
                label: '确认',
                cb() {
                    globalStore.mergeClockStyle(clockStyles.value)
                    // 应用后清楚修改未应用标识
                    ifEdit.value = false
                    doNotification('应用成功', '样式已修改')
                }
            }
        })
    }
    else if(emitType === 'back') {
        if(ifEdit.value) {
            popupStore.showPopup('confirm', {
                message: '有修改未确认, 直接返回?',
                left: {
                    label: '取消',
                    cb() {
                        doNotification('并没有返回', '下次想想清楚!')
                    }
                },
                right: {
                    label: '确认',
                    cb() {
                        router.push({ name: 'Calendar' })
                        emits('rerender-clock', globalStore.clockStyle)
                    }
                }
            })
        }
        else {
            router.push({ name: 'Calendar' })
            emits('rerender-clock', globalStore.clockStyle)
        }
    }
}
// endregion

// region 列表部分
const clockStyles = ref<Partial<ClockConfig>>(globalStore.clockStyle)
const cancelWatch = shallowRef<WatchStopHandle | null>(null)
// endregion

onMounted(() => {
    cancelWatch.value = watch(clockStyles.value, (_) => {
        if(!ifEdit.value) ifEdit.value = true
        emits('rerender-clock', clockStyles.value)
    })
})
onBeforeUnmount(() => {
    cancelWatch.value?.()
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
                v-model:second-stroke="clockStyles.secondStroke"/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>