<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner from "./Create/Banner.vue";
import CreateTodo from "@/views/Create/CreateTodo.vue";


</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner/>
        </template>
        <template #body>
            <CreateTodo/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>