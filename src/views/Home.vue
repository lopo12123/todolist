<script lang="ts" setup>
import Vue3Clock from "vue3clock";
</script>

<template>
    <div class="home-view"
         data-tauri-drag-region>
        <div class="clock-container">
            <Vue3Clock/>
        </div>
        <div class="overview-container">
            <router-view v-slot="{Component}">
                <transition name="slide" mode="out-in">
                    <component :is="Component"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-view {
    position: relative;
    width: 100%;
    height: 100%;
    border: solid 1px #333;
    border-radius: 8px;
    display: flex;
    align-content: center;
    justify-content: space-between;

    .clock-container {
        position: relative;
        width: 200px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .overview-container {
        position: relative;
        width: calc(100% - 200px);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
            content: "";
            width: 1px;
            height: 80%;
            background-color: #ccc;
        }
    }
}
</style>