<script lang="ts" setup>
import { usePopup } from "@/scripts/usePopup";
import { computed } from "vue";
import { useTodoList } from "@/scripts/useTodo";
import { doNotification } from "@/scripts/useTauri";

// 格式化时间显示
const formatDate = (t: number) => {
    const _date = new Date(t)
    return `${ _date.getFullYear() }年`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }月`
        + `${ (_date.getDate() + '').padStart(2, '0') }日`
        + ` ${ (_date.getHours() + '').padStart(2, '0') }`
        + `:${ (_date.getMinutes() + '').padStart(2, '0') }`
        + `:${ (_date.getSeconds() + '').padStart(2, '0') }`
}

const popupStore = usePopup()
const popupData = computed(() => {
    return popupStore.popupData
})
</script>

<template>
    <div class="popup-layer" v-if="popupStore.popupVisible">
        <div class="close-btn" title="关闭"
             @click="popupStore.hidePopup">
            ×
        </div>
        <div class="popup-panel">
            <div class="popup-line text-inline">
                <div class="label">待办事项</div>
                <div class="value" :title="popupData.title">
                    {{ popupData.title }}
                </div>
            </div>
            <div class="popup-line text-inline">
                <div class="label">描述(选)</div>
                <div class="value" :title="popupData.desc">
                    {{ popupData.desc || '——' }}
                </div>
            </div>
            <div class="popup-line text-inline">
                <div class="label">待办时间</div>
                <div class="value">{{ formatDate(popupData.due) }}</div>
            </div>
            <div class="popup-line text-inline">
                <div class="label">建立时间</div>
                <div class="value">{{ formatDate(popupData.create) }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popup-layer {
    position: absolute;
    z-index: 5000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #0007;
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-panel {
        position: relative;
        width: calc(100% - 200px);
        height: calc(100% - 100px);
        border: solid 2px #ccc;
        border-radius: 5px;
        background-color: #0003;
        color: #eee;
        font-family: PixelFont;
        text-shadow: #000 2px 1px 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        .popup-line {
            position: relative;
            width: calc(100% - 20px);
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .label {
                width: 80px;
            }

            .value {
                width: calc(100% - 80px);
            }
        }
    }

    .close-btn {
        position: absolute;
        z-index: 5001;
        width: 20px;
        height: 20px;
        top: 52px;
        right: 102px;
        color: #93ce07;
        font-family: "Times New Roman";
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.5s;
        transform-origin: center center;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            transform: rotate(-360deg);
        }
    }
}
</style>