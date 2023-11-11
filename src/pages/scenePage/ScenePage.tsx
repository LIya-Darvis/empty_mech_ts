// import React, { FC } from "react";
import NewScene from "../../components/NewScene";
// import "../../App.css";
import classes from './ScenePage.module.css';
import { useState } from "react";
import PanelButton from "../../components/UI/panelButton/PanelButton";
import DisplayPanel from "../../components/UI/displayPanel/DisplayPanel";
import ModalPanel from "../../components/UI/modalPanel/ModalPanel";
import SettingsPage from "../settingsPage/SettingsPage";


const ScenePage = () => {
    const [newScene, setNewScene] = useState(NewScene);
    console.log(newScene, "<- экз новой сцены на странице")

    return (
        <div className={classes.scene_page}>
            <ModalPanel>
                {/* <div>rggrtgcrhc</div> */}
                <SettingsPage></SettingsPage>
            </ModalPanel>
            <div className={classes.panel}>
                <PanelButton>Загрузить</PanelButton>
            </div>
            
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