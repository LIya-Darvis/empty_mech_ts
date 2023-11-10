/* 
здесь в пустую сцену из SceneComponent добавляются объекты, 
но почему то тоже нужно дописывать логику для физики
*/

// import * as Model from "../assets/";

import React from "react";
import { BasicScene } from "./BasicScene";
import "../App.css";
import * as BABYLON from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import "@babylonjs/core/Materials/standardMaterial";
import HavokPhysics from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import '@babylonjs/loaders/OBJ/objFileLoader';
import { ObjectChild } from "./ObjectChild";

// globalThis.HK = await HavokPhysics();

let objectChildren: ObjectChild[] = []

const havokInstance = await HavokPhysics();
const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

const childMass = 22;

export const onSceneReady = (scene:any) => {
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

  // console.log(scene);
    // создание камеры
    const camera = new FreeCamera("camera1", new Vector3(0, 15, -20), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    // настройка освещения
    const light_1 = new HemisphericLight("light", new Vector3(0.6, 1, 0), scene);
    light_1.intensity = 0.7;
    const light_2 = new HemisphericLight("light", new Vector3(1, 0, 1.5), scene);
    light_2.intensity = 0.3;

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene)
    sphere.position.y = 27;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 45, height: 45}, scene);

    // загрузка модельки и физики
    var composite_cube_mesh = BABYLON.SceneLoader.ImportMesh("", "./src/assets/", "composite_cube_with_center.obj", scene, (meshes) => {
      meshes.forEach(childMesh => {
        const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
        objChild.mesh.position.set(0, 4, 0);
        // objChild.mesh.quaternion.set(0, 4, 0, 0);
        objectChildren.push(objChild);
        objChild.display();
        const childAggregate = new BABYLON.PhysicsAggregate(objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
      });

    })
    console.log("-gsehtbjjgwegwc");

    var sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, { mass: 5, restitution: 0.25}, scene);
    var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

};
  

export const onRender = (scene:any) => { 
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  //   // box.rotation.y += (10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
  console.log("рендер");
};

export default () => (
  
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="new_canva" engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined} />
  
);
    
// export default <SceneComponent antialias onSceneReady onRender id="new_canva"/>;

