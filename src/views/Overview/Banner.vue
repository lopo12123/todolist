<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()

const doSwitch = (toName: 'OverviewSummary' | 'OverviewDetail') => {
    router.push({ name: toName })
}
const back = () => {
    router.push({ name: 'Calendar' })
}
</script>

<template>
    <div class="banner">
        <div class="banner-btn with-hover" title="查看统计"
             @click="doSwitch('OverviewSummary')">
            Summary
        </div>
        <div class="banner-btn with-hover" title="查看明细"
             @click="doSwitch('OverviewDetail')">
            Detail
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