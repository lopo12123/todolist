import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import type { Router } from "vue-router";

// region 设置窗口大小
const WindowSizeMap = {
    Home: [ 400, 200 ],
    Calendar: [ 600, 400 ],
    OrderList: [ 600, 400 ],
} as const
const resizeWindow = (to: 'Home' | 'Calendar' | 'OrderList') => {
    const [ w, h ] = WindowSizeMap[to]
    return appWindow.setSize(new LogicalSize(w, h))
}
// endregion

// region 关闭窗口
const closeWindow = (router: Router) => {
    return new Promise((resolve, reject) => {
        router.push({ name: 'Blank' })
        setTimeout(() => {
            appWindow.close()
                .then(resolve)
                .catch(reject)
        }, 500)
    })
}
// endregion

export {
    resizeWindow,
    closeWindow,
}