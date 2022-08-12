import { ECharts, EChartsOption, init } from "echarts";
import { ECElementEvent } from "echarts/types/src/util/types";

// 爱心图标
const iconPath = 'M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z'
// 图标颜色
const iconColor = (count: number) => {
    // 1 2
    if(count <= 2) return '#93CE07'
    // 3 4 5
    else if(count <= 5) return '#FBDB0F'
    // 6 7
    else if(count <= 7) return '#FC7D02'
    // 8 9 10
    else if(count <= 10) return '#FD0100'
    // >= 10
    else return '#AA069F'
}

const generateCalendarData = (year: number, month: number, list: CalendarTodoData[]): [ string, CalendarTodoData ][] => {
    return new Array(31)
        .fill(0).map((_, idx) => {
            const yyyyMMdd = `${ year }-${ (month + '').padStart(2, '0') }-${ (idx + 1 + '').padStart(2, '0') }`
            return [
                yyyyMMdd,
                {
                    date: yyyyMMdd,
                    count: list.find(({ date }) => date.endsWith(idx + 1 + ''))?.count ?? 0
                }
            ]
        })
}
const generateCalendarOption = (year: number, month: number, list: CalendarTodoData[]) => {
    const _config: EChartsOption = {
        tooltip: {
            confine: true,
            position: point => point,
            formatter: (param) => {
                // @ts-ignore
                return param.data[1].count === 0 ? '' : `${ param.data[1].count } 项代办`
            },
            padding: [ 3, 5 ],
            borderColor: '#333',
            borderWidth: 1,
            borderRadius: 0,
            backgroundColor: '#33333366',
            textStyle: {
                color: '#feffff',
                fontSize: 12,
            },
        },
        calendar: [
            {
                top: 20,
                bottom: '1%',
                left: '1%',
                right: '1%',
                width: '98%',
                height: 'auto',
                orient: 'vertical',
                cellSize: 'auto',
                range: `${ year }-${ month }`,
                dayLabel: {
                    nameMap: 'ZH',
                    firstDay: 1,
                    color: '#333',
                    fontStyle: 'italic',
                    fontSize: 8,
                    lineHeight: 5
                },
                monthLabel: {
                    show: false
                },
                yearLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                itemStyle: {
                    borderWidth: 0,
                }
            }
        ],
        series: [
            {
                type: 'custom',
                coordinateSystem: 'calendar',
                renderItem: (params, api) => {
                    const celTimestamp = api.value(0)
                    const cellPoint = api.coord(celTimestamp) as [ number, number ]
                    const cellValue = api.value(1) as unknown as CalendarTodoData
                    // @ts-ignore
                    const { cellWidth, cellHeight } = params.coordSys

                    if(isNaN(cellPoint[0]) || isNaN(cellPoint[1])) return;
                    else {
                        const group: any = {
                            type: 'group',
                            children: [
                                {
                                    type: 'text',
                                    style: {
                                        x: cellPoint[0],
                                        y: cellPoint[1],
                                        fill: '#777',
                                        text: cellValue.date.slice(-2),
                                        fontStyle: 'italic',
                                        fontSize: 0.4 * cellHeight
                                    }
                                }
                            ]
                        }
                        // 有额外数据则绘制图标
                        if(cellValue.count > 0) group.children.push({
                            type: 'path',
                            shape: {
                                pathData: iconPath,
                                x: cellPoint[0] - cellWidth * 0.4,
                                y: cellPoint[1] - cellHeight * 0.4,
                                width: cellHeight * 0.5,
                                height: cellHeight * 0.5
                            },
                            style: {
                                fill: iconColor(cellValue.count),
                            }
                        })
                        return group
                    }
                },
                data: generateCalendarData(year, month, list),
                dimensions: [ { type: 'ordinal' }, { type: 'ordinal' } ],
            }
        ]
    }

    return _config
}

export type CalendarTodoData = {
    /**
     * @description 日期 yyyy-MM-dd
     */
    date: string
    /**
     * @description 条目数
     */
    count: number
}

export class CalendarRenderer {
    #container: HTMLDivElement
    #instance: ECharts

    constructor(container: HTMLDivElement) {
        this.#container = container
        this.#instance = init(container)
    }

    /**
     * @description ev.value: [string, {data: string, count: number}]
     * @private
     */
    #clickCallback = ((e: ECElementEvent) => {
        console.log(e, e.value)
    }).bind(this) as (e: any) => void

    listen() {
        this.#instance.on('click', this.#clickCallback)
    }

    unListen() {
        this.#instance.off('click', this.#clickCallback)
    }

    /**
     * @description 绘制
     */
    render(year: number, month: number, list: CalendarTodoData[] = []) {
        this.unListen()
        this.#instance.setOption(generateCalendarOption(year, month, list), true)
        this.listen()
    }

    /**
     * @description 销毁
     */
    dispose() {
        this.#instance.dispose()
    }
}