/* 
здесь в пустую сцену из SceneComponent добавляются объекты, 
но почему то тоже нужно дописывать логику для физики
*/

import React, { Suspense, useRef, useState } from "react";
import "../App.css";
import { Engine, GroundFromHeightMap, Mesh, Model, Scene, TiledGround, useBeforeRender, useClick, useEngine, useHover, useScene } from "react-babylonjs";
import { Vector3, Color3, PhysicsImpostor } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import HavokPhysics, { ShapeType } from "../../node_modules/@babylonjs/havok";
import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/loaders/glTF";
import '@babylonjs/loaders/OBJ/objFileLoader';
import '@babylonjs/loaders/glTF/glTFFileLoader';
// import * as x_1 from '../assets/models/'

const DefaultScale =  new Vector3(1, 1, 1)
const BiggerScale = new Vector3(30, 30, 30)

const havokInstance = await HavokPhysics();
const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
// globalThis.HK = await HavokPhysics();

const gravity = new BABYLON.Vector3(0, -9.8, 0);

export let meshes_ar:BABYLON.AbstractMesh[] = [];


function LoadingBox () {

  return (
    <box name="qwe" position={new Vector3(0, 50, 0)}>
        <physicsAggregate type={BABYLON.PhysicsShapeType.BOX} _options={{mass: 3, restitution: 0.2}} />
    </box> 
  )
}

export const LoadingModel = (props:any) => {
  const scene = useScene();

  return (
    <Suspense fallback={ <box name="fallback" position={Vector3.Zero()} />}>

      <Model key={"loadingModel"} rootUrl={props.loadingModels.rootUrl} sceneFilename={props.loadingModels.sceneFilename} 
            name={props.loadingModels.name} position={new Vector3(0, 15, 0)}

        onModelLoaded={
        (loadedModel) => {

          let meshes_ar = loadedModel.meshes;

          meshes_ar?.forEach(mesh => {
            console.log(mesh);
            const mesh_ph_aggr = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: 20, restitution: 0}, scene)
            // console.log(mesh_ph_aggr)
          })

        }}

        
      />
    </Suspense>
    
  )
}

// Петцольд????

