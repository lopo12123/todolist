import { appWindow, LogicalSize } from "@tauri-apps/api/window";

const WindowSizeMap = {
    Home: [ 400, 200 ],
    Calendar: [ 600, 400 ],
    OrderList: [ 600, 400 ],
} as const
const resizeWindow = (to: 'Home' | 'Calendar' | 'OrderList') => {
    const [ w, h ] = WindowSizeMap[to]
    return appWindow.setSize(new LogicalSize(w, h))
}

export {
    resizeWindow
}