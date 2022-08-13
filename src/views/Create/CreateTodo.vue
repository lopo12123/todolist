<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TodoRecord } from "@/scripts/useTodo";

const emits = defineEmits<{
    (ev: 'editor-ready', controller: {
        doClean: () => void,
        doGet: () => TodoRecord
    }): void
}>()

const initTemplate = {
    due: Date.now(),
    create: Date.now(),
    title: '',
    desc: ''
}
const newTodo = ref<TodoRecord>(initTemplate)

const formatDate = (t: number) => {
    const _date = new Date(t)
    return `${ _date.getFullYear() }年`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }月`
        + `${ (_date.getDate() + '').padStart(2, '0') }日`
        + ` ${ (_date.getHours() + '').padStart(2, '0') }`
        + `:${ (_date.getMinutes() + '').padStart(2, '0') }`
        + `:${ (_date.getSeconds() + '').padStart(2, '0') }`
}

onMounted(() => {
    emits('editor-ready', {
        doClean: () => {
            newTodo.value = initTemplate
        },
        doGet: () => {
            return newTodo.value
        }
    })
})
</script>

<template>
    <div class="create-todo">
        <div class="single-line text-inline">
            <div class="label">创建时间</div>
            <div style="opacity: 0.5">{{ formatDate(newTodo.create) }}</div>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办时间</div>
            <div>{{ formatDate(newTodo.due) }}</div>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办事项</div>
            <div>{{ newTodo.title }}</div>
        </div>
        <div class="multiple-line text-inline">
            <div class="label">备注(选)</div>
            <div>{{ newTodo.desc }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.create-todo {
    position: relative;
    width: 100%;
    height: 100%;
    color: #eee;
    padding: 10px 20px;
    font-family: PixelFont;
    text-shadow: #000 2px 1px 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .label {
        width: 80px;
        line-height: 24px;
    }

    .single-line {
        position: relative;
        width: 100%;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .multiple-line {
        position: relative;
        width: 100%;
        height: 48px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }
}
</style>