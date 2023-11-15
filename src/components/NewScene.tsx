/* 
здесь в пустую сцену из SceneComponent добавляются объекты, 
но почему то тоже нужно дописывать логику для физики
*/

// import * as Model from "../assets/";

import React from "react";
import { BasicScene } from "./BasicScene";
import "../App.css";
import * as BABYLON from "@babylonjs/core";
// import { Engine, Scene} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Materials/standardMaterial";
import HavokPhysics from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import '@babylonjs/loaders/OBJ/objFileLoader';
import { ObjectChild } from "./ObjectChild";
import { NewMesh } from "./NewMesh";

import { Suspense } from 'react';
import { Scene, Engine, Sphere, Mesh, Box, Model, Material } from 'react-babylonjs';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';
// import BouncySphere from './BouncySphere';

// globalThis.HK = await HavokPhysics();

let objectChildren: ObjectChild[] = []

const havokInstance = await HavokPhysics();
// const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
// const gravity = new BABYLON.Vector3(0, -9.8, 0);

const childMass = 22;


// export const onSceneReady = (scene:any) => {
//   scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

//   // console.log(scene);
//     // создание камеры
//     const camera = new FreeCamera("camera1", new Vector3(0, 15, -20), scene);
//     camera.setTarget(Vector3.Zero());
//     const canvas = scene.getEngine().getRenderingCanvas();
//     camera.attachControl(canvas, true);

//     // настройка освещения
//     const light_1 = new HemisphericLight("light", new Vector3(0.6, 1, 0), scene);
//     light_1.intensity = 0.7;
//     const light_2 = new HemisphericLight("light", new Vector3(1, 0, 1.5), scene);
//     light_2.intensity = 0.3;

//     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene)
//     sphere.position.y = 27;

//     var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 45, height: 45}, scene);

//     // console.log("вывод где нужно ", onLoading.call);

//     // загрузка модельки и физики
//     var composite_cube_mesh = BABYLON.SceneLoader.ImportMesh("", "./src/assets/", "composite_cube_with_center.obj", scene, (meshes) => {
      
//       meshes.forEach(childMesh => {
//         const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
//         objChild.mesh.position.set(0, 4, 0);
//         // objChild.mesh.quaternion.set(0, 4, 0, 0);
//         objectChildren.push(objChild);
//         objChild.display();
//         const childAggregate = new BABYLON.PhysicsAggregate(objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
//       });

//     })

//     //var sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, { mass: 5, restitution: 0.25}, scene);
//     var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

// };

// export const onRender = (scene:any) => { 
//   // if (box !== undefined) {
//   //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
//   //   // box.rotation.y += (10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
//   // }
//   console.log("рендер");
// };

// export const onLoading = (meshName) => {
//   console.log(meshName, "<- вывод в загрузке");
// };



// export default NewScene;

const NewScene = () => {

  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
  const gravity = new BABYLON.Vector3(0, -9.8, 0);

  return (
    // <div className="">
      // <h3>esxdctfvygbuhni</h3>
      <Engine antialias={true}
          adaptToDeviceRatio={true}
          canvasId="sample-canvas">
            <Scene enablePhysics={[gravity, havokPlugin]}>
                <arcRotateCamera
                  name="arc"
                  target={new Vector3(0, 1, 0)}
                  alpha={-Math.PI / 2}
                  beta={0.2 + Math.PI / 4}
                  wheelPrecision={50}
                  radius={14}
                  minZ={0.001}
                  lowerRadiusLimit={8}
                  upperRadiusLimit={70}
                  upperBetaLimit={Math.PI / 2}
                />
                <hemisphericLight
                  name="hemi"
                  direction={new Vector3(-7, 0, -7)}
                  intensity={0.4}
                  // groundColor={Color3.Random()}
                />
                <directionalLight
                  name="shadow-light"
                  setDirectionToTarget={[Vector3.Zero()]}
                  direction={new Vector3(0, 3, 5)}
                  position={new Vector3(-2, 8, -4)}
                  intensity={1.3}
                  shadowMinZ={1}
                  shadowMaxZ={2500}
                />

                <Suspense fallback={ <box name="fallback" position={Vector3.Zero()} />}>
                  <Model name="loaded_model"
                    rootUrl={'./src/assets/'}
                    sceneFilename="composite_cube_with_center.obj"
                    position={new Vector3(0, -0.5, 0)}
                    onModelLoaded={(loadedModel) => {
                      const bottle = loadedModel.meshes?.find((m) => m.name === "Cube");
                      bottle.parent = null; // comment this line and it doesn't work!
                      bottle.physicsImpostor = new PhysicsImpostor(
                        bottle,
                        PhysicsImpostor.MeshImpostor,
                        { mass: 1 }
                      );
                      
                    }}

                    // meshes.forEach(childMesh => {
                      //         const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
                      //         objChild.mesh.position.set(0, 4, 0);
                      //         // objChild.mesh.quaternion.set(0, 4, 0, 0);
                      //         objectChildren.push(objChild);
                      //         objChild.display();
                      //         const childAggregate = new BABYLON.PhysicsAggregate(objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
                      //       });
                    >
                      {/* <physicsImpostor type={PhysicsImpostor.MeshImpostor} _options={{
                          mass: 1,
                          restitution: 0.9
                      }} /> */}
                    <standardMaterial
                      name={"model_standart_met"}
                      diffuseColor={Color3.Yellow()}
                      // ambientColor={Color3.Green()}
                      // emissiveColor={Color3.Green()}
                      specularColor={Color3.Black()}
                    />
                  </Model>
                </Suspense>

                

                  {/* <Mesh>
                    
                  </Mesh> */}

                  {/* <Model name="composite_cube"
                          rootUrl="./src/assets/"
                          sceneFilename="composite_cube_with_center.obj"
                          
                          // onModelLoaded={(loadedModel) => {
                          //   meshes.forEach(childMesh => {
                          //     const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
                          //     objChild.mesh.position.set(0, 4, 0);
                          //     // objChild.mesh.quaternion.set(0, 4, 0, 0);
                          //     objectChildren.push(objChild);
                          //     objChild.display();
                          //     const childAggregate = new BABYLON.PhysicsAggregate(objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
                          //   });
                          // }}
                          
                  >
                    <standardMaterial
                      name={"iowuerf"}
                      specularColor={Color3.Black()}
                    />
                  </Model> */}

            <ground
              name="ground1"
              width={50}
              height={50}
              subdivisions={0}
              receiveShadows={true}
            >
              {/* <physicsImpostor
                type={PhysicsImpostor.BoxImpostor}
                _options={{ mass: 0, restitution: 0.9 }}
              /> */}
            </ground>
            </Scene>
      </Engine>
    // </div>
  )

}

export default NewScene;

// export default (meshName: string) => (
//     <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} onLoading={onLoading(meshName)} id="new_canva" engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined} />
// );
    
// export default <SceneComponent antialias onSceneReady onRender id="new_canva"/>;

