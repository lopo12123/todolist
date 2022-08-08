class UseDB {
    // 数据库名称
    readonly #dbName: string
    get dbName() {
        return this.#dbName
    }

    // 数据库实例
    #db: IDBDatabase | null = null

    constructor(dbName: string) {
        if(!window.indexedDB) throw new Error('Not Support')
        else this.#dbName = dbName
    }

    /**
     * @description 打开数据库, 创建表
     * @param stores 数据表列表(名称, 主键)
     */
    init(stores: { storeName: string, pk?: string }[]) {
        return new Promise((resolve, reject) => {
            if(stores.length === 0) reject(new Error('至少需要创建一张表!'))
            else {
                const conn = indexedDB.open(this.#dbName)
                conn.onsuccess = () => {
                    this.#db = conn.result
                    resolve(this)
                }
                conn.onerror = reject
                conn.onupgradeneeded = () => {
                    const db = conn.result
                    stores.forEach(({ storeName, pk }) => {
                        db.createObjectStore(storeName, { keyPath: pk || 'id', autoIncrement: true })
                    })
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
        return new Promise((resolve, reject) => {
            const db = this.#db
            if(!db) reject(new Error('无数据库对象'))
            else {
                const idbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .add(data)
                idbOperate.onsuccess = () => {
                    resolve(this)
                }
                idbOperate.onerror = reject
            }
        })
    }

    /**
     * @description 更新数据
     * @param storeName 表名
     * @param data 更新数据项
     */
    update(storeName: string, data: any) {
        return new Promise((resolve, reject) => {
            const db = this.#db
            if(!db) reject(new Error('无数据库对象'))
            else {
                const idbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .put(data)
                idbOperate.onsuccess = () => {
                    resolve(this)
                }
                idbOperate.onerror = reject
            }
        })
    }

    /**
     * @description 删除数据
     * @param storeName 表名
     * @param pk 删除项的主键
     */
    delete(storeName: string, pk: string) {
        return new Promise((resolve, reject) => {
            const db = this.#db
            if(!db) reject(new Error('无数据库对象'))
            else {
                const idbOperate = db
                    .transaction(storeName, 'readwrite')
                    .objectStore(storeName)
                    .delete(pk)
                idbOperate.onsuccess = () => {
                    resolve(this)
                }
                idbOperate.onerror = reject
            }
        })
    }

    /**
     * @description 查询数据
     * @param storeName 表名
     * @param pk 查询项的主键
     */
    query(storeName: string, pk: string) {
        return new Promise((resolve, reject) => {
            const db = this.#db
            if(!db) reject(new Error('无数据库对象'))
            else {
                const idbOperate = db
                    .transaction(storeName, 'readonly')
                    .objectStore(storeName)
                    .get(pk)
                idbOperate.onsuccess = () => {
                    resolve(this)
                }
                idbOperate.onerror = reject
            }
        })
    }

    // 关闭
    close() {
        this.#db?.close()
    }
}

export {
    UseDB
}