import { dateRange } from "@/scripts/util";

class UseDB {
    /**
     * @description 数据库实例
     * @private
     */
    #db: IDBDatabase | null = null

    /**
     * @description 数据库名称
     * @private
     */
    readonly #dbName: string
    get dbName() {
        return this.#dbName
    }

    /**
     * @description 获取全部的数据表名称
     */
    get storeNames() {
        const nameList = this.#db?.objectStoreNames
        if(!nameList) return []

        const nameArray: string[] = []
        for (let i = 0; i < nameList.length; i++) nameArray.push(nameList[i])
        return nameArray
    }

    constructor(dbName: string) {
        if(!window.indexedDB) throw new Error('Not Support')
        else this.#dbName = dbName
    }

    /**
     * @description 获取数据库信息列表 (名称、版本)
     */
    static dbInfos() {
        return window.indexedDB.databases()
    }

    /**
     * @description 删除数据库
     * @param dbName 数据库名称
     */
    static dropDb(dbName: string) {
        return new Promise<Event>((resolve, reject) => {
            const dbOperate = window.indexedDB.deleteDatabase(dbName)
            dbOperate.onsuccess = (ev) => {
                resolve(ev)
            }
            dbOperate.onerror = () => {
                reject('删除数据库出错')
            }
        })
    }

