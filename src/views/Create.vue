<script lang="ts" setup>
import WithBanner from "@/layouts/WithBanner.vue";
import Banner from "./Create/Banner.vue";
import CreateTodo, { EditorController } from "@/views/Create/CreateTodo.vue";
import { CreateEmitType } from "@/views/Create/Banner.vue";
import { shallowRef } from "vue";
import { useTodoList } from "@/scripts/useTodo";
import { useRouter } from "vue-router";
import { doNotification } from "@/scripts/useTauri";

const router = useRouter()

const solveBtnEv = (type: CreateEmitType) => {
    if(type === 'clear') editorCtr.value?.doClear()
    else if(type === 'create') {
        const _todo = editorCtr.value?.doGet()
        if(_todo) {
            if(_todo.title.trim() === '') {
                editorCtr.value?.doWarning()
            }
            else {
                useTodoList()
                    .addTodoRecord(_todo)
                    .then(_ => {
                        router.push({ name: 'Calendar' })
                    })
                    .catch(err => {
                        doNotification('新建出错', err.toString())
                    })
            }
        }
    }
}

const editorCtr = shallowRef<EditorController | null>(null)
const bindController = (_controller: EditorController) => {
    editorCtr.value = _controller
}
</script>

<template>
    <WithBanner>
        <template #banner>
            <Banner @btn-ev="solveBtnEv"/>
        </template>
        <template #body>
            <CreateTodo @editor-ready="bindController"/>
        </template>
    </WithBanner>
</template>

<style lang="scss" scoped>

</style>