<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { TodoRecord } from "@/scripts/useTodo";

export type EditorController = {
    doClear: () => void
    doGet: () => TodoRecord
    doWarning: () => void
}

const emits = defineEmits<{
    (ev: 'editor-ready', controller: EditorController): void
}>()

const initTemplate = {
    due: Date.now(),
    create: Date.now(),
    title: '',
    desc: ''
}

// region 新的待办项内容
const newTodo = ref<TodoRecord>({ ...initTemplate })
const ifWarning = ref(false)
const warningId = ref<any>(-1)
// endregion

// region 格式化时间显示
const formatDate = (t: number) => {
    const _date = new Date(t)
    return `${ _date.getFullYear() }年`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }月`
        + `${ (_date.getDate() + '').padStart(2, '0') }日`
        + ` ${ (_date.getHours() + '').padStart(2, '0') }`
        + `:${ (_date.getMinutes() + '').padStart(2, '0') }`
    // + `:${ (_date.getSeconds() + '').padStart(2, '0') }`
}
// endregion

// region 日期选择器
const formatDatePicker = (t: number) => {
    const _date = new Date(t)
    return `${ _date.getFullYear() }-`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }-`
        + `${ (_date.getDate() + '').padStart(2, '0') }T`
        + `${ (_date.getHours() + '').padStart(2, '0') }:`
        + `${ (_date.getMinutes() + '').padStart(2, '0') }`
}
const datePickerValue = computed(() => {
    return formatDatePicker(newTodo.value.due)
})
const datePicker = ref<HTMLInputElement | null>(null)
const invokePicker = () => {
    // @ts-ignore
    datePicker.value?.showPicker()
}
const pickDate = (e: Event) => {
    const yyyyMMdd_T_hhmm = datePicker.value?.value
    if(!yyyyMMdd_T_hhmm || yyyyMMdd_T_hhmm === '') {
        newTodo.value.due = Date.now()
        console.log('清空了')
    }
    else {
        newTodo.value.due = new Date(yyyyMMdd_T_hhmm).getTime()
        console.log('选择了')
    }
}
// endregion

onMounted(() => {
    emits('editor-ready', {
        doClear: () => {
            newTodo.value = { ...initTemplate }
        },
        doGet: () => {
            return newTodo.value
        },
        doWarning: () => {
            clearTimeout(warningId.value)
            ifWarning.value = true
            warningId.value = setTimeout(() => {
                ifWarning.value = false
            }, 1000)
        }
    })
})
</script>

<template>
    <div class="create-todo">
        <div class="single-line text-inline">
            <div class="label">创建时间</div>
            <div class="selector-date" style="opacity: 0.5">
                {{ formatDate(newTodo.create) }}
            </div>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办时间</div>
            <label class="selector-date" @click="invokePicker">
                <div>{{ formatDate(newTodo.due) }}</div>
                <input class="input-date"
                       :min="formatDatePicker(Date.now())"
                       :value="datePickerValue"
                       type="datetime-local"
                       ref="datePicker"
                       @change="pickDate">
            </label>
        </div>
        <div class="single-line text-inline">
            <div class="label">待办事项</div>
            <input :class="['selector-ipt', ifWarning ? 'selector-ipt__warning' : '']"
                   type="text" maxlength="20"
                   v-model="newTodo.title"
                   :placeholder="ifWarning ? '必填项!' : '字数限制: 20'">
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

    .selector-date {
        position: relative;
        width: calc(100% - 80px);
        height: 24px;
        line-height: 24px;

        .input-date {
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            opacity: 0;
        }
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
        letter-spacing: 1px;
        font-family: PixelFont;
        text-shadow: #000 2px 1px 1px;
    }

    .selector-ipt__warning {
        @keyframes shake {
            0% {
                transform: translateX(0);
            }
            12% {
                transform: translateX(-3px);
            }
            25% {
                transform: translateX(0);
            }
            37% {
                transform: translateX(3px);
            }
            50% {
                transform: translateX(0);
            }
            62% {
                transform: translateX(-3px);
            }
            75% {
                transform: translateX(0);
            }
            87% {
                transform: translateX(3px);
            }
            100% {
                transform: translateX(0);
            }
        }
        border-color: #f56c6c;
        animation: shake 0.5s;

        &::placeholder {
            color: #f56c6c;
        }
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