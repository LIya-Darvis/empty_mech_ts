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
import { useCountdown } from "../../hooks/useCountdown";
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

export type ModelMeshMoving = {
    meshId: string
    meshImpulse: number
}
export type ModelMeshMovingArr = {
    meshArr: ModelMesh[] | null
}

export var modelMeshArr : ModelMeshArr = {
    meshArr: []
};
export const startPositionhMeshArr : ModelMeshArr = {
    meshArr: []
};
export const finishMeshArr : ModelMeshArr = {
    meshArr: []
};
export const impulseMeshArr : ModelMeshMovingArr = {
    meshArr: []
};

const ScenePage = () => {
    const { mesh_arr, updateMeshArr } = useModelContext();      // для апдейта моделек в сцене
    const [context_scene , updateScene] = useState(initialScene);    // для апдейта ссылки на сцену
    const [open, setOpen] = useState(false);     // стейт для открытия модального окна
    const [finishStatus, setFinishStatus] = useState(false);    // промежуточная переменная для дамага на цикл итераций
    const [iteration, setIteration] = useState(1);      // кол-во итераций
    const iterationRef = useRef<number>(0);

    // все для таймера, все для победы
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<number>(0);

    const globalTimer = 25;
    const globalMass = 24.0;

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

    // установка базовых параметров для работы нейронки
    async function const_initialize(mesh_count: number, mesh_mass: number) {
        console.log(await invoke('const_initialize', {meshCount: mesh_count, meshMass: mesh_mass}));
    }

    // функция на передвижение
    async function moving(meshes_json: string, finish_json: string) {
        let func_result = await invoke('moving', {meshesArr: meshes_json, finishPoint: finish_json});
        return JSON.parse(func_result);  // предупреждение, а не ошибка
    }

    // функция для активации поиска оптимального паттерна управления в пределах таймера
    const startTestingClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine
        let this_mesh_arr = mesh_arr.value;

        // обнуление параметров
        modelMeshArr.meshArr?.reduce;
        startPositionhMeshArr.meshArr?.reduce;
        finishMeshArr.meshArr?.reduce;

        // назначение физики
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            this_id.physicsAggregate = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, 
                                                            { mass: globalMass, restitution: 0.05, friction: 0.5}, this_scene)
        });

        // задержка старта после применения физики
        await sleep(3000);

        // занесение данных о положении мешей, в которое нужно вернуться
        // после достижения финиша или истечения времени таймера
        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            const mesh_x_position = this_id.position._x;
            const mesh_y_position = this_id.position._y;
            const mesh_z_position = this_id.position._z;
            let buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
            let buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
            modelMeshArr.meshArr?.push(buffer_mesh);
            startPositionhMeshArr.meshArr?.push(buffer_mesh);
        });

        console.log(startPositionhMeshArr.meshArr?.length);
        const_initialize(startPositionhMeshArr.meshArr?.length, globalMass);  // предупреждение, а не ошибка


        // назначение конечной точки
        const finish_position: MeshPosition = {x:0, y:1, z:35};
        const finish_mesh : ModelMesh = {meshId: "finish_point", meshPosition: finish_position};
        finishMeshArr.meshArr?.push(finish_mesh);
        // let modelJson = JSON.stringify(modelMeshArr.meshArr);
        const finishJson = JSON.stringify(finishMeshArr.meshArr);

        // начало работы итераций
        // setTimer(5);
        timerRef.current = globalTimer;
        while (iterationRef.current <= 15) {
            console.log(timerRef.current);

            // начало работы таймера
            asyncCall(globalTimer);
            while (timerRef.current > 0) {

                await console.log("происходящее остается за кадром");

                // когда время таймера истекло
                if (timerRef.current < 0) {
                    console.log(timerRef.current);
                    
                    break;
                }
                else {

                    modelMeshArr.meshArr = [];

                    this_mesh_arr.forEach((mesh_id: any) => {
                        const this_id = this_scene.getMeshById(mesh_id);
                        const mesh_x_position = this_id.position._x;
                        const mesh_y_position = this_id.position._y;
                        const mesh_z_position = this_id.position._z;
                        let buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
                        let buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
                        modelMeshArr.meshArr?.push(buffer_mesh);
                    });

                    const modelJson = JSON.stringify(modelMeshArr.meshArr);

                    console.log(modelJson);

                    const imp_arr = await moving(modelJson, finishJson);

                    await sleep(350);

                    console.log(imp_arr);
                    console.log(imp_arr.length);

                    console.log(typeof(imp_arr[0].meshPosition.x));

                    for (let i = 0; i < imp_arr.length; i++) {
                        const this_id = this_scene.getMeshById(imp_arr[i].meshId);
                        this_id.physicsAggregate.body.applyImpulse(
                            new BABYLON.Vector3(imp_arr[i].meshPosition.x, imp_arr[i].meshPosition.y, imp_arr[i].meshPosition.z),
                            this_id.position
                        );
                        await sleep(250);
                        
                    }

                    // for (let i = 0; i < 45; i++) {
                    //     const ran_mesh = Math.floor(Math.random() * (5-1 - 0 + 1) + 0);
                    //     // console.log(ran_mesh);

                    //     const ran_x = Math.random() * (5 - (-5)) + (-5);
                    //     const ran_y = Math.random() * (85 - 65) + 65;
                    //     const ran_z = Math.random() * (85 - 50) + 50;

                    //     // setTimeout(() => {}, 5000);
                        

                    //     const this_id = this_scene.getMeshById(this_mesh_arr[ran_mesh]);
                    //     this_id.physicsAggregate.body.applyImpulse(
                    //         new BABYLON.Vector3(ran_x, ran_y, ran_z),
                    //         this_id.position

                            
                    //     );

                    //     modelMeshArr.meshArr = [];

                    //     this_mesh_arr.forEach((mesh_id: any) => {
                    //         const this_id = this_scene.getMeshById(mesh_id);
                    //         const mesh_x_position = this_id.position._x;
                    //         const mesh_y_position = this_id.position._y;
                    //         const mesh_z_position = this_id.position._z;
                    //         let buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
                    //         let buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
                    //         modelMeshArr.meshArr?.push(buffer_mesh);
                    //     });

                    //     const modelJson = JSON.stringify(modelMeshArr.meshArr);

                    //     await moving(modelJson, finishJson);

                    //     await sleep(350);
                    // }
                    
                    console.log(timerRef.current);
                }
            }
            setIteration(iteration + 1);
            iterationRef.current += 1;
            timerRef.current = globalTimer
            
            this_mesh_arr.forEach((mesh_id: any) => {
                this_scene.getMeshById(mesh_id).dispose();
                // let counter = 0
                // for (let index = 0; index < startPositionhMeshArr.meshArr.length; index++) {
                //     if (startPositionhMeshArr.meshArr[index].meshId == mesh_id) {
                //         counter = index
                //         break;
                //     }
                // }
                // const start_id = startPositionhMeshArr.meshArr[counter].meshId;
                // console.log(mesh_id, "( o o)", start_id)
                // // this_scene.getMeshById(mesh_id).position = 
                // //             new BABYLON.Vector3(startPositionhMeshArr.meshArr[counter].meshPosition.x, 
                // //                                 startPositionhMeshArr.meshArr[counter].meshPosition.y, 
                // //                                 startPositionhMeshArr.meshArr[counter].meshPosition.z);
                
                // this_scene.getMeshById(mesh_id).position.x = startPositionhMeshArr.meshArr[counter].meshPosition.x;
                // this_scene.getMeshById(mesh_id).position.y = startPositionhMeshArr.meshArr[counter].meshPosition.y;
                // this_scene.getMeshById(mesh_id).position.z = startPositionhMeshArr.meshArr[counter].meshPosition.z;
                // console.log(this_scene.getMeshById(mesh_id).position)
            });

            // повторная загрузка модели
            BABYLON.SceneLoader.ImportMesh("", "src/assets/models/", "test.obj", this_scene, function (newMeshes) {
                // const new_mesh_arr: any[] = [];
                newMeshes.forEach(mesh => {
                    // new_mesh_arr.push(mesh.id);
                    const this_id = this_scene.getMeshById(mesh.id);
                    const mesh_x_position = this_id.position._x;
                    const mesh_y_position = this_id.position._y;
                    const mesh_z_position = this_id.position._z;
                    const buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
                    const buffer_mesh : ModelMesh = {meshId: mesh.id, meshPosition: buffer_position};
                    modelMeshArr.meshArr?.push(buffer_mesh);
                });
                // mesh_arr.value = new_mesh_arr;
                // this_mesh_arr.forEach((mesh_id: any) => {
                //     const this_id = this_scene.getMeshById(mesh_id);
                //     const mesh_x_position = this_id.position._x;
                //     const mesh_y_position = this_id.position._y;
                //     const mesh_z_position = this_id.position._z;
                //     const buffer_position: MeshPosition = {x: mesh_x_position, y: mesh_y_position, z: mesh_z_position};
                //     const buffer_mesh : ModelMesh = {meshId: mesh_id, meshPosition: buffer_position};
                //     modelMeshArr.meshArr?.push(buffer_mesh);
                //     startPositionhMeshArr.meshArr?.push(buffer_mesh);
                // });
            });

            this_mesh_arr = mesh_arr.value;

            console.log(this_mesh_arr);
            await sleep (2500);

            // повторное назначение физики
            this_mesh_arr.forEach((mesh_id: any) => {
                const this_id = this_scene.getMeshById(mesh_id);
                this_id.physicsAggregate = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, { mass: globalMass, restitution: 0}, this_scene)
            });

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
                            <div>{iterationRef.current} iteration</div>
                            <div>{timerRef.current} sec</div>
                            
                            <div> </div>
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




