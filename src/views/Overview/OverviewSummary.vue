<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { OverviewSummary, useTodoList } from "@/scripts/useTodo";
import { doNotification } from "@/scripts/useTauri";

const SummaryDetailMapper = {
    day: '今日',
    week: '本周',
    month: '本月',
    quarter: '本季',
    year: '今年',
}

const summaryDetails = ref<OverviewSummary>({
    day: { total: 0, past: 0 },
    week: { total: 0, past: 0 },
    month: { total: 0, past: 0 },
    quarter: { total: 0, past: 0 },
    year: { total: 0, past: 0 },
})

const getSummaryDetails = () => {
    useTodoList()
        .getOverviewSummary()
        .then(res => {
            summaryDetails.value = res
        })
        .catch(err => {
            doNotification('获取总览统计出错', err.toString())
        })
}

onMounted(() => {
    getSummaryDetails()
})
</script>

<template>
    <div class="overview-summary">
        <div class="summary-block text-inline" :key="summaryIdx"
             v-for="(summaryItem, summaryIdx) in summaryDetails">
            <div class="total">
                {{ SummaryDetailMapper[summaryIdx] }}
                <span class="num-total">
                    {{ summaryItem.total }}
                </span>
                项
            </div>
            <div class="past">
                过去
                <span class="num-past">
                    {{ summaryItem.past }}
                </span>
                项
            </div>
            <div class="feature">
                未来
                <span class="num-feature">
                    {{ summaryItem.total - summaryItem.past }}
                </span>
                项
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overview-summary {
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

    .summary-block {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .num-total {
            color: #fbdb0f;
            text-shadow: none;
        }

        .num-past {
            color: #f56c6c;
            text-shadow: none;
        }

        .num-feature {
            color: #93ce07;
            text-shadow: none;
        }
    }
}
</style>