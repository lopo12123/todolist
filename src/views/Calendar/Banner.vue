<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const emits = defineEmits<{
    // ()
}>()
const router = useRouter()

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
}

const jump = (name: string) => {
    router.push({ name })
}
</script>

<template>
    <div class="banner">
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
        <div class="op-group">
            operates
        </div>
        <!--        <button @click="jump('Specific')">Specific</button>-->
        <!--        <button @click="jump('Overview')">Overview</button>-->
        <!--        <button @click="jump('Create')">Create</button>-->
        <!--        <button @click="jump('Setting')">Setting</button>-->
    </div>
</template>

<style lang="scss" scoped>
.banner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    color: #eee;
    font-size: 16px;
    font-family: UniDream-LED;
    text-shadow: #000 1px 1px 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .year, .month {
        position: relative;
        width: 60px;
        height: 24px;
        user-select: none;
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
}
</style>