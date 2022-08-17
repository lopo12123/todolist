<script lang="ts" setup>
import { PropType } from "vue";

type UpdateEmits = 'update:dialStroke'
    | 'update:numberText'
    | 'update:numberColor'
    | 'update:hourStroke'
    | 'update:minuteStroke'
    | 'update:secondStroke'

const emits = defineEmits<{
    (ev: UpdateEmits, val: string | 'Arab' | 'Roma'): void
    // (ev: 'update:dialStroke', val: string): void
    // (ev: 'update:numberText', val: 'Arab' | 'Roma'): void
    // (ev: 'update:numberColor', val: string): void
    // (ev: 'update:hourStroke', val: string): void
    // (ev: 'update:minuteStroke', val: string): void
    // (ev: 'update:secondStroke', val: string): void
}>()
const props = defineProps({
    dialStroke: {
        type: String
    },
    numberText: {
        type: String as PropType<'Arab' | 'Roma'>
    },
    numberColor: {
        type: String
    },
    hourStroke: {
        type: String
    },
    minuteStroke: {
        type: String
    },
    secondStroke: {
        type: String
    }
})

const emitTransfer = (type: UpdateEmits, ev: Event) => {
    emits(type, (ev.target as HTMLInputElement).value)
}
</script>

<template>
    <div class="setting-view">
        <div class="setting-line">
            <div class="label">表盘颜色</div>
            <label class="color-picker-group">
                <div class="color-picker"
                     :style="`background-color: ${dialStroke}`"/>
                <input class="hidden-color-picker" type="color"
                       @change="emitTransfer('update:dialStroke', $event)">
            </label>
        </div>
        <div class="setting-line">
            <div class="label">数字类型</div>
            <div class="number-type-group">
                <div :class="numberText === 'Arab'? 'active-type' : 'default-type'"
                     title="阿拉伯数字(Arabic)" @click="emits('update:numberText', 'Arab')">
                    A
                </div>
                <div :class="numberText === 'Roma' ? 'active-type' : 'default-type'"
                     title="罗马数字(Roma)" @click="emits('update:numberText', 'Roma')">
                    R
                </div>
            </div>
        </div>
        <div class="setting-line">
            <div class="label">数字颜色</div>
            <label class="color-picker-group">
                <div class="color-picker"
                     :style="`background-color: ${numberColor}`"/>
                <input class="hidden-color-picker" type="color"
                       @change="emitTransfer('update:numberColor', $event)">
            </label>
        </div>
        <div class="setting-line">
            <div class="label">时针颜色</div>
            <label class="color-picker-group">
                <div class="color-picker"
                     :style="`background-color: ${hourStroke}`"/>
                <input class="hidden-color-picker" type="color"
                       @change="emitTransfer('update:hourStroke', $event)">
            </label>
        </div>
        <div class="setting-line">
            <div class="label">分针颜色</div>
            <label class="color-picker-group">
                <div class="color-picker"
                     :style="`background-color: ${minuteStroke}`"/>
                <input class="hidden-color-picker" type="color"
                       @change="emitTransfer('update:minuteStroke', $event)">
            </label>
        </div>
        <div class="setting-line">
            <div class="label">秒针颜色</div>
            <label class="color-picker-group">
                <div class="color-picker"
                     :style="`background-color: ${secondStroke}`"/>
                <input class="hidden-color-picker" type="color"
                       @change="emitTransfer('update:secondStroke', $event)">
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.setting-view {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    color: #eee;
    font-family: PixelFont;
    text-shadow: #000 2px 1px 1px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;

    .setting-line {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .color-picker-group {
            position: relative;
            width: 16px;
            height: 16px;

            .color-picker {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: pointer;
            }

            .hidden-color-picker {
                position: absolute;
                z-index: -10;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }

        .number-type-group {
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .active-type {
                font-size: 20px;
                line-height: 20px;
                cursor: pointer;
            }

            .default-type {
                opacity: 0.5;
                cursor: pointer;
            }
        }
    }
}
</style>