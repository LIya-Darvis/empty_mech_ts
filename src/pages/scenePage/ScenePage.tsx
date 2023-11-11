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
    // const [newScene, setNewScene] = useState(NewScene);
    // console.log(newScene, "<- экз новой сцены на странице");

    const [modal, setModal] = useState(false);

    // setModal(false);

    return (
        <div className={classes.scene_page}>
            
            <div className={classes.panel}>
                <PanelButton onClick={() => setModal(true)}>Загрузить</PanelButton>
                {/* <PanelButton onClick={() => setModal(true)}>Настройки</PanelButton> */}
            </div>

            <ModalPanel visible={modal} setVisible={setModal}>
                {/* <div>rggrtgcrhc</div> */}
                <SettingsPage></SettingsPage>
            </ModalPanel>
            
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