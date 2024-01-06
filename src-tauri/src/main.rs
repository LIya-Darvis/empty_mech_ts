// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{any, fs};
use serde::{Deserialize, Serialize};
use serde_json::json;
use serde_json;

// use rsrl::control::td::SARSA;


#[derive(Deserialize, Serialize, Debug)]
struct MeshPosition {
    x: f64,
    y: f64,
    z: f64
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

// относить это к драме или к фарсу?

struct MeshConst {
    value: i64,
}

impl MeshConst {
    pub fn set_value(&mut self, value: i64) {
        self.value = value;
    }
}

const MESH_COUNT_ST: MeshConst = MeshConst {
    value: 0,
};

#[tauri::command]
fn const_initialize(mesh_count: i64) {
    MESH_COUNT_ST.set_value(mesh_count);
}

#[tauri::command]
fn moving(meshes_arr: &str, finish_point: &str) -> String {

    let mut finish_point_js = serde_json::from_str::<Vec<ModelMesh>>(&finish_point).unwrap();
    let mut meshes_point_js = serde_json::from_str::<Vec<ModelMesh>>(&meshes_arr).unwrap();

    format!("Меш: {}, Константа: {}", meshes_point_js[0].meshPosition.x, MESH_COUNT_ST.value)

}


fn main() {
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moving])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
