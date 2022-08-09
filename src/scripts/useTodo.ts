import { UseDB } from "./useDB";

const enum DBStatic {
    dbName = 'todoDB',
    storeName = 'todoStore',
    pk = 't'
}

class TODOList {
    #dbc: UseDB

    constructor() {
        this.#dbc = new UseDB(DBStatic.dbName)
    }

    setup() {
        return this.#dbc
            .open([
                { storeName: DBStatic.storeName, pk: DBStatic.pk, autoIncrement: false }
            ])
    }

    overview() {

    }
}

// 使用单例
const todoList = new TODOList()
// 顶层 await
await todoList.setup()
export const useTodoList = () => todoList