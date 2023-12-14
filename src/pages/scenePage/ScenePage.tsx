import React, { FC, useEffect, useContext, createContext, useState } from "react";
import NewScene from "../../components/NewScene";
import classes from './ScenePage.module.css';
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
import LoadingPage from "../loadingPage/LoadingPage";
import * as BABYLON from "@babylonjs/core";

import { MyContext, initialValue, useModelContext } from "../../hooks/MyModelsContext";
import { SceneContext, initialScene } from "../../hooks/SceneContext";
import { AssetsManager } from "@babylonjs/core";
import { useEngine } from "react-babylonjs";

import { invoke } from "@tauri-apps/api/tauri";
// import { ModelParams } from "../../components/ModelParams";

// const invoke = window.__TAURI__.invoke

// import { x } from "../../assets/models"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// дополнительное объявление типов
export type MeshPosition = {
    x: number,
    y: number,
    z: number
}
export type ModelMesh = {
    meshId: string
    meshPosition: MeshPosition
}
export type ModelMeshArr = {
    meshArr: ModelMesh[] | null
}
export const modelMeshArr : ModelMeshArr = {
    meshArr: []
};
export const finishMeshArr : ModelMeshArr = {
    meshArr: []
};

const ScenePage = () => {
    const { mesh_arr, updateMeshArr } = useModelContext();      // для апдейта моделек в сцене
    const [context_scene , updateScene] = useState(initialScene);    // для апдейта ссылки на сцену
    const [open, setOpen] = useState(false);     // стейт для открытия модального окна\

    // все для таймера, все для победы
    const [countTime, setCountTime] = useState(false);
    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        const target = new Date();
        target.setSeconds(target.getSeconds() + 20)
    
        const interval = setInterval(() => {
          const now = new Date();
          const difference = target.getTime() - now.getTime();

          console.log("разница: ", difference)
    
          const s = Math.floor((difference % (1000 * 60)) / 1000);
          setSeconds(s);
    
          if (s <= 0) {
            setCountTime(true);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    // функция на передвижение
    async function moving(meshes_json: string, finish_json: string) {
        console.log(await invoke('moving', {meshesArr: meshes_json, finishPoint: finish_json}));

    }

    const startTestingClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine
        const this_mesh_arr = mesh_arr.value;

        // назначение физики
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            this_id.physicsAggregate = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, { mass: 20, restitution: 0}, this_scene)
        });

        await sleep(3000);

        modelMeshArr.meshArr?.reduce;
        finishMeshArr.meshArr?.reduce;

        // передача данных
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
     
            const mesh_x_position = this_id.position._x;
            const mesh_y_position = this_id.position._y;
            const mesh_z_position = this_id.position._z;
            const buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};

            const buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
            modelMeshArr.meshArr?.push(buffer_mesh);
        });

        const finish_position: MeshPosition = {x:0, y:1, z:35};
        const finish_mesh : ModelMesh = {meshId: "finish_point", meshPosition: finish_position};
        finishMeshArr.meshArr?.push(finish_mesh);
        const modelJson = JSON.stringify(modelMeshArr.meshArr);
        const finishJson = JSON.stringify(finishMeshArr.meshArr);

        moving(modelJson, finishJson);

        

        // рандомное передвижение
        for (let i = 0; i < 25; i++) {
            const ran_mesh = Math.floor(Math.random() * (5-1 - 0 + 1) + 0);
            console.log(ran_mesh);

            const ran_y = Math.random() * (45 - 25) + 25;
            const ran_z = Math.random() * (65 - 30) + 30;

            // setTimeout(() => {}, 5000);
            await sleep(750);

            const this_id = this_scene.getMeshById(this_mesh_arr[ran_mesh]);
            this_id.physicsAggregate.body.applyImpulse(
                new BABYLON.Vector3(0, ran_y, ran_z),
                this_id.position
            );
        }

    };

    return (
        <SceneContext.Provider value={{context_scene, updateScene}}>
            {/* <MyContext.Provider value={{ value, updateValue }} > */}
                <div className={classes.scene_page}>
                    
                    {/* // верхняя панель элементов и кнопок */}
                    <div className={classes.panel}>
                        <PanelButton onClick={() => setOpen(true)}>Загрузить</PanelButton>
                        <PanelButton onClick={startTestingClick}>Начать тестирование</PanelButton>
                    </div>

                    {/* // панель открытия модального окна */}
                    { open && (
                        <ModalPanel open={open} setOpen={setOpen}>
                            <LoadingPage></LoadingPage>
                        </ModalPanel>
                    )}
                    
                    <div className={classes.scene}>
                        {/* // верхняя панель с данными о загруженной модели */}
                        <DisplayPanel>
                            <div>n fps</div>
                            {countTime ? (
                                <div> 
                                    0
                                </div>
                            ) : (<div> 
                                    {seconds}
                                </div>)}
                            
                            <div>obj model</div>
                        </DisplayPanel>
                        {/* // компонент сцены (самого виртуального пространства) */}
                        <NewScene/>
                    </div>
                    
                </div>

            {/* </MyContext.Provider> */}
        </SceneContext.Provider>

        

    );
};

export default ScenePage;




