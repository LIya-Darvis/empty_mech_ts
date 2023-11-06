import React from "react";
import { BasicScene } from "./BasicScene";
import "../App.css";
import SceneComponent from "./SceneComponent";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";


let box:any;

export const onSceneReady = (scene:any) => {

    // создание камеры
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    // настройка освещения
    const light_1 = new HemisphericLight("light", new Vector3(0.6, 1, 0), scene);
    light_1.intensity = 0.7;
    const light_2 = new HemisphericLight("light", new Vector3(1, 0, 0.5), scene);
    light_2.intensity = 0.3;

    // создание базового кубика
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 3;

    // создание платформы
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene); 
};
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
const onRender = (scene:any) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    // const rpm = 10;
    // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default () => (
  <div>
      {/* <h3>场景内容</h3> */}
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="new_canva" />
  </div>
);
    

