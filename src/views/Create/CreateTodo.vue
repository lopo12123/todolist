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

const tt = (e: any) => {
    console.log(e, e.target.value, e.target.valueAsNumber)
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
            <div class="selector" style="opacity: 0.5">
                {{ formatDate(newTodo.create) }}
            </div>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办时间</div>
            <label class="selector">
                <span>{{ formatDate(newTodo.due) }}</span> <br>
                <input type="datetime-local">
            </label>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办事项</div>
            <input class="selector-ipt" type="text"
                   v-model="newTodo.title" maxlength="20"
                   placeholder="字数限制: 20">
        </div>
        <div class="single-line text-inline">
            <div class="label">备注(选)</div>
            <input class="selector-ipt" type="text"
                   v-model="newTodo.desc" maxlength="200"
                   placeholder="字数限制: 200">
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
        position: relative;
        width: 80px;
        height: 24px;
        line-height: 24px;
    }

    .selector {
        position: relative;
        width: calc(100% - 80px);
        height: 24px;
        line-height: 24px;
    }

    .selector-ipt {
        position: relative;
        width: calc(100% - 80px);
        height: 24px;
        line-height: 24px;
        border: none;
        border-bottom: solid 1px #eee;
        background-color: transparent;
        outline: none;
        color: #eee;
        font-family: PixelFont;
        text-shadow: #000 2px 1px 1px;
    }

    .single-line {
        position: relative;
        width: 100%;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>