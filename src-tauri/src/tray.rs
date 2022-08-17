use tauri::{AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, Wry};
use tauri::api::shell::open;


// 配置托盘菜单
pub fn tray_menu() -> SystemTray {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("license".to_string(), "LICENSE: MIT").disabled())
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("pin".to_string(), "保持最前"))
        .add_item(CustomMenuItem::new("unpin".to_string(), "取消最前"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("issue".to_string(), "问题/建议"))
        .add_item(CustomMenuItem::new("source".to_string(), "查看源码"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出"));

    SystemTray::new().with_menu(tray_menu)
}

// 菜单事件响应
pub fn tray_handler(app: &AppHandle<Wry>, event: SystemTrayEvent) {
    let window = app.get_window("main").unwrap();

    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "pin" => {
                window.set_always_on_top(true).unwrap();
                window.emit_to("main", "tray", "pin").unwrap();
            }
            "unpin" => {
                window.set_always_on_top(false).unwrap();
                window.emit_to("main", "tray", "unpin").unwrap();
            }
            "issue" => {
                open(&app.shell_scope(), "https://github.com/lopo12123/todolist/issues", None).unwrap();
            }
            "source" => {
                open(&app.shell_scope(), "https://github.com/lopo12123/todolist", None).unwrap();
            }
            "quit" => {
                window.emit_to("main", "tray", "quit").unwrap();
            }
            _ => {}
        }
        _ => {}
    }
}