export const NewScene = () => {


  // ---- ---- ---- генерация вершин карты поверхности
    var mapSubX = 20;
    var mapSubZ = 20;
    var noiseScale = 0.3;
    var elevationScale = 8.0;
    var mapData = new Float32Array(mapSubX * mapSubZ * 3); // 3 float values per point : x, y and z

    var paths = [];                             // array for the ribbon model
    for (var l = 0; l < mapSubZ; l++) {
        var path = [];                          // only for the ribbon
        for (var w = 0; w < mapSubX; w++) {
            var x = (w - mapSubX * 0.5) * 2.0;
            var z = (l - mapSubZ * 0.5) * 2.0;
            var y = (Math.random() * noiseScale + Math.random() * noiseScale + Math.random() * noiseScale) / 2.75;
            y *= (0.5 + y) * y * elevationScale;   // let's increase a bit the noise computed altitude
                   
            mapData[3 *(l * mapSubX + w)] = x;
            mapData[3 * (l * mapSubX + w) + 1] = y;
            mapData[3 * (l * mapSubX + w) + 2] = z;
            
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
    }
    // конец генерации карты

  const defaultModels = [
    {rootUrl: "../assets/models/",
      sceneFilename: "composite_cube_with_center.obj",
      name: "cute_name_(～￣▽￣)～",
    },
    {rootUrl: "../assets/models/",
    sceneFilename: "chains.obj",
    name: "cool_name_( ﹁ ﹁ ) ~→",
    },
    {rootUrl: "./src/assets/models/",
    sceneFilename: "test.obj",
    name: "hmmmmm_(⌐■_■)",
    }
  ];

  const scene = useScene();

    return(
      <div className="scene_canvas">
      <Engine antialias={true} adaptToDeviceRatio={true} canvasId="new_scene">
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

          <LoadingBox/>

          <LoadingModel loadingModels={{rootUrl: defaultModels[2].rootUrl, 
                                      sceneFilename: defaultModels[2].sceneFilename, 
                                      name: defaultModels[2].name}}/>

          
          <ribbon name="ground_ribbon" pathArray={paths} sideOrientation={1}>
            <physicsAggregate
              type={BABYLON.PhysicsShapeType.MESH}
              _options={{ mass: 0, restitution: 0.1 }}
            />
          </ribbon>


          {/* <groundFromHeightMap 
            name="groundMap"
            url="./src/assets/maps/map_1.png"
            width={300}
            height={98}
            subdivisions={10}
            minHeight={0}
            maxHeight={20}
            position={new Vector3(0, 0, 0)}
                        
            >
              
            <physicsAggregate
              type={BABYLON.PhysicsShapeType.BOX}
              _options={{ mass: 0, restitution: 0.1 }}
            />
            

          </groundFromHeightMap> */}


          {/* <groundFromHeightMap 
            name="groundMap"
            url="./src/assets/maps/map_1.png"
            width={300}
            height={98}
            subdivisions={15}
            minHeight={0}
            maxHeight={20}
            position={new Vector3(0, -1, 0)}
            >

            {/* <physicsImpostor type={BABYLON.PhysicsShapeType.CONVEX_HULL}
            _options={{mass: 0, restitution: 0.1}}/> 


            <physicsAggregate
              type={BABYLON.PhysicsShapeType.BOX}
              _options={{ mass: 0, restitution: 0.1 }}
            />
          </groundFromHeightMap>
          */}


          <ground
            name="ground1"
            width={50}
            height={50}
            subdivisions={5}
            receiveShadows={true}
            position={new Vector3(0, -5, 0)}>
            <physicsAggregate
              type={BABYLON.PhysicsShapeType.BOX}
              _options={{ mass: 0, restitution: 0.1 }}
            />
          </ground>

        </Scene>
      </Engine>
    </div>
    )
    
} 

export default NewScene;

// export default (loaded_model: any) => (

//     <div>
//       <LoadingModel/>
//     </div>
//   );










































// import * as Model from "../assets/";

// import React from "react";
// import { BasicScene } from "./BasicScene";
// import "../App.css";
// import * as BABYLON from "@babylonjs/core";
// // import { Engine, Scene} from "@babylonjs/core";
// import SceneComponent from "./SceneComponent";
// import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Color3, CannonJSPlugin, PhysicsBody } from "@babylonjs/core";
// import "@babylonjs/core/Materials/standardMaterial";
// import HavokPhysics from "../../node_modules/@babylonjs/havok";
// import {HavokPlugin } from "../../node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin";
// import '@babylonjs/loaders/OBJ/objFileLoader';
// import { ObjectChild } from "./ObjectChild";
// import { NewMesh } from "./NewMesh";

// import { Suspense } from 'react';
// import { Scene, Engine, Sphere, Mesh, Box, Model, Material, PhysicsAggregate, SceneContext, SceneLoaderContextProvider, LoadedModel } from 'react-babylonjs';
// import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';
// import "@babylonjs/loaders/OBJ";
// import "@babylonjs/loaders/glTF";
// import * as CANNON from 'cannon-es';
// import BouncySphere from './BouncySphere';

// globalThis.HK = await HavokPhysics();

// let objectChildren: ObjectChild[] = []

// const havokInstance = await HavokPhysics();
// const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
// const gravity = new BABYLON.Vector3(0, -9.8, 0);

// const childMass = 30;

// export const onSceneReady = (scene:any) => {
//   scene.enablePhysics(gravity, havokPlugin);

//   console.log(scene);
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

//     // загрузка модельки и физики
//     var composite_cube_mesh = BABYLON.SceneLoader.ImportMesh("", "./src/assets/", "composite_cube_with_center.obj", scene, (meshes) => {
      
//       meshes.forEach(childMesh => {
//         const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
//         objChild.mesh.position.set(0, 10, 0);
//         // objChild.mesh.quaternion.set(0, 4, 0, 0);
//         objectChildren.push(objChild);
//         objChild.display();
//         const childAggregate = new BABYLON.PhysicsAggregate( objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
//       });

//     })

//     var sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, { mass: 5, restitution: 0.25}, scene);
//     var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

// };

// export const onRender = (scene:any) => { 
//   // if (box !== undefined) {
//   //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
//   //   // box.rotation.y += (10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
//   // }
//   console.log("рендер");
// };


// export default NewScene;

// const NewScene = () => {

//   // const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
//   // console.log(havokPlugin)
//   // const gravity = new BABYLON.Vector3(0, -9.8, 0);
  

//   return (
//     // <div className="">
//       // <h3>esxdctfvygbuhni</h3>
//       <Engine antialias={true}
//           adaptToDeviceRatio={true}
//           canvasId="sample-canvas">

//             <Scene enablePhysics={[new BABYLON.Vector3(0, -9.8, 0), new BABYLON.HavokPlugin(true, havokInstance)]}>
//               <arcRotateCamera
//                   name="arc"
//                   position={new Vector3(0, -25, 0)}
//                   rotation={new Vector3(0, 40, 0)}
//                   target={new Vector3(0, 1, 0)}
//                   alpha={-Math.PI / 2}
//                   beta={0.2 + Math.PI / 4}
//                   wheelPrecision={50}
//                   radius={14}
//                   minZ={0.001}
//                   lowerRadiusLimit={8}
//                   upperRadiusLimit={70}
//                   upperBetaLimit={Math.PI / 2}
//                 />
//                 <hemisphericLight
//                   name="hemi"
//                   direction={new Vector3(-7, 0, -7)}
//                   intensity={0.4}
//                 />
//                 <directionalLight
//                   name="shadow-light"
//                   setDirectionToTarget={[Vector3.Zero()]}
//                   direction={new Vector3(0, 3, 5)}
//                   position={new Vector3(-2, 8, -4)}
//                   intensity={1.3}
//                   shadowMinZ={1}
//                   shadowMaxZ={2500}
//                 />

//                 <box name="box1"
//                     size={2}
//                     position={new Vector3(0, 14, 0)}>
//                   <physicsImpostor
//                     type={PhysicsImpostor.BoxImpostor}
//                     _options={{ mass: 3, restitution: 0.9 }}
//                   />
//                   {/* <PhysicsBody >

//                   </PhysicsBody> */}
//                 </box>

//                 <Suspense fallback={ <box name="fallback" position={Vector3.Zero()} />}>
//                   <Model name="loaded_model"
//                     rootUrl={'./src/assets/'}
//                     sceneFilename="composite_cube_with_center.obj"
//                     position={new Vector3(0, 1.5, 0)}                    

//                     onModelLoaded={(loadedModel) => {
//                       console.log(loadedModel.meshes?.length);
//                       let cparent = new BABYLON.TransformNode();

//                       for (var index = 0; index < loadedModel.meshes.length; index++) {
//                           let city1 = loadedModel.meshes?.[index];

//                           city1.physicsImpostor = new BABYLON.PhysicsImpostor(city1, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 4, friction: 0, restitution: 0});

//                           city1.parent = null;
//                       }

//                     }}

//                     /*
//                     // onModelLoaded={(loadedModel) => {
//                     //   console.log(loadedModel);
//                     //   const meshes_ar = loadedModel.meshes;
//                     //   console.log(meshes_ar);

//                       // избавляемся от привязки координат к родительскому мешу
//                       // let modelParent = loadedModel.meshes[0];
//                       // loadedModel = modelParent.getChildMeshes()[0];
                    

//                     //   meshes_ar?.forEach(loaded_mesh => {
//                     //     const mesh = meshes_ar?.find((m) => m.id === loaded_mesh.id);
//                     //     // const mesh = loaded_mesh;
//                     //     console.log(mesh.name);

//                     //     mesh.parent = null;
//                     //     // mesh.dispose();
//                     //     // const mesh_ph_aggr = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05})
//                     //     mesh.physicsImpostor = new PhysicsImpostor(
//                     //       mesh,
//                     //       PhysicsImpostor.MeshImpostor,
//                     //       { mass: 4 }
//                     //     );
//                     //     console.log(mesh.physicsImpostor);
//                     //   });
                      
//                     // }}

//                     // meshes.forEach(childMesh => {
//                       //         const objChild = new ObjectChild(childMesh.id, childMesh.name, childMesh, childMass);
//                       //         objChild.mesh.position.set(0, 4, 0);
//                       //         // objChild.mesh.quaternion.set(0, 4, 0, 0);
//                       //         objectChildren.push(objChild);
//                       //         objChild.display();
//                       //         const childAggregate = new BABYLON.PhysicsAggregate(objChild.mesh, BABYLON.PhysicsShapeType.MESH, { mass: childMass, restitution: 0.05}, scene);
//                       //       });
//                       */
//                     >
//                       {/* <physicsImpostor type={PhysicsImpostor.MeshImpostor} _options={{
//                           mass: 14,
//                           restitution: 0.9,
//                           shape: Mesh,
//                       }} /> */}
//                     <standardMaterial
//                       name={"model_standart_met"}
//                       diffuseColor={Color3.Yellow()}
//                       // ambientColor={Color3.Green()}
//                       // emissiveColor={Color3.Green()}
//                       specularColor={Color3.Black()}
//                     />
//                   </Model>
//                 </Suspense>

//               <ground
//                 name="ground1"
//                 width={50}
//                 height={50}
//                 subdivisions={0}
//                 receiveShadows={true}
//               >
//                 <physicsImpostor
//                   type={PhysicsImpostor.BoxImpostor}
//                   _options={{ mass: 0, restitution: 0.9 }}
//                 />
//               </ground>
//             </Scene>


//       </Engine>
//     // </div>
//   )

// }

// export default NewScene;

// export default (loaded_model: any) => (

//   // <div>
//     <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="new_canva" engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined} loadedModel={loaded_model}/>
//   // </div>
// );
    
// export default <SceneComponent antialias onSceneReady onRender id="new_canva" engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined} onLoading={undefined}/>;

