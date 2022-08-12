<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { closeWindow } from "@/scripts/useTauri";

export type YM = { year: number, month: number }

const emits = defineEmits<{
    (ev: 'month-change', ym: YM): void
}>()
const router = useRouter()

const bannerType = ref<'base' | 'operate'>('base')

// region base-banner 部分
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)
const doSwitch = (type: 'year+' | 'month+' | 'year-' | 'month-') => {
    switch(type) {
        case 'year+':
            year.value += 1
            break
        case 'year-':
            year.value -= 1
            break
        case 'month+':
            if(month.value === 12) {
                year.value += 1
                month.value = 1
            }
            else {
                month.value += 1
            }
            break
        case 'month-':
            if(month.value === 1) {
                year.value -= 1
                month.value = 12
            }
            else {
                month.value -= 1
            }
            break
    }
    emits('month-change', { year: year.value, month: month.value })
}
// endregion

// region operate-banner 部分
const jump = (name: string) => {
    router.push({ name })
}

const exitApp = () => {
    closeWindow(router)
}
// endregion
</script>

<template>
    <div class="banner">
        <transition name="collapse">
            <div class="base-banner" v-if="bannerType === 'base'">
                <div class="year">
                    <div class="btn" @click="doSwitch('year-')">-</div>
                    <div class="num">{{ year }}</div>
                    <div class="btn" @click="doSwitch('year+')">+</div>
                </div>
                <div class="month">
                    <div class="btn" @click="doSwitch('month-')">-</div>
                    <div class="num">{{ month.toString().padStart(2, '0') }}</div>
                    <div class="btn" @click="doSwitch('month+')">+</div>
                </div>
                <div class="to-operate" @click="bannerType = 'operate'">operates</div>
            </div>
            <div class="operate-banner" v-else>
                <div class="operate-btn" @click="jump('Create')" title="新建代办">
                    New
                </div>
                <div class="operate-btn" title="总览/查询"
                     @click="jump('Overview')">
                    Overview
                </div>
                <div class="operate-btn" title="设置"
                     @click="jump('Setting')">
                    Setting
                </div>
                <div class="operate-btn" title="返回"
                     @click="bannerType = 'base'">
                    Back
                </div>
                <div class="operate-btn" title="退出"
                     @click="exitApp">
                    Exit
                </div>
            </div>
        </transition>
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

    .base-banner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .year, .month {
            position: relative;
            width: 60px;
            height: 24px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .num {
                width: 40px;
                text-align: center;
            }

            .btn {
                width: 10px;
                height: 100%;
                text-align: center;
                line-height: 24px;
                cursor: pointer;
            }
        }

        .to-operate {
            position: relative;
            width: 60px;
            text-align: center;
            cursor: pointer;
            flex-shrink: 0;
        }
    }

    .operate-banner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .operate-btn {
            position: relative;
            width: fit-content;
            cursor: pointer;
        }
    }
}
</style>