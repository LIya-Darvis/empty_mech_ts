/* 
создание пустой сцены
*/

import React, { Fragment, Suspense, createContext, useContext, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "../App.css";
import { Box, Engine, Material, Mesh, Model, Scene, useBeforeRender, useClick, useEngine, useHover, useScene } from "react-babylonjs";
import { Vector3, Color3, PhysicsImpostor } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import HavokPhysics, { ShapeType } from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/loaders/glTF";
import '@babylonjs/loaders/OBJ/objFileLoader';
import '@babylonjs/loaders/glTF/glTFFileLoader';

// import { useModelsContext } from "../hooks";
import { MyContext, useModelContext } from "../hooks/MyModelsContext";
import { useSceneContext } from "../hooks/SceneContext";

const havokInstance = await HavokPhysics();
const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

const gravity = new BABYLON.Vector3(0, -9.8, 0);

function LoadingBox () {
  return (
    <box name="load_box" position={new Vector3(0, 20, 0)}>
        <physicsAggregate type={BABYLON.PhysicsShapeType.BOX} _options={{mass: 3, restitution: 0.2}} />
    </box> 
  )
}

function FinishPoint () {

  const { context_scene, updateScene } = useSceneContext();

  const myMaterial = new BABYLON.StandardMaterial("myMaterial", context_scene.this_scene.scene);
  myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
  myMaterial.specularColor = new BABYLON.Color3(1.5, 1.6, 1.87);
  myMaterial.emissiveColor = new BABYLON.Color3(1, 5, 1);
  myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

  return (
    <box name="finish_point" id="finish_point" position={new Vector3(0, 1, 35)} material={myMaterial}/>
  )
}

// export const LoadingModel = (props:any) => {
  
//   // const {modelId, setModelId} = useModelsContext();
//   // const {model, setModel} = useStateContext();

//   // const handleButtonClick = () => {
//   //   () => setModel('Updated value');
//   // };

//   const scene = useScene();

//   return (
//     <Fragment>
//     <Suspense fallback={ <box name="fallback" position={Vector3.Zero()} />}>

//       <Model id="loadingModel" key={"loadingModel"} rootUrl={props.loadingModels.rootUrl} sceneFilename={props.loadingModels.sceneFilename} 
//             name={props.loadingModels.name} position={new Vector3(0, 3, 0)}

//         onModelLoaded={
//         (loadedModel) => {

//           const meshes_ar = loadedModel.meshes;

//           meshes_ar?.forEach(mesh => {
//             const mesh_ph_aggr = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: 20, restitution: 0}, scene)
//           })

//           console.log(meshes_ar);

//         }}
//       />
//     </Suspense>
//     </Fragment>
//   )
// }

// Чарльз Петцольд????

export const NewScene = () => {

  const { context_scene, updateScene } = useSceneContext();

  // ---- ---- ---- генерация вершин карты поверхности
    var mapSubX = 100;
    var mapSubZ = 120;
    var noiseScale = 0.4;
    var elevationScale = 8.0;
    var mapData = new Float32Array(mapSubX * mapSubZ * 3);

    var paths = [];
    for (var l = 0; l < mapSubZ; l++) {
        var path = [];
        for (var w = 0; w < mapSubX; w++) {
            var x = (w - mapSubX * 0.5) * 2.0;
            var z = (l - mapSubZ * 0.5) * 2.0;
            var y = (Math.random() * noiseScale + Math.random() * noiseScale) / 1.7;
            y *= (0.5 + y) * y * elevationScale;
                   
            mapData[3 *(l * mapSubX + w)] = x;
            mapData[3 * (l * mapSubX + w) + 1] = y;
            mapData[3 * (l * mapSubX + w) + 2] = z;
            
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
    }
    // конец генерации карты

  const defaultModels = [
    {rootUrl: "./src/assets/models/",
      sceneFilename: "composite_cube_with_center.obj",
      name: "name_1_(～￣▽￣)～",
    },
    {rootUrl: "./src/assets/models/",
    sceneFilename: "chains.obj",
    name: "name_2_( ﹁ ﹁ ) ~→",
    },
    {rootUrl: "./src/assets/models/",
    sceneFilename: "test.obj",
    name: "test_model",
    }
  ];

  const scene = useScene();

    return(
      <Fragment>
        <div className="scene_canvas">
          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="new_scene" >
            <Scene enablePhysics={[gravity, havokPlugin]} onSceneMount={scene => {
              context_scene.this_scene = scene.scene

              context_scene.this_engine = scene.scene.getEngine()
              scene.scene.enablePhysics();

              // scene.scene.getMeshById("zxc")?.position._x

              }}>
              <arcRotateCamera
                name="arc"
                target={new Vector3(0, 1, 0)}
                alpha={-Math.PI / 2}
                beta={0.2 + Math.PI / 4}
                wheelPrecision={50}
                radius={14}
                minZ={0.001}
                lowerRadiusLimit={8}
                upperRadiusLimit={100}
                upperBetaLimit={Math.PI / 2}
                position={new Vector3(5, 170, 10)}
                rotation={new Vector3(25, 5, 0)}
              />
              <hemisphericLight
                name="hemi"
                direction={new Vector3(3, 0, -2)}
                intensity={1.0}
                // groundColor={Color3.Random()}
              />
              <directionalLight
                name="shadow-light"
                setDirectionToTarget={[Vector3.Zero()]}
                direction={new Vector3(0, 3, 2)}
                position={new Vector3(-65, 5, -8)}
                intensity={1.2}
                shadowMinZ={1}
                shadowMaxZ={2500}
              />

              {/* <LoadingBox/> */}

              <FinishPoint/>

              <ribbon name="ground_ribbon" pathArray={paths} sideOrientation={1} position={new Vector3(0, -3, 0)}>
                <physicsAggregate
                  type={BABYLON.PhysicsShapeType.MESH}
                  _options={{ mass: 0, restitution: 0.1 }}
                />
              </ribbon>


              {/* <ground
                name="ground1"
                width={200}
                height={320}
                subdivisions={40}
                showSubMeshesBoundingBox={true}
                receiveShadows={true}
                position={new Vector3(0, 0, 0)}>
                <physicsAggregate
                  type={BABYLON.PhysicsShapeType.BOX}
                  _options={{ mass: 0, restitution: 0.01 }}
                />
              </ground> */}

            </Scene>
          </Engine>
        </div>
      </Fragment>


      
    )
    
} 

export default NewScene;

