// import React, { FC } from "react";
import NewScene from "../components/NewScene";
import "../App.css";


const NewScenePage = () => {
    return (
        <div>
                <h3>New Scene Page</h3>

            <div className="panel">
                <div className="panel_button">Move</div>
                <div className="panel_button">Rotate</div>
                <div className="panel_button">Scale</div>
            </div>
            <div>
                <NewScene/>
            </div>
            
                
        </div>
    );
};

export default NewScenePage;