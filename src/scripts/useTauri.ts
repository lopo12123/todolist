import { appWindow } from "@tauri-apps/api/window";
import type { Router } from "vue-router";
import { sendNotification } from "@tauri-apps/api/notification";

// region 系统提示
const doNotification = (title: string, body: string) => {
    sendNotification({ title, body })
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
    doNotification,
    closeWindow,
}