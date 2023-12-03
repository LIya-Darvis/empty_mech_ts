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
// import { x } from "../../assets/models"


const ScenePage = () => {

    // для апдейта моделек в сцене
    const { mesh_arr, updateMeshArr } = useModelContext();


    // для апдейта ссылки на саму сцену огооооооо
    const [context_scene , updateScene] = useState(initialScene);

    // стейт для открытия модального окна 
    const [open, setOpen] = useState(false);

    const startTestingClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        console.log("здесь должно быть прописано управление частями модели");

        const this_scene = context_scene.this_scene;
        const this_engine = context_scene.this_engine

        const this_mesh_arr = mesh_arr.value;

        console.log("якобы ссылка на сцену ", this_scene)
        console.log("якобы движок самой сцены ", this_engine)


        console.log("позиция меша по иксу", this_mesh_arr)

        // this_scene.getMeshById("Cylinder").position.y += 3;

        this_mesh_arr.forEach((mesh_id: any) => {
            const this_id = this_scene.getMeshById(mesh_id);
            console.log(this_id)
            // this_id.physicsImpostor = new BABYLON.PhysicsImpostor(this_id, BABYLON.PhysicsImpostor.MeshImpostor, {mass: 15, restitution: 0.5});            
            const mesh_ph_aggr = new BABYLON.PhysicsAggregate(this_id, BABYLON.PhysicsShapeType.MESH, { mass: 10, restitution: 0}, this_scene)
            // this_id.physicsImpostor.applyImpulse(new BABYLON.Vector3 (0, 0.3, 0), this_scene.getMeshById(mesh_id).getAbsolutePosition ())
        });

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
