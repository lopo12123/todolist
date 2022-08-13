<script lang="ts" setup>

import { useRouter } from "vue-router";

const router = useRouter()
const back = () => {
    router.push({ name: 'Calendar' })
}
</script>

<template>
    <div class="banner">
        <div class="reset" title="恢复默认设置">Reset</div>
        <div class="confirm with-hover" title="确认修改">
            Confirm
        </div>
        <div class="back" title="返回首页"
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

    .reset, .confirm, .back {
        position: relative;
        width: fit-content;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
    }
}
</style>