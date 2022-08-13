<script lang="ts" setup>
import { useRouter } from "vue-router";

export type CreateEmitType = 'create' | 'clear'

const emits = defineEmits<{
    (ev: 'btn-ev', type: CreateEmitType): void
}>()

const router = useRouter()

const back = () => {
    router.push({ name: 'Calendar' })
}
</script>

<template>
    <div class="banner">
        <div class="banner-btn with-hover" title="新建当前代办"
             @click="emits('btn-ev','create')">
            Create
        </div>
        <div class="banner-btn with-hover" title="清空已填写内容"
             @click="emits('btn-ev','clear')">
            Clear
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