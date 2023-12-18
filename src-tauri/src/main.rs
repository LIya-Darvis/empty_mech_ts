// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{any, fs};
use serde::{Deserialize, Serialize};
use serde_json::json;
use serde_json;

#[derive(Deserialize, Serialize, Debug)]
struct MeshPosition {
    x: i64,
    y: i64,
    z: i64
}

#[derive(Deserialize, Serialize, Debug)]
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

// относим это к драме или к фарсу?

#[tauri::command]
fn moving(meshes_arr: &str, finish_point: &str) -> String {

    let mut finish_point_js = serde_json::from_str::<Vec<ModelMesh>>(&finish_point).unwrap();

    format!("Вытаскиваем позицию из жсона: {}, {}, {}", finish_point_js[0].meshPosition.x, finish_point_js[0].meshPosition.y, finish_point_js[0].meshPosition.z)

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moving])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
