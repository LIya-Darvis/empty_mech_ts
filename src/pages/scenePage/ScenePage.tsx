import React, { FC, useEffect, useContext, createContext, useState, useRef } from "react";
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
export const startPositionhMeshArr : ModelMeshArr = {
    meshArr: []
};
export const finishMeshArr : ModelMeshArr = {
    meshArr: []
};

const ScenePage = () => {
    const { mesh_arr, updateMeshArr } = useModelContext();      // для апдейта моделек в сцене
    const [context_scene , updateScene] = useState(initialScene);    // для апдейта ссылки на сцену
    const [open, setOpen] = useState(false);     // стейт для открытия модального окна
    const [finishStatus, setFinishStatus] = useState(false);    // промежуточная переменная для дамага на цикл итераций
    const [iteration, setIteration] = useState(1);      // кол-во итераций
    const iterationRef = useRef<number>(1);

    // все для таймера, все для победы
    const [timer, setTimer] = useState(5);
    const timerRef = useRef<number>(5);

    function resolveAfter1Second() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });
    }

    async function asyncCall(x: number) {
       while (x > 0) {
            let result = await resolveAfter1Second();
            x--;
            setTimer(x);
            timerRef.current = x;
       }
    }

    // функция на передвижение
    async function moving(meshes_json: string, finish_json: string) {
        console.log(await invoke('moving', {meshesArr: meshes_json, finishPoint: finish_json}));
        // await sleep(3500);
        // console.log("конец движения")
    }

    const startTestingClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // setTimer(12);

        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine
        const this_mesh_arr = mesh_arr.value;

        // назначение физики
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            this_id.physicsAggregate = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, { mass: 20, restitution: 0}, this_scene)
        });


        await sleep(1500);

        // обнуление параметров
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
            startPositionhMeshArr.meshArr?.push(buffer_mesh);
        });

        // назначение конечной точки
        const finish_position: MeshPosition = {x:0, y:1, z:35};
        const finish_mesh : ModelMesh = {meshId: "finish_point", meshPosition: finish_position};
        finishMeshArr.meshArr?.push(finish_mesh);
        const modelJson = JSON.stringify(modelMeshArr.meshArr);
        const finishJson = JSON.stringify(finishMeshArr.meshArr);

        
        // все еще хочу вишневое пиво
        // даже еще сильнее

        setTimer(5);
        timerRef.current = 5;
        while (iterationRef.current <= 3) {
            console.log(timerRef.current);

            asyncCall(6);
            while (timerRef.current > 0) {

                await console.log("происходящее остается за кадром");

                if (timerRef.current < 0) {
                    setFinishStatus(false)
                    break;
                }
                else {
                    await moving(modelJson, finishJson);
                    console.log(timerRef.current);
                }
            }
            setIteration(iteration + 1);
            iterationRef.current += 1;
            setTimer(5);
            timerRef.current = 5
            console.log("кадр закончен");
        }

        console.log("- - -")

        // рандомное передвижение
        // for (let i = 0; i < 50; i++) {
        //     const ran_mesh = Math.floor(Math.random() * (5-1 - 0 + 1) + 0);
        //     console.log(ran_mesh);

        //     const ran_y = Math.random() * (45 - 25) + 25;
        //     const ran_z = Math.random() * (65 - 30) + 30;

        //     // setTimeout(() => {}, 5000);
        //     await sleep(750);

        //     const this_id = this_scene.getMeshById(this_mesh_arr[ran_mesh]);
        //     this_id.physicsAggregate.body.applyImpulse(
        //         new BABYLON.Vector3(0, ran_y, ran_z),
        //         this_id.position
        //     );
        // }


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
                            <div>{iteration} iteration</div>
                            <div>{timer} sec</div>
                            
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




