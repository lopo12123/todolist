<script lang="ts" setup>
const emits = defineEmits<{
    (ev: 'do-preview'): void
}>()
const props = defineProps<{
    dialStroke: string
    numberText: 'Arab' | 'Roma'
    numberColor: string
    hourStroke: string
    minuteStroke: string
    secondStroke: string
}>()
</script>

<template>
    <div class="setting-view">
        <div class="setting-line">颜色</div>
        <div class="setting-line">数字类型</div>
        <div class="setting-line">欢迎</div>
        <div class="setting-line">4</div>
    </div>
</template>

<style lang="scss" scoped>
.setting-view {
    position: relative;
    width: 100%;
    height: 100%;
    color: #eee;
    font-weight: 300;
    font-family: PixelFont;
    text-shadow: #000 2px 1px 1px;

    .setting-line {
        position: relative;
        width: 100%;
        height: 24px;
        line-height: 24px;
    }
}
</style>