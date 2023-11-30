import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import * as BABYLON from "@babylonjs/core";
import App from "./App";

import { MyContext } from "./hooks/MyModelsContext";


// import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
    <App />

);


// все что ниже пока не нужно, но только ПОКА


















// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// // import { GUI } from '../node_modules/dat.gui'
// import Stats from 'three/examples/jsm/libs/stats.module.js'
// import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
// import * as CANNON from 'cannon-es'
// import CannonUtils from 'cannon-utils/src/cannon-utils'
// import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";
// // import CannonDebugRenderer from '../node_modules/cannon-es-debugger/dist/cannon-es-debugger'
// import { ObjectChild } from "./components/ObjectChild";
// import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
// import * as BABYLON from '@babylonjs/core'


// let pageRoot: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
// (document.getElementById('root') as HTMLDivElement).innerHTML = ''

// let canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement;

// console.log("oheworihenru")

// const engine: BABYLON.Engine = new BABYLON.Engine(canvas);
// // const scene: BABYLON.Scene = new BABYLON.Scene();
// // const box: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("box", {});

// var scene = new BABYLON.Scene(engine);


// scene.createDefaultCameraOrLight(true,true, true);




// // This creates and positions a free camera (non-mesh)
// // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// // // This targets the camera to scene origin
// // camera.setTarget(BABYLON.Vector3.Zero());

// // // This attaches the camera to the canvas
// // camera.attachControl(canvas, true);

// // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
// var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// // Default intensity is 1. Let's dim the light a small amount
// light.intensity = 0.7;

// // Our built-in 'sphere' shape.
// var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

// // Move the sphere upward at 4 units
// sphere.position.y = 4;

// // Our built-in 'ground' shape.
// var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

// // initialize plugin
// var hk: BABYLON.HavokPlugin = new BABYLON.HavokPlugin();
// // enable physics in the scene with a gravity
// scene.enablePhysics(new BABYLON.Vector3(0, -1, 0), hk);

// // Create a sphere shape and the associated body. Size will be determined automatically.
// var sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, { mass: 1 }, scene);

// // Create a static box shape.
// var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);


// // var AddToggle = function (toggleText, panel) {
// //     var toggleViewLine = new BABYLON.GUI.StackPanel("toggleViewLine");
// //     toggleViewLine.isVertical = false;
// //     toggleViewLine.horizontalAlignment =
// //         BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
// //     toggleViewLine.spacing = 5;
// //     toggleViewLine.resizeToFit = true;
// //     toggleViewLine.height = "25px";
// //     panel.addControl(toggleViewLine);
// //     var checkbox = new BABYLON.GUI.Checkbox();
// //     checkbox.verticalAlignment = 0; //BABYLON.Control.VERTICAL_ALIGNMENT_TOP;
// //     checkbox.width = "20px";
// //     checkbox.height = "20px";
// //     checkbox.isChecked = false;
// //     checkbox.color = "green";
// //     toggleViewLine.addControl(checkbox);
// //     toggleViewLine.paddingTop = 2;

// //     var checkboxText = new BABYLON.GUI.TextBlock(
// //         "checkboxText",
// //         toggleText
// //     );
// //     checkboxText.resizeToFit = true;
// //     checkboxText.color = "white";
// //     toggleViewLine.addControl(checkboxText);
// //     return checkbox;
// // };

// engine.runRenderLoop(() => {
//     scene.render();
// });




