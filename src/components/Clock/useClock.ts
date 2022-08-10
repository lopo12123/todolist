import { minmax } from "@/scripts/util";

export interface ClockConfig {
    /**
     * @description 表盘
     */
    dial: {
        /**
         * @description 半径 (px)
         * @default 75
         */
        radius: number
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #777777
         */
        stroke: string
        /**
         * @description 粗细 (px)
         * @default 1
         */
        strokeWidth: number
    }
    /**
     * @description 数字
     */
    number: {
        /**
         * @description 是否显示
         * @default true
         */
        show: boolean
        /**
         * @description 数字类型
         * @default 'Arab'
         */
        text: 'Arab' | 'Roma'
        /**
         * @description 描边 / 填充
         * @default 'stroke'
         */
        style: 'stroke' | 'fill'
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #333333
         */
        color: string
    }
    /**
     * @description 时针
     */
    hour: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.5
         */
        percent: number
        /**
         * @description 反向长度 (px)
         * @default 3
         */
        tail: number
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #333333
         */
        stroke: string
        /**
         * @description 粗细 (px)
         * @default 5
         */
        strokeWidth: number
    }
    /**
     * @description 分针
     */
    minute: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.6
         */
        percent: number
        /**
         * @description 反向长度 (px)
         * @default 4
         */
        tail: number
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #444444
         */
        stroke: string
        /**
         * @description 粗细 (px)
         * @default 4
         */
        strokeWidth: number
    }
    /**
     * @description 秒针
     */
    second: {
        /**
         * @description 长度占半径比例 [0, 1]
         * @default 0.6
         */
        percent: number
        /**
         * @description 反向长度 (px)
         * @default 5
         */
        tail: number
        /**
         * @description 颜色 (HEX, #RRGGBB)
         * @default #555555
         */
        stroke: string
        /**
         * @description 粗细 (px)
         * @default 3
         */
        strokeWidth: number
    }
}

/**
 * @description 文字标签
 */
const ClockNumber = {
    Arab: [ '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11' ],
    Roma: [ 'XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI' ]
}

class UseClock {
    #dialCvs: HTMLCanvasElement
    #pointerCvs: HTMLCanvasElement
    #config: ClockConfig

    private setStroke(
        ctx: CanvasRenderingContext2D,
        stroke: string | CanvasGradient | CanvasPattern,
        strokeWidth: number): CanvasRenderingContext2D {
        ctx.strokeStyle = stroke
        ctx.lineWidth = strokeWidth
        return ctx
    }

    private setFill(
        ctx: CanvasRenderingContext2D,
        fill: string | CanvasGradient | CanvasPattern
    ) {
        ctx.fillStyle = fill
        return ctx
    }

    constructor(
        dialCanvas: HTMLCanvasElement,
        pointerCanvas: HTMLCanvasElement,
        clockConfig: ClockConfig) {
        this.#dialCvs = dialCanvas
        this.#pointerCvs = pointerCanvas
        this.#config = clockConfig
    }

    renderDial(): UseClock {
        const { radius, stroke, strokeWidth } = this.#config.dial
        const ctx = this.#dialCvs.getContext('2d')!

        // 表盘外圈
        ctx.beginPath()
        ctx.arc(radius, radius, radius, 0, Math.PI * 2)
        this.setStroke(ctx, stroke, strokeWidth)
            .stroke()
        ctx.closePath()

        // 数字
        const { show, text, style, color } = this.#config.number
        if(show) {
            const fontSize = minmax(0.16 * radius, 12, 24)
            const fontRadius = radius - fontSize
            ctx.beginPath()
            ctx.font = `${ fontSize }px san-serif`
            ctx.textAlign = 'center'
            if(style === 'stroke') {
                this.setStroke(ctx, color, 0.5)
                ClockNumber[text].forEach((txt, idx) => {
                    const _x = radius + parseFloat((fontRadius * Math.sin(Math.PI / 6 * idx)).toFixed(2))
                    const _y = radius + fontSize / 2 + parseFloat((fontRadius * -Math.cos(Math.PI / 6 * idx)).toFixed(2))
                    ctx.strokeText(txt, _x, _y, fontSize)
                })
            }
            else {
                this.setFill(ctx, color)
                ClockNumber[text].forEach((txt, idx) => {
                    const _x = radius + parseFloat((fontRadius * Math.sin(Math.PI / 6 * idx)).toFixed(2))
                    const _y = radius + fontSize / 2 + parseFloat((fontRadius * -Math.cos(Math.PI / 6 * idx)).toFixed(2))
                    ctx.fillText(txt, _x, _y, fontSize)
                })
            }
            ctx.closePath()
        }

        return this
    }

    renderPointer(tick: boolean = true) {

    }
}

export {
    UseClock
}