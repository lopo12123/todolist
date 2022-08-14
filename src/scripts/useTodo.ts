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
     * @description 查询数据
     * @param storeName 表名
     * @param pk 查询项的主键
     */
    query<ExpectResultType extends any>(storeName: string, pk: IDBValidKey | IDBKeyRange) {
        return new Promise<ExpectResultType>((resolve, reject) => {
            const db = this.#db
            if(!db) reject('无数据库对象')
            else {
                const dbOperate = db
                    .transaction(storeName, 'readonly')
                    .objectStore(storeName)
                    .get(pk)
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
                dbOperate.onupgradeneeded = (e) => {
                    console.log('数据库升级')
                    dbOperate.result.deleteObjectStore(storeName)
                }
                dbOperate.onerror = (err) => {
                    console.log('删除错误:', err)
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
/**
 * @description 日统计结果
 */
export type DaySummary = {
    /**
     * @description yyyy-MM-dd
     */
    date: string
    /**
     * @description records
     */
    records: TodoRecord[]
}
/**
 * @description 月统计结果
 */
export type MonthSummary = DaySummary[]

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

    // region
    addTodoRecord(todo: TodoRecord) {
        return this.#dbc.insert(DBStatic.storeName, { ...todo })
    }

    // endregion

    // region 统计总览
    /**
     * @description 获取某月的统计结果 (首页日历展示)
     * @param year
     * @param month
     */
    getMonthSummary(year: number, month: number): MonthSummary {
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