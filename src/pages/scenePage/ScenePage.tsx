import React, { FC, useEffect, useContext, createContext } from "react";
import NewScene from "../../components/NewScene";
import classes from './ScenePage.module.css';
import { useState } from "react";
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
import LoadingPage from "../loadingPage/LoadingPage";


const ScenePage = () => {

    // стейт для открытия модального окна 
    const [open, setOpen] = useState(false);

    return (
            <div className={classes.scene_page}>
                
                {/* // верхняя панель элементов и кнопок */}
                <div className={classes.panel}>
                    <PanelButton onClick={() => setOpen(true)}>Загрузить</PanelButton>
                    <PanelButton>Начать тестирование</PanelButton>
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
        
    );
};

export default ScenePage;
