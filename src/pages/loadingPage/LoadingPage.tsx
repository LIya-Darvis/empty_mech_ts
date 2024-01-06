import React, { FC, useContext, useEffect, useState } from "react";
import classes from './LoadingPage.module.css';
import { useFilePicker } from 'use-file-picker';
import {readTextFile, writeTextFile, copyFile, BaseDirectory} from '@tauri-apps/api/fs';
import { useScene } from "react-babylonjs";
import { useSceneContext } from "../../hooks/SceneContext";
import * as BABYLON from "@babylonjs/core";
import { useModelContext } from "../../hooks/MyModelsContext";

export let file_content: string = "";

// const refreshPage = () => {
//     // начинаем загрузку модельки!!!!
//     const { context_scene, updateScene } = useSceneContext();

//     const this_scene = context_scene.this_scene;
//     const this_engine = context_scene.this_engine

//     // console.log("якобы ссылка на сцену ", this_scene)
//     // console.log("якобы движок самой сцены ", this_engine)

//     const assetsManager = new BABYLON.AssetsManager(this_scene);
//     // console.log(assetsManager)
//     const main_model_task = assetsManager.addMeshTask("main_model_task", "", "src/assets/models/", "test.obj");
//     // console.log("название модели через менеджер ", main_model_task.loadedMeshes)

//     main_model_task.onSuccess = function (task) {
//         const mesh_arr = task.loadedMeshes;
//         mesh_arr.forEach(mesh => {
//             mesh.position = new BABYLON.Vector3(0, 1, 0);
//         });
//     };

//     main_model_task.onError = function (task, message, exception) {
//         console.log(message, exception);
//     };

//     assetsManager.onFinish = function (tasks) {
//         this_engine.runRenderLoop(function () {
//             this_scene.render();
//             this_engine.loadingUIText = 'Loaded of assets.';
//         });
//     };

//     assetsManager.load();
// }

const LoadingPage = () => {

    const { context_scene, updateScene } = useSceneContext();
    const { mesh_arr, updateMeshArr } = useModelContext();

    const {openFilePicker, filesContent, loading} = useFilePicker({
        accept: '.obj',
    });

    if (loading) {
        console.log("загрузка...");
        return <div>загрузка...</div>
    } else {
        // изменение содержания файла
        filesContent.map((file) => {
            file_content = file.content
        })
        writeTextFile("D:/codes/empty_mech_ts/src/assets/models/test.obj", file_content)
        console.log("чего мы так долго добивались ✨✨: \n", file_content);
        console.log("здесь должна обновляться моделька");
    }    

    const refreshPage = () => {
        // начинаем загрузку модельки!!!!    
        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine;


        BABYLON.SceneLoader.ImportMesh("", "src/assets/models/", "test.obj", this_scene, function (newMeshes) {
            const new_mesh_arr: any[] = [];
            newMeshes.forEach(mesh => {

                // mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.MeshImpostor, {mass: 15, restitution: 0.5});

                new_mesh_arr.push(mesh.id);

                // const mesh_ph_aggr = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: 20, restitution: 0}, this_scene)

            });
            mesh_arr.value = new_mesh_arr;
        });





        // const assetsManager = new BABYLON.AssetsManager(this_scene);
        // assetsManager.useDefaultLoadingScreen = false;

        // assetsManager.removeTask()

        // const main_model_task = assetsManager.addMeshTask("main_model_task", "", "src/assets/models/", "test.obj");
    
        // main_model_task.onSuccess = function (task) {
        //     const mesh_arr = task.loadedMeshes;
        //     mesh_arr.forEach(mesh => {
        //         mesh.position = new BABYLON.Vector3(0, 1, 0);
        //     });
        // };
    
        // main_model_task.onError = function (task, message, exception) {
        //     console.log(message, exception);
        // };
    
        // assetsManager.onFinish = function (tasks) {
        //     this_engine.runRenderLoop(function () {
        //         this_scene.render();
        //         this_engine.loadingUIText = 'Loaded of assets.';
        //     });
        // };
    
        // assetsManager.load();
 
    }

    return (
        <div className="loading_page" key="loading_page">
            <h1>Загрузка</h1>
            <p>Выберите модель для загрузки</p>
            <button onClick={() => openFilePicker()} className={classes.load_button}>Выбрать файл</button>
            <button onClick={() => refreshPage()} className={classes.load_button}>Подтвердить</button>
            {
            filesContent.map((file) => (
                <div>
                    <p>{file.name}</p>
                </div>
            ))
            }
        </div>
    );
};

export default LoadingPage;
