<script lang="ts" setup>

import { useTodoList } from "@/scripts/useTodo";

const doCursor = () => {
    useTodoList()
        .getTodoRecord_keyword('1 1')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
</script>

<template>
    <div class="overview-summary">
        <button @click="doCursor">cursor</button>
    </div>
</template>

<style lang="scss" scoped>
.overview-summary {
    position: relative;
    width: 100%;
    height: 100%;

    color: #fff;
}
</style>