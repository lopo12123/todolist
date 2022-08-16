<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TodoRecord, useTodoList } from "@/scripts/useTodo";
import { doNotification } from "@/scripts/useTauri";

const keyword = ref('')

const listData = ref<TodoRecord[]>([])
const getListData = () => {
    useTodoList()
        .getTodoRecord_keyword(keyword.value)
        .then(list => {
            listData.value = list
        })
        .catch(err => {
            doNotification('获取列表错误', err.toString())
        })
}

/**
 * @description 删除
 * @param due 主键
 */
const doRemove = (due: number) => {
    useTodoList()
        .removeTodoRecord(due)
        .then(_ => {
            doNotification('删除代办成功', '删除成功')
            getListData()
        })
        .catch(err => {
            doNotification('删除代办出错', err.toString())
        })
}
/**
 * @description 显示详情
 * @param record 详细内容
 */
const popupDetail = (record: TodoRecord) => {
    // todo
    console.log('dialog 展示: ', record)
}

onMounted(() => {
    getListData()
})
</script>

<template>
    <div class="overview-detail">
        <div class="toolbar-container">
            <input class="keyword-ipt" v-model="keyword"
                   placeholder="搜索: 使用空格分隔多个关键字"/>
            <div class="search-btn with-hover"
                 title="搜索" @click="getListData">
                搜索
            </div>
        </div>
        <div class="list-container with-scroll">
            <div class="list-line text-inline" :key="idx"
                 v-for="(record, idx) in listData">
                <div class="label">{{ `No.${idx + 1}` }}</div>
                <div class="value" :title="record.title">
                    {{ record.title }}
                </div>
                <div class="expand">
                    <div class="op-btn with-hover"
                         @click="doRemove(record.due)">
                        删除
                    </div>
                    <div class="op-btn with-hover"
                         @click="popupDetail(record)">
                        详情
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overview-detail {
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

    .toolbar-container {
        position: relative;
        width: 100%;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .keyword-ipt {
            position: relative;
            width: calc(100% - 50px);
            height: 24px;
            border: none;
            border-bottom: solid 2px #ccc;
            outline: none;
            background-color: transparent;
            color: #eeec;
            letter-spacing: 1px;
            line-height: 22px;
            font-family: PixelFont;
            text-shadow: #000 2px 1px 1px;

            &::placeholder {
                color: #ccce;
                font-style: italic;
            }
        }

        .search-btn {
            position: relative;
            width: 30px;
            height: 24px;
            line-height: 24px;
            text-align: right;
            cursor: pointer;
        }
    }

    .list-container {
        position: relative;
        width: 100%;
        height: calc(100% - 36px);
        overflow: hidden auto;

        .list-line {
            position: relative;
            width: 100%;
            height: 24px;
            margin-bottom: 5px;
            border-bottom: dashed 1px #eee;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .label {
                position: relative;
                width: 50px;
                height: 24px;
                line-height: 24px;
            }

            .value {
                position: relative;
                width: calc(100% - 110px);
                height: 24px;
                line-height: 24px;
            }

            .expand {
                position: relative;
                width: 60px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .op-btn {
                    width: fit-content;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>