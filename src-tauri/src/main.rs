// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::any;
use serde_json::json;

struct MeshPosition {
    x: i64,
    y: i64,
    z: i64
}

struct ModelMesh {
    meshId: String,
    meshPosition: MeshPosition
}

struct ModelMeshArr {
    meshArr: Vec<ModelMesh>
}

struct ModelParams {
    modelMeshArr: ModelMeshArr,
    finishPoint: ModelMesh
}


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn moving(meshes_arr: &str, finish_point: &str) -> String {
    println!("inside hiiiii");
    format!(">Array of model meshes: {} \n>Finish point: {}", meshes_arr, finish_point)
    // format!("Hello, !")
    // format!("qwerty {}", meshes_arr)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moving])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
