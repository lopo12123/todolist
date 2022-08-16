export const minmax = (value: number, min: number, max: number, fixed: number = 0) => {
    return parseFloat(Math.min(max, Math.max(min, value)).toFixed(fixed))
}

export const shallowMerge = <T extends { [k: string]: any }>(optionalValue: Partial<T>, defaultValue: Readonly<T>): T => {
    const copy = { ...defaultValue } as T
    for (let k in optionalValue) {
        copy[k] = optionalValue[k]!
    }
    return copy
}

/**
 * @description 获取当前时间为准的 本日/周/月/季/年 时间戳起止
 */
export const dateRange = (): {
    day: number[]
    week: number[]
    month: number[]
    quarter: number[]
    year: number[]
} => {
    const _date = new Date()
    const _weekday = _date.getDay()

    const _day = _date.getDate()
    const _month = _date.getMonth() + 1
    const _year = _date.getFullYear()

    const day = [ new Date(`${ _year }-${ _month }-${ _day } 00:00:00`).getTime(), new Date(`${ _year }-${ _month }-${ _day } 23:59:59`).getTime() ]
    const week = _weekday === 0
        ? [ day[0] - 6 * 24 * 60 * 60 * 1_000, day[1] ]
        : [ day[0] - (_weekday - 1) * 24 * 60 * 60 * 1_000, day[1] + (7 - _weekday) * 24 * 60 * 60 * 1_000 ]
    const month = _month === 12
        ? [ new Date(`${ _year }-12-01 00:00:00`).getTime(), new Date(`${ _year + 1 }-01-01 00:00:00`).getTime() - 1000 ]
        : [ new Date(`${ _year }-${ _month }-01 00:00:00`).getTime(), new Date(`${ _year }-${ _month + 1 }-01 00:00:00`).getTime() - 1000 ]
    const quarter_idx = Math.floor((_month - 1) / 3)
    const quarter = quarter_idx === 3
        ? [ new Date(`${ _year }-10-01 00:00:00`).getTime(), new Date(`${ _year }-12-31 23:59:59`).getTime() ]
        : [ new Date(`${ _year }-${ quarter_idx * 3 + 1 }-01 00:00:00`).getTime(), new Date(`${ _year }-${ quarter_idx * 3 + 3 + 1 }-01 0:00:00`).getTime() - 1000 ]
    const year = [ new Date(`${ _year }-01-01 00:00:00`).getTime(), new Date(`${ _year }-12-31 23:59:59`).getTime() ]

    return { day, week, month, quarter, year }
}

/**
 * @description 获取 yyyy-MM-dd
 */
export const get_yyyyMMdd = () => {
    const _date = new Date()
    return `${ _date.getFullYear() }-`
        + `${ (_date.getMonth() + 1 + '').padStart(2, '0') }-`
        + `${ (_date.getDate() + '').padStart(2, '0') }`
}