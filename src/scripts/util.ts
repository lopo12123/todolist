export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}
export type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>
}

export const minmax = (value: number, min: number, max: number, fixed: number = 0) => {
    return parseFloat(Math.min(max, Math.max(min, value)).toFixed(fixed))
}