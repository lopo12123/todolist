<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner from "./Create/Banner.vue";
import CreateTodo from "@/views/Create/CreateTodo.vue";
import { CreateEmitType } from "@/views/Create/Banner.vue";

const solveBtnEv = (type: CreateEmitType) => {
    console.log(type)
}
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner @btn-ev="solveBtnEv"/>
        </template>
        <template #body>
            <CreateTodo/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>