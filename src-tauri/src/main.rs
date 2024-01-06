// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{any, fs};
use serde::{Deserialize, Serialize};
use serde_json::json;
use serde_json;

use lazy_static::lazy_static; // 1.4.0
use std::sync::Mutex;
use std::sync::{Once, ONCE_INIT};

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

static mut MESH_COUNT_ST: i64 = 0;
static mut MESH_MASS_ST: f64 = 20.0;
static ONCE: Once = ONCE_INIT;

fn initialize_global(mesh_count: i64, mesh_mass: f64) {
    unsafe {
        MESH_COUNT_ST = mesh_count;
        MESH_MASS_ST = mesh_mass;
    }
}

#[tauri::command]
fn const_initialize(mesh_count: i64, mesh_mass: f64){
    unsafe{
        ONCE.call_once(|| initialize_global(mesh_count, mesh_mass));
    }
}

#[tauri::command]
fn moving(meshes_arr: &str, finish_point: &str) -> String {

    let mut finish_point_js = serde_json::from_str::<Vec<ModelMesh>>(&finish_point).unwrap();
    let mut meshes_point_js = serde_json::from_str::<Vec<ModelMesh>>(&meshes_arr).unwrap();
    
    let mut total_pos: String = "".to_owned();
    let mut total_imp: String = "".to_owned();
    let mut mesh_count: i64 = 0;
    let mut buf_mesh_arr = ModelMeshArr { meshArr: Vec::new() };

    unsafe {
        mesh_count = MESH_COUNT_ST;
    }

    for i in 0..mesh_count {
        let mut buffer_pos: String = "".to_owned();
        let mut buff_imp: String = "".to_owned();

        buffer_pos.push_str(&(meshes_point_js[i as usize].meshId).to_string());
        buffer_pos.push_str(" | ");
        buffer_pos.push_str(&(finish_point_js[0].meshPosition.x - meshes_point_js[i as usize].meshPosition.x).to_string());
        buffer_pos.push_str(" | ");
        buffer_pos.push_str(&(finish_point_js[0].meshPosition.y - meshes_point_js[i as usize].meshPosition.y).to_string());
        buffer_pos.push_str(" | ");
        buffer_pos.push_str(&(finish_point_js[0].meshPosition.z - meshes_point_js[i as usize].meshPosition.z).to_string());
        buffer_pos.push_str("\n");


        let mesh_imp = MeshPosition {x: 0.0, y: 50.0, z:40.0};
        let mesh = ModelMesh {meshId: meshes_point_js[i as usize].meshId.to_string(), meshPosition: mesh_imp};
        buf_mesh_arr.meshArr.push(mesh);

        total_pos.push_str(&buffer_pos);
    }

    let result_imp = json!(buf_mesh_arr.meshArr);

    format!("{}", result_imp)

}


fn main() {
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moving, const_initialize])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
