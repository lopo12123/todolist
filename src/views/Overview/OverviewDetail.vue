<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TodoRecord, useTodoList } from "@/scripts/useTodo";
import { doNotification } from "@/scripts/useTauri";

// 格式化时间显示
const formatDate = (t: number) => {
    const _date = new Date(t)
    return `${ _date.getFullYear() }年`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }月`
        + `${ (_date.getDate() + '').padStart(2, '0') }日`
        + ` ${ (_date.getHours() + '').padStart(2, '0') }`
        + `:${ (_date.getMinutes() + '').padStart(2, '0') }`
        + `:${ (_date.getSeconds() + '').padStart(2, '0') }`
}

const toolbarType = ref<'range' | 'keyword'>('range')

const keyword = ref('')
const range = ref([ '', '' ])

const pickerStart = ref<HTMLInputElement | null>(null)
const pickerEnd = ref<HTMLInputElement | null>(null)

const listData = ref<TodoRecord[]>([])
const getListData = () => {
    if(toolbarType.value === 'range') {
        const [ start, end ] = range.value
        useTodoList()
            .getTodoRecord_due(
                start === '' ? undefined : new Date(start).getTime(),
                end === '' ? undefined : new Date(end).getTime(),
            )
            .then(list => {
                listData.value = list
            })
            .catch(err => {
                doNotification('获取列表错误', err.toString())
            })
    }
}

const activeIdx = ref(-1)
const updateActiveIdx = (newIdx: number) => {
    if(activeIdx.value === newIdx) activeIdx.value = -1
    else activeIdx.value = newIdx
}
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

onMounted(() => {
    getListData()
})
</script>

<template>
    <div class="overview-detail">
        <div class="toolbar-container">
            <div class="toolbar-switcher">
                <span :class="toolbarType === 'range' ? 'active' : 'default'"
                      @click="toolbarType = 'range'" title="时间范围搜索">
                    时间
                </span>
                <span :class="toolbarType === 'keyword' ? 'active' : 'default'"
                      @click="toolbarType = 'keyword'" title="关键字搜索">
                    关键字
                </span>
            </div>
            <div class="condition-block">
                <transition name="fade" mode="out-in">
                    <div class="date-range text-inline" v-if="toolbarType === 'range'">
                        <label class="date-picker-box"
                               @click="pickerStart.showPicker()">
                            <span>{{ range[0].replace(/\-/g, '/') || '无限制' }}</span>
                            <input type="date" v-model="range[0]"
                                   class="hidden-date-picker"
                                   ref="pickerStart">
                        </label>
                        -
                        <label class="date-picker-box"
                               @click="pickerEnd.showPicker()">
                            <span>{{ range[1].replace(/\-/g, '/') || '无限制' }}</span>
                            <input type="date" v-model="range[1]"
                                   class="hidden-date-picker"
                                   ref="pickerEnd">
                        </label>
                    </div>
                    <input class="keyword-ipt" v-else
                           v-model="keyword"
                           placeholder="空格分割多个关键字"/>
                </transition>
            </div>
            <div class="search-btn with-hover"
                 title="搜索" @click="getListData">
                搜索
            </div>
        </div>
        <div class="list-container with-scroll">
            <div class="list-block text-inline" :key="idx"
                 :style="`height: ${idx === activeIdx ? '96px' : '24px'}; border-color: ${idx === activeIdx ? '#eeea' : 'transparent'}`"
                 v-for="(record, idx) in listData">
                <div class="record-line text-inline">
                    <div class="label">{{ activeIdx === idx ? '待办事项' : `No.${idx + 1}` }}</div>
                    <div class="value">{{ record.title }}</div>
                    <div class="expand">
                        <div class="op-btn with-hover" @click="doRemove(record.due)">删除</div>
                        <div class="op-btn with-hover" @click="updateActiveIdx(idx)">
                            {{ activeIdx === idx ? '收起' : '展开' }}
                        </div>
                    </div>
                </div>
                <div class="record-line text-inline">
                    <div class="label">备注(选)</div>
                    <div class="value-full">{{ record.desc || '—' }}</div>
                </div>
                <div class="record-line text-inline">
                    <div class="label">待办时间</div>
                    <div class="value-full" :title="formatDate(record.due)">
                        {{ formatDate(record.due) }}
                    </div>
                </div>
                <div class="record-line text-inline">
                    <div class="label">创建时间</div>
                    <div class="value-full" :title="formatDate(record.create)">
                        {{ formatDate(record.create) }}
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

        .toolbar-switcher {
            position: relative;
            width: 70px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            > span {
                cursor: pointer;
                transition: all 0.5s;
            }

            .active {
                position: relative;
                height: 24px;
                line-height: 24px;
            }

            .default {
                transform: scale(0.7);
                opacity: 0.5;
            }
        }

        .condition-block {
            position: relative;
            width: calc(100% - 110px);

            .date-range {
                position: relative;
                width: 100%;
                height: 24px;
                color: #eeec;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .date-picker-box {
                    position: relative;
                    width: 67px;
                }

                .hidden-date-picker {
                    position: absolute;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }

            .keyword-ipt {
                position: relative;
                width: 100%;
                height: 24px;
                border: none;
                border-bottom: solid 1px #ccc;
                outline: none;
                background-color: transparent;
                color: #eeec;
                letter-spacing: 1px;
                font-size: 12px;
                font-family: PixelFont;
                font-style: italic;
                text-shadow: #000 2px 1px 1px;

                &::placeholder {
                    font-size: 12px;
                }
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
        height: calc(100% - 24px);
        overflow: auto;

        .list-block {
            position: relative;
            width: 100%;
            margin-bottom: 5px;
            border: solid 1px;
            border-radius: 5px;
            overflow: hidden;

            .record-line {
                position: relative;
                width: 100%;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .label {
                    position: relative;
                    width: 80px;
                    height: 24px;
                    line-height: 24px;
                }

                .value {
                    position: relative;
                    width: calc(100% - 140px);
                    height: 24px;
                    line-height: 24px;
                }

                .value-full {
                    position: relative;
                    width: calc(100% - 80px);
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
}
</style>