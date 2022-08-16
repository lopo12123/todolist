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

const confirmConfig = computed(() => {
    return popupStore.confirmConfig
})
const doConfirmCallback = (type: 'left' | 'right') => {
    confirmConfig.value[type].cb()
    popupStore.hidePopup()
}

const popupData = computed(() => {
    return popupStore.popupData
})
</script>

<template>
    <div class="popup-layer"
         v-if="popupStore.popupVisible"
         data-tauri-drag-region>
        <div class="close-btn" title="关闭"
             @click="popupStore.hidePopup">
            ×
        </div>

        <div class="detail-container" v-if="popupStore.popupType === 'detail'">
            <div class="popup-line ">
                <div class="label">待办事项</div>
                <div class="value text-inline" :title="popupData.title">
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

        <div class="confirm-container"
             v-if="popupStore.popupType === 'confirm'">
            <div class="message">
                {{ confirmConfig.message }}
            </div>
            <div class="btn-group">
                <div class="left" @click="doConfirmCallback('left')">
                    {{ confirmConfig.left.label || '取消' }}
                </div>
                <div class="right" @click="doConfirmCallback('right')">
                    {{ confirmConfig.right.label || '确认' }}
                </div>
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

    .detail-container {
        position: relative;
        width: calc(100% - 200px);
        height: calc(100% - 100px);
        border: solid 2px #ccc;
        border-radius: 5px;
        background-color: #0003;
        color: #eee;
        font-family: PixelFont;
        text-shadow: #000 2px 1px 1px;
        cursor: default;
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
                padding-right: 20px;
            }
        }
    }

    .confirm-container {
        position: relative;
        width: calc(100% - 200px);
        height: calc(100% - 100px);
        border: solid 2px #ccc;
        border-radius: 5px;
        background-color: #0003;
        color: #eee;
        font-family: PixelFont;
        text-shadow: #000 2px 1px 1px;
        cursor: default;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        .message {
            position: relative;
            width: 100%;
            text-align: center;
        }

        .btn-group {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .left, .right {
                position: relative;
                width: 80px;
                padding: 3px 5px;
                border: solid 1px #ccc;
                border-radius: 2px;
                text-align: center;
                cursor: pointer;
                opacity: 0.7;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
</style>