    /**
     * @description 打开数据库(创建表)
     * @param stores 数据表列表(名称, 主键)
     */
    open(stores?: { storeName: string, pk?: string, autoIncrement?: boolean }[]) {
        return new Promise<boolean>((resolve, reject) => {
            let ifNew = false
            const conn = indexedDB.open(this.#dbName)
            conn.onsuccess = () => {
                this.#db = conn.result
                resolve(ifNew)
            }
            conn.onerror = () => {
                reject('打开数据库出错')
            }
            conn.onupgradeneeded = () => {
                if(stores && stores.length > 0) {
                    const db = conn.result
                    stores.forEach(({ storeName, pk, autoIncrement }) => {
                        db.createObjectStore(storeName, { keyPath: pk || 'id', autoIncrement })
                    })
                    ifNew = true
                }
            }
        })
    }

    /**
     * @description 添加数据
     * @param storeName 表名
     * @param data 新增数据项
     */
    insert(storeName: string, data: any) {
        return new Promise<UseDB>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .add(data)
                dbOperate.onsuccess = () => {
                    resolve(this)
                }
                dbOperate.onerror = () => {
                    reject('插入数据出错')
                }
            }
        })
    }

    /**
     * @description 更新数据
     * @param storeName 表名
     * @param data 更新数据项
     */
    update(storeName: string, data: any) {
        return new Promise<UseDB>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .put(data)
                dbOperate.onsuccess = () => {
                    resolve(this)
                }
                dbOperate.onerror = () => {
                    reject('更新数据出错')
                }
            }
        })
    }

    /**
     * @description 删除数据
     * @param storeName 表名
     * @param pk 删除项的主键
     */
    remove(storeName: string, pk: IDBValidKey | IDBKeyRange) {
        return new Promise<UseDB>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .delete(pk)
                dbOperate.onsuccess = () => {
                    resolve(this)
                }
                dbOperate.onerror = () => {
                    reject('删除数据出错')
                }
            }
        })
    }

    /**
     * @description 主键查询数据
     * @param storeName 表名
     * @param pk 查询项的主键
     */
    query_pk<ExpectResultType extends any>(storeName: string, pk: IDBValidKey | IDBKeyRange) {
        return new Promise<ExpectResultType[]>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readonly')
                    .objectStore(storeName)
                    .getAll(pk)
                dbOperate.onsuccess = () => {
                    resolve(dbOperate.result)
                }
                dbOperate.onerror = () => {
                    reject('查询数据出错')
                }
            }
        })
    }

    /**
     * @description 游标查询数据
     * @param storeName 表名
     * @param condition 条件
     */
    query_condition<ExpectResultType extends any>(storeName: string, condition: (value: ExpectResultType) => boolean) {
        return new Promise((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const hits: ExpectResultType[] = []

                const dbOperate = db
                    .transaction(storeName, 'readonly')
                    .objectStore(storeName)
                    .openCursor()

                dbOperate.onsuccess = () => {
                    const cursor = dbOperate.result
                    if(!cursor) resolve(hits)
                    else {
                        if(condition(cursor.value)) hits.push(cursor.value)
                        cursor.continue()
                    }
                }
                dbOperate.onerror = () => {
                    reject('查询数据出错')
                }
            }
        })
    }

    /**
     * @description 获取数据表中的全部数据
     * @param storeName 表名
     */
    getStoreAll(storeName: string) {
        return new Promise<any[]>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readonly')
                    .objectStore(storeName)
                    .getAll()
                dbOperate.onsuccess = () => {
                    resolve(dbOperate.result)
                }
                dbOperate.onerror = () => {
                    reject('删除数据出错')
                }
            }
        })
    }

    /**
     * @description 获取数据库中的全部数据
     */
    getStoresAll() {
        const db = this.#db
        if(!db) return Promise.reject('无数据库对象')
        else {
            const storeNames = this.storeNames
            const operates: Promise<any[]>[] = storeNames.map(storeName => {
                return new Promise<any[]>(resolve => {
                    const dbOperate = db
                        .transaction(storeName, 'readonly')
                        .objectStore(storeName)
                        .getAll()
                    dbOperate.onsuccess = () => {
                        resolve(dbOperate.result)
                    }
                    dbOperate.onerror = () => {
                        resolve([])
                    }
                })
            })

            return new Promise<{ [storeName: string]: any[] }>((resolve, reject) => {
                Promise.all(operates)
                    .then(list => {
                        const dbData: { [k: string]: any[] } = {}
                        storeNames.forEach((storeName, idx) => {
                            dbData[storeName] = list[idx]
                        })
                        resolve(dbData)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }

    /**
     * @description 删除数据表
     * @param storeName
     */
    dropStore(storeName: string) {
        const db = this.#db
        if(!db) return Promise.reject('无数据库对象')
        else {
            return new Promise<UseDB>((resolve, reject) => {
                const oldVersion = db.version
                // 先关闭旧连接
                this.close()
                // 创建新连接并触发升级
                const dbOperate = window.indexedDB.open(this.#dbName, oldVersion + 1)
                dbOperate.onsuccess = () => {
                    this.#db = dbOperate.result
                    resolve(this)
                }
                dbOperate.onupgradeneeded = (_) => {
                    dbOperate.result.deleteObjectStore(storeName)
                }
                dbOperate.onerror = (_) => {
                    reject('删除数据表出错')
                }
            })
        }
    }

    /**
     * @description 关闭数据库
     */
    close() {
        this.#db?.close()
    }

    /**
     * @description 删除数据库
     */
    dispose() {
        this.close()
        this.#db = null
        return UseDB.dropDb(this.#dbName)
    }
}

const enum DBStatic {
    dbName = 'todoDB',
    storeName = 'todoStore',
    pk = 'due'
}

/**
 * @description 待办事项存储结构
 */
export type TodoRecord = {
    /**
     * @description deadline of the item (in timestamp) - as pk in IDB
     */
    due: number
    /**
     * @description time of when the item was create (in timestamp)
     */
    create: number
    /**
     * @description title of the item (in 20 chars)
     */
    title: string
    /**
     * @description brief description (in 500 chars)
     */
    desc: string
}

// region Calendar
/**
 * @description 月统计结果 - 日历展示
 */
export type CalendarSummary = {
    /**
     * @description yyyy-MM-dd
     */
    date: string
    /**
     * @description records
     */
    records: TodoRecord[]
}[]
// endregion

// region Summary
// 单项总览: 总计 已过 未来
export type SummaryPie = { total: number, past: number }
// 总览页面: 日 周 月 季 年
export type OverviewSummary = {
    day: SummaryPie
    week: SummaryPie
    month: SummaryPie
    quarter: SummaryPie
    year: SummaryPie
}

// endregion

class TODOList {
    #dbc: UseDB

    constructor() {
        this.#dbc = new UseDB(DBStatic.dbName)
    }

    // region 初始化
    /**
     * @description 连接(不存在则创建)数据库
     * @description 此步骤在模块加载时使用顶层 await 自动执行
     */
    setup() {
        return this.#dbc
            .open([
                { storeName: DBStatic.storeName, pk: DBStatic.pk, autoIncrement: false }
            ])
    }

    // endregion

    // region 增删查
    /**
     * @description 新增
     * @param todo
     */
    addTodoRecord(todo: TodoRecord) {
        return this.#dbc.insert(DBStatic.storeName, { ...todo })
    }

    /**
     * @description 删除
     * @param due pk
     */
    removeTodoRecord(due: number) {
        return this.#dbc.remove(DBStatic.storeName, due)
    }

    /**
     * @description 区间查询
     * @param start 起始时间
     * @param end 结束时间
     */
    queryTodoRecord_due(start: number, end: number) {
        return this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(start, end))
    }

    /**
     * @description 模糊查询
     * @param keyword 关键字 使用空格分割不相连内容
     */
    getTodoRecord_keyword(keyword: string) {
        if(keyword.trim() === '') return this.#dbc.getStoreAll(DBStatic.storeName)
        else {
            const _pattern = new RegExp(keyword.split(/[ ]+/).join('.*'))
            return this.#dbc
                .query_condition<TodoRecord>(
                    DBStatic.storeName,
                    (value) => {
                        return _pattern.test(value.title)
                            || _pattern.test(value.desc)
                    })
        }
    }

    // endregion

    // region 统计总览
    /**
     * @description 获取某月的代办项列表 (用于渲染日历)
     * @param year 年
     * @param month 月
     */
    getCalendarPin(year: number, month: number): CalendarSummary {
        return [
            // @ts-ignore
            { date: `${ year }-${ month }-2`, records: [ {}, {} ] },
            // @ts-ignore
            { date: `${ year }-${ month }-12`, records: [ {} ] },
            // @ts-ignore
            { date: `${ year }-${ month }-22`, records: [ {}, {}, {}, {}, {}, {} ] },
            // @ts-ignore
            { date: `${ year }-${ month }-27`, records: [ {}, {}, {}, {} ] }
        ]
    }

    /**
     * @description 获取总览
     */
    getOverviewSummary(): Promise<OverviewSummary> {
        const _range = dateRange()

        const _queryList = [
            this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(_range.day[0], _range.day[1])),
            this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(_range.week[0], _range.week[1])),
            this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(_range.month[0], _range.month[1])),
            this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(_range.quarter[0], _range.quarter[1])),
            this.#dbc.query_pk<TodoRecord>(DBStatic.storeName, IDBKeyRange.bound(_range.year[0], _range.year[1])),
        ]

        return new Promise<OverviewSummary>((resolve, reject) => {
            Promise.all(_queryList)
                .then(_summaries => {
                    const _now = Date.now()

                    const dayPast = _summaries[0].findIndex(_summary => _summary.due > _now)
                    const weekPast = _summaries[1].findIndex(_summary => _summary.due > _now)
                    const monthPast = _summaries[2].findIndex(_summary => _summary.due > _now)
                    const quarterPast = _summaries[3].findIndex(_summary => _summary.due > _now)
                    const yearPast = _summaries[4].findIndex(_summary => _summary.due > _now)

                    resolve({
                        day: {
                            total: _summaries[0].length,
                            past: dayPast === -1 ? _summaries[0].length : dayPast
                        },
                        week: {
                            total: _summaries[1].length,
                            past: weekPast === -1 ? _summaries[1].length : weekPast
                        },
                        month: {
                            total: _summaries[2].length,
                            past: monthPast === -1 ? _summaries[2].length : monthPast
                        },
                        quarter: {
                            total: _summaries[3].length,
                            past: quarterPast === -1 ? _summaries[3].length : quarterPast
                        },
                        year: {
                            total: _summaries[4].length,
                            past: yearPast === -1 ? _summaries[4].length : yearPast
                        }
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    // endregion

    /**
     * @description 退出前关闭数据库连接
     */
    close() {
        this.#dbc.close()
    }
}

// 使用单例
const _todoList = new TODOList()
// 顶层 await 进行初始化
await _todoList.setup()
export const useTodoList = () => _todoList