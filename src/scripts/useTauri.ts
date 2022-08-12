import { appWindow } from "@tauri-apps/api/window";
import type { Router } from "vue-router";

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
    closeWindow,
}