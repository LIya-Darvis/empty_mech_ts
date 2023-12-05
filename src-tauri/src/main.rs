// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::any;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn moving(meshes_arr: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", meshes_arr)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moving])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
