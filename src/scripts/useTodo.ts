import { UseDB } from "./useDB";

const enum DBStatic {
    dbName = 'todoDB',
    storeName = 'todoStore',
    pk = 'due'
}

/**
 * @description 数据库记录结构
 */
type TodoRecord = {
    /**
     * @description deadline of the item (in timestamp) - pk
     */
    due: number
    /**
     * @description time of when the item was set (in timestamp)
     */
    birth: number
    /**
     * @description if finished
     */
    finish: boolean
    /**
     * @description brief description
     */
    desc: string
    /**
     * @description document of this to-do-item
     */
    docId: string | null
}
/**
 * @description 统计总览结构
 */
type OverviewResult = {
    total: number
    done: number
    undo: number
    late: number
}

class TODOList {
    #dbc: UseDB

    constructor() {
        this.#dbc = new UseDB(DBStatic.dbName)
    }

    // region 初始化
    /**
     * @description 连接(不存在则创建)数据库
     */
    setup() {
        return this.#dbc
            .open([
                { storeName: DBStatic.storeName, pk: DBStatic.pk, autoIncrement: false }
            ])
    }

    // endregion

    // region 统计总览
    /**
     * @description 统计总览
     * @param range 未来一周 / 未来一月 / 过去一周 / 过去一月 / 全部
     */
    overview(range: 'next-week' | 'next-month' | 'last-week' | 'last-month' | 'all') {
        const todayStart = new Date(new Date().toDateString()).getTime()
    }

    // endregion
}

// 使用单例
const todoList = new TODOList()
// 顶层 await
await todoList.setup()
export const useTodoList = () => todoList