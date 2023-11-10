/*
здесь описана логика самой базовой пустой сцены с физикой
*/

import { useEffect, useRef } from "react";
import { Engine, Scene, Vector3 } from "@babylonjs/core";
import "../App.css";
import * as BABYLON from "@babylonjs/core";


import HavokPhysics from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import { AmmoJSPlugin } from "../../node_modules/@babylonjs/core/Physics/Plugins/ammoJSPlugin";

// globalThis.HK = await HavokPhysics();

const havokInstance = await HavokPhysics();
const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

var useV2 = true;



export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;


    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

    if (scene.isReady()) {
      // scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
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
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas className="scene_canvas" ref={reactCanvas} {...rest} />;
};


