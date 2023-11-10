// import React, { FC } from "react";
import NewScene from "../components/NewScene";
import "../App.css";
import { useState } from "react";


const NewScenePage = () => {
    const [newScene, setNewScene] = useState(NewScene);
    console.log(newScene, "<- экз новой сцены")

    return (
        <div>

            <div className="panel">
                <div className="panel_button">Move</div>
                <div className="panel_button">Rotate</div>
                <div className="panel_button">Scale</div>
                <h3>New Scene Page</h3>

            </div>
            <div>
                <NewScene/>
            </div>
            
                
        </div>
    );
};

export default NewScenePage;