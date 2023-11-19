import React, { FC, useEffect } from "react";
import NewScene from "../../components/NewScene";
import classes from './ScenePage.module.css';
import { useState } from "react";
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
// import SettingsPage from "../settingsPage/SettingsPage";
import LoadingPage from "../loadingPage/LoadingPage";


const ScenePage = () => {

    const [open, setOpen] = useState(false);


    return (
        <div className={classes.scene_page}>
            
            <div className={classes.panel}>
                <PanelButton onClick={() => setOpen(true)}>Загрузить</PanelButton>
            </div>

            { open && (
                
                <ModalPanel open={open} setOpen={setOpen}>
                    <LoadingPage></LoadingPage>
                </ModalPanel>
            )}

            
            <div className={classes.scene}>
            
                <DisplayPanel>
                    <div>n fps</div>
                    <div>¯\_(ツ)_/¯</div>
                    <div>obj model</div>
                </DisplayPanel>
                <NewScene/>
            </div>
            
            
                
        </div>
    );
};

export default ScenePage;