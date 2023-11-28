import React, { FC, useEffect, useContext, createContext } from "react";
import NewScene from "../../components/NewScene";
import classes from './ScenePage.module.css';
import { useState } from "react";
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
import LoadingPage from "../loadingPage/LoadingPage";
import { CurrentModelContext, CurrentModelContextType } from "../../hooks/MyGlobalContext";
import * as BABYLON from "@babylonjs/core";


const ScenePage = () => {

    const [currentModel, setCurrentModel] = useState<CurrentModelContextType>({
        modelArr: [],
    });

    // стейт для открытия модального окна 
    const [open, setOpen] = useState(false);

    const startTestingClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("здесь должно быть прописано управление частями модели");
        console.log("и собственно:  ");
        console.log(currentModel);

    };

    return (
        <CurrentModelContext.Provider value={currentModel}>
            
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

        </CurrentModelContext.Provider>

            


        
    );
};

export default ScenePage;
