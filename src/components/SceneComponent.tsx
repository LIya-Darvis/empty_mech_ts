/*
здесь описана логика самой базовой пустой сцены с физикой
*/

import { useEffect, useRef } from "react";
import { Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import "../App.css";
import * as BABYLON from "@babylonjs/core";

import HavokPhysics from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import { AmmoJSPlugin } from "../../node_modules/@babylonjs/core/Physics/Plugins/ammoJSPlugin";

// globalThis.HK = await HavokPhysics();

const havokInstance = await HavokPhysics();
// const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
const gravity = new BABYLON.Vector3(0, -9.8, 0);

var useV2 = true;



export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, loadedModel, ...rest }) => {
  const reactCanvas = useRef(null);

  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
  // const gravity = new BABYLON.Vector3(0, -9.8, 0);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    console.log(loadedModel);

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    scene.enablePhysics(gravity, havokPlugin);

    

    if (loadedModel === null) {
      console.log("ничего страшного");
    } else {
      console.log("протагонист этого мира:", loadedModel);
    }

    if (scene.isReady()) {
      
      // if (scene.enablePhysics.length <= 0) {
      //   console.log("физическая настройка мира незавершена");
      // } else {
      //   scene.enablePhysics(gravity, havokPlugin);
      //   onSceneReady(scene);
      // };

      scene.enablePhysics(gravity, havokPlugin);
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      const camera = new FreeCamera("camera1", new Vector3(0, 15, -20), scene);
      camera.setTarget(Vector3.Zero());
      scene.render();
    });

    
    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize); 
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, loadedModel]);

  return <canvas className="scene_canvas" ref={reactCanvas} {...rest} />;
};


