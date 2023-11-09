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


// globalThis.HK = await HavokPhysics();


const havokInstance = await HavokPhysics();
const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

let box:any;

export const onSceneReady = (scene:any) => {
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

  console.log(scene);
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

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene)
    sphere.position.y = 27;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 45, height: 45}, scene);

    // загрузка модельки

    var composite_cube_mesh = BABYLON.SceneLoader.ImportMesh("", "./src/assets/", "composite_cube_with_center.obj", scene, (meshes) => {

      const com_cube_1 = meshes[0];
      // com_cube_1.parent = null;
      // com_cube_1.normalizeToUnitCube();

      const com_cube_2 = meshes[1];
      const com_cube_3 = meshes[2];

      com_cube_1.position.set(0, 3, 0);
      com_cube_2.position.set(0, 3, 0);
      com_cube_3.position.set(0, 3, 0);


      // com_cube_1.parent = null;

      console.log(com_cube_1.name , "<- название детали");
      console.log(meshes.length , "<- количество деталей");

      // const com_cube_1_ph = new BABYLON.PhysicsShapeMesh(com_cube_1, scene);
      var com_cube_1_aggregate = new BABYLON.PhysicsAggregate(com_cube_1, BABYLON.PhysicsShapeType.MESH, { mass: 2, restitution:0.75}, scene);
      var com_cube_2_aggregate = new BABYLON.PhysicsAggregate(com_cube_2, BABYLON.PhysicsShapeType.MESH, { mass: 2, restitution:0.75}, scene);
      var com_cube_3_aggregate = new BABYLON.PhysicsAggregate(com_cube_3, BABYLON.PhysicsShapeType.MESH, { mass: 2, restitution:0.75}, scene);


    })


    var sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, { mass: 1, restitution:0.75}, scene);
    var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

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
    

