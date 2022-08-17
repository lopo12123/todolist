#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod tray;

use tauri::{generate_context, Builder};

fn main() {
    let context = generate_context!();

    Builder::default()
        .system_tray(tray::tray_menu())
        .on_system_tray_event(tray::tray_handler)
        .run(context)
        .expect("error while running tauri application");
}
