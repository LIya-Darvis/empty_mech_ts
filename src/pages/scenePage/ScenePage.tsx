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
import { ModelParams } from "../../components/ModelParams";

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
    meshArr: [],
};

const ScenePage = () => {

    // для апдейта моделек в сцене
    const { mesh_arr, updateMeshArr } = useModelContext();

    // для апдейта ссылки на сцену
    const [context_scene , updateScene] = useState(initialScene);

    // стейт для открытия модального окна 
    const [open, setOpen] = useState(false);

    const startTestingClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        console.log("здесь должно быть прописано управление частями модели");

        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine

        const this_mesh_arr = mesh_arr.value;

        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            this_id.physicsAggregate = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, { mass: 10, restitution: 0}, this_scene)
        });

        await sleep(5000);

        modelMeshArr.meshArr?.reduce;

        // передача данных
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
     
            const mesh_x_position = this_id.position._x;
            const mesh_y_position = this_id.position._y;
            const mesh_z_position = this_id.position._z;
            const buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
            console.log("предполагаемая позиция ", buffer_position);

            const buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
            console.log("расматриваемый меш ", buffer_mesh);

            modelMeshArr.meshArr?.push(buffer_mesh);
            // console.log("промежуточный массив ", modelMeshArr.meshArr);
        });

        console.log("итоговый массив ", modelMeshArr.meshArr);

        // рандомное передвижение
        for (let i = 0; i < 150; i++) {
            const ran_mesh = Math.floor(Math.random() * (5-1 - 0 + 1) + 0);
            console.log(ran_mesh);

            const ran_y = Math.random() * (45 - 25) + 25;
            const ran_z = Math.random() * (65 - 40) + 40;

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
                            <div>¯\_(ツ)_/¯</div>
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




