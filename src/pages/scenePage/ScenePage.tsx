import React, { FC, useEffect, useContext, createContext, useState } from "react";
import NewScene from "../../components/NewScene";
import classes from './ScenePage.module.css';
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
import LoadingPage from "../loadingPage/LoadingPage";

import { ModelsContext, useModelsContext } from "../../hooks";
import { MyContext, initialValue } from "../../hooks/MyModelsContext";



const ScenePage = () => {

    // const {modelId, setModelId} = useModelsContext();
    // const {model, setModel} = useStateContext();

    const [value , updateValue] = useState(initialValue);

    // стейт для открытия модального окна 
    const [open, setOpen] = useState(false);

    const startTestingClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        // setModelId("new_value");


        console.log("здесь должно быть прописано управление частями модели");
        console.log("и собственно:  ");
        console.log(value)


    };

    return (
            
        // <ModelsContext>
        // <MyContext.Provider value={{ value, updateValue }} >

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

        // </MyContext.Provider>


            
            
            
        // </ModelsContext>
            
        
    );
};

export default ScenePage;
