import { ECharts, EChartsOption, init } from "echarts";

const generateCalendarOption = (year: number, month: number, list: any[]) => {
    const _config: EChartsOption = {
        tooltip: {},
        calendar: [
            {
                top: 'center',
                left: 'center',
                range: `${ year }-${ month }`
            }
        ],
        series: [
            {
                type: 'custom',
                coordinateSystem: 'calendar',
                dimensions: [],
                data: []
            }
        ]
    }

    return _config
}

class CalendarRenderer {
    #container: HTMLDivElement
    #instance: ECharts

    constructor(container: HTMLDivElement) {
        this.#container = container
        this.#instance = init(container)
    }

    /**
     * @description 绘制
     */
    render(year: number, month: number, todoList: any[]) {
        this.#instance.setOption(generateCalendarOption(year, month, todoList), true)
    }

    /**
     * @description 销毁
     */
    dispose() {
        this.#instance.dispose()
    }
}

export {}