<script lang="ts" setup>
import { useRouter } from "vue-router";

export type SettingEmitType = 'do-default' | 'do-rollback' | 'do-apply' | 'back'
const emits = defineEmits<{
    (ev: 'btn-ev', type: SettingEmitType): void
    (ev: 'direct-back'): void
}>()

const router = useRouter()
const back = () => {
    emits('direct-back')
    router.push({ name: 'Calendar' })
}
</script>

<template>
    <div class="banner">
        <div class="banner-btn with-hover" title="使用默认设置"
             @click="emits('btn-ev', 'do-default')">
            Default
        </div>
        <div class="banner-btn with-hover" title="重置当前修改项"
             @click="emits('btn-ev','do-rollback')">
            Reset
        </div>
        <div class="banner-btn with-hover" title="应用当前修改项"
             @click="emits('btn-ev','do-apply')">
            Apply
        </div>
        <div class="banner-btn with-hover" title="返回首页"
             @click="back">
            Back
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    color: #ccc;
    font-size: 16px;
    font-family: UniDream-LED;
    text-shadow: #000 1px 1px 1px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>