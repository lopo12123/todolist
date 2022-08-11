<script lang="ts" setup>

</script>

<template>
    <div class="with-banner-layout">
        <div class="banner-container">
            <slot name="banner"/>
        </div>
        <div class="body-container">
            <slot name="body"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.with-banner-layout {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .banner-container {
        position: relative;
        width: 100%;
        height: 40px;
    }

    .body-container {
        position: relative;
        width: 100%;
        height: calc(100% - 40px);
    }
}
</style>