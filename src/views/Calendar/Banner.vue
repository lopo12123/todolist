<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter()

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)
const doSwitch = (type: 'year+' | 'month+' | 'year-' | 'month-') => {

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
    display: flex;
    align-items: center;
    justify-content: space-evenly;

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
            color: #777;
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