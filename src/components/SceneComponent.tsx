import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "../App.css";
import * as BABYLON from "@babylonjs/core";

import "@babylonjs/core/Materials/standardMaterial";
// import { CreateSceneClass } from "../createScene";
// import { havokModule } from "../externals/havok";
import { PhysicsShapeBox, PhysicsShapeSphere } from "@babylonjs/core/Physics/v2/physicsShape";
import { PhysicsBody } from "@babylonjs/core/Physics/v2/physicsBody";
import { PhysicsMotionType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
// import HavokPhysics from "@babylonjs/havok/lib/umd/HavokPhysics_umd";
// import HavokPhysics from "https://cdn.babylonjs.com/havok/HavokPhysics_umd.js";



// async function getInitializedHavok() {
//   return await HavokPhysics();
// }


// // initialize plugin
// const havokInstance = await HavokPhysics();
// // pass the engine to the plugin
// const hk = new BABYLON.HavokPlugin(true, havokInstance);

// const havokInstance = await HavokPhysics();
// var hk = new BABYLON.HavokPlugin();
// const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

// const hk = await HavokPhysics();
// const babylonPlugin =  new BABYLON.HavokPlugin(true, hk);
// scene.enablePhysics(gravity, babylonPlugin);

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);


  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;


    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
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


