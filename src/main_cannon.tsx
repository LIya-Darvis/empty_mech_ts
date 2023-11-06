// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

import "./styles.css";


// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { GUI } from '../node_modules/dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
import * as CANNON from 'cannon-es'
import CannonUtils from 'cannon-utils/src/cannon-utils'
import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";
// import CannonDebugRenderer from '../node_modules/cannon-es-debugger/dist/cannon-es-debugger'
import { ObjectChild } from "./components/ObjectChild";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import * as BABYLON from '@babylonjs/core'


// let pageRoot: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
(document.getElementById('root') as HTMLDivElement).innerHTML = ''

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light1 = new THREE.SpotLight(0xffffff, 100)
light1.position.set(2.5, 5, 5)
light1.angle = Math.PI / 4
light1.penumbra = 0.5
light1.castShadow = true
light1.shadow.mapSize.width = 1024
light1.shadow.mapSize.height = 1024
light1.shadow.camera.near = 0.5
light1.shadow.camera.far = 20
scene.add(light1)

const light2 = new THREE.SpotLight(0xffffff, 100)
light2.position.set(-2.5, 5, 5)
light2.angle = Math.PI / 4
light2.penumbra = 0.5
light2.castShadow = true
light2.shadow.mapSize.width = 1024
light2.shadow.mapSize.height = 1024
light2.shadow.camera.near = 0.5
light2.shadow.camera.far = 20
scene.add(light2)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 2, 4)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth - 35 , window.innerHeight - 35)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.y = 0.5

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)
world.broadphase = new CANNON.NaiveBroadphase()
;(world.solver as CANNON.GSSolver).iterations = 10
world.allowSleep = true

// материалы
const normalMaterial = new THREE.MeshNormalMaterial()
const phongMaterial = new THREE.MeshPhongMaterial()

const groundPhysMat = new CANNON.Material()
const objectPhysMat = new CANNON.Material()


// const newMaterial = new THREE.MeshStandardMaterial({
//     color: 0x53f7d1,
//     roughness: 0.54,
//     flatShading: true
// })


const sphereGeometry = new THREE.SphereGeometry(0.6)
const sphereMesh = new THREE.Mesh(sphereGeometry, normalMaterial)
sphereMesh.position.x = -1
sphereMesh.position.y = 7
sphereMesh.castShadow = true
scene.add(sphereMesh)
const sphereShape = new CANNON.Sphere(0.6)
const sphereBody = new CANNON.Body({ 
    mass: 5, 
    material: objectPhysMat
})
sphereBody.addShape(sphereShape)
sphereBody.position.x = sphereMesh.position.x
sphereBody.position.y = sphereMesh.position.y
sphereBody.position.z = sphereMesh.position.z
world.addBody(sphereBody)


const torusKnotGeometry = new THREE.TorusKnotGeometry()
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, normalMaterial)
torusKnotMesh.position.x = 2
torusKnotMesh.position.y = 3
torusKnotMesh.castShadow = true
scene.add(torusKnotMesh)
let tor_position = (torusKnotMesh.geometry.attributes.position as THREE.BufferAttribute).array
const torusKnotPoints: CANNON.Vec3[] = []
for (let i = 0; i < tor_position.length; i += 3) {
    torusKnotPoints.push(new CANNON.Vec3(tor_position[i], tor_position[i + 1], tor_position[i + 2]));
}
const torusKnotFaces: number[][] = []
for (let i = 0; i < tor_position.length / 3; i += 3) {
    torusKnotFaces.push([i, i + 1, i + 2])
}
const torusKnotShape = new CANNON.ConvexPolyhedron({vertices: torusKnotPoints, faces: torusKnotFaces})
// const torusKnotShape = CreateTrimesh(torusKnotMesh.geometry)
const torusKnotBody = new CANNON.Body({ 
    mass: 5, 
    material: objectPhysMat
})
torusKnotBody.addShape(torusKnotShape)
torusKnotBody.position.x = torusKnotMesh.position.x
torusKnotBody.position.y = torusKnotMesh.position.y
torusKnotBody.position.z = torusKnotMesh.position.z
world.addBody(torusKnotBody)

function CreateTrimesh(geometry: THREE.BufferGeometry) {
    const vertices = (geometry.attributes.position as THREE.BufferAttribute).array
    const indices = Object.keys(vertices).map(Number)
    return new CANNON.Trimesh(vertices as unknown as number[], indices)
}

// const objChild = new ObjectChild(1,"534v5t");
// console.log(objChild);

let loadedObjectChildren: ObjectChild[] = []



let loadedMesh: THREE.Object3D
let loadedBody: CANNON.Body
let modelLoaded = false
const objLoader = new OBJLoader()
objLoader.load(
    '../src/assets/composite_cube_center_surface_mass.obj',
    (object) => {
        // scene.add(object)

        console.log(object.children.length)

        for (let i = 0; i < object.children.length; i++) {
            console.log("счетчик: ", i)
            console.log("имя детали: " + object.children[i].name)

            loadedMesh = object.children[i];
            (loadedMesh as THREE.Mesh).material = normalMaterial
            loadedMesh.position.x = 0
            loadedMesh.position.y = 15

            const modelShape = CreateTrimesh(
                (loadedMesh as THREE.Mesh).geometry
            )

            loadedBody = new CANNON.Body({ 
                mass: 15,
                material: objectPhysMat
             })
            loadedBody.addShape(modelShape)
            loadedBody.position.x = loadedMesh.position.x
            loadedBody.position.y = loadedMesh.position.y
            loadedBody.position.z = loadedMesh.position.z

            let newChild = new ObjectChild(object.children[i].id, object.children[i].name, 
                                            loadedMesh, loadedBody);
            loadedObjectChildren.push(newChild)
            console.log("Мешшшш: ", loadedObjectChildren[i].mesh)
            
            // нада
            // scene.add(loadedObjectChildren[loadingCount].mesh)
            // world.addBody(loadedObjectChildren[i].body)

            console.log("почему ты вышел из цикла")
        }

        console.log("Оп ОП оП новый цикл")

        for (let i = 0; i < loadedObjectChildren.length; i++) {
            console.log("НАЧИНАЕМ   ВЕСЕЛЬЕ !    !")
            loadedObjectChildren[i].display()
            scene.add(loadedObjectChildren[i].mesh)
            world.addBody(loadedObjectChildren[i].body)
        }

        /* 
        есть ли в этом какой то смысл, особенно если в данной случае я просто пытаюсь 
        изобрести велосипед

        а судьи кто за древностию лет
        к свободной жизни их вражда непримерима
        сужденья черпают из забытых газет
        времен очаковских и покоренья крыма
        всегда готовые к журьбе 
        поют всю песню одну и ту же
        не замечая о себе
        что старее то хуже
        где укажите нам отечества отцы
        которых мы должны принять за образцы
        */

        modelLoaded = true
        console.log(modelLoaded + "- - - - -")
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded!!')
    },
    (error) => {
        console.log('An error happened')
    }
)



const planeGeometry = new THREE.PlaneGeometry(25, 25)
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial)
planeMesh.rotateX(-Math.PI / 2)
planeMesh.receiveShadow = true
scene.add(planeMesh)
const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body({ 
    mass: 0,
    material: groundPhysMat 
})
planeBody.addShape(planeShape)
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(planeBody)

const groundObjectContactMat = new CANNON.ContactMaterial(
    groundPhysMat, 
    objectPhysMat,
    {friction: 0.8,
    restitution: 0.08}
);
world.addContactMaterial(groundObjectContactMat)



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const physicsFolder = gui.addFolder('Physics')
physicsFolder.add(world.gravity, 'x', -10.0, 10.0, 0.1)
physicsFolder.add(world.gravity, 'y', -10.0, 10.0, 0.1)
physicsFolder.add(world.gravity, 'z', -10.0, 10.0, 0.1)
physicsFolder.open()

// scene.traverse(object =>{
//     if (object instanceof THREE.Mesh) {
//         console.log(object.name)
//     }
// })

const clock = new THREE.Clock()
let delta

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    // delta = clock.getDelta()
    delta = Math.min(clock.getDelta(), 0.1)
    world.step(delta)

    sphereMesh.position.set(
        sphereBody.position.x,
        sphereBody.position.y,
        sphereBody.position.z
    )
    sphereMesh.quaternion.set(
        sphereBody.quaternion.x,
        sphereBody.quaternion.y,
        sphereBody.quaternion.z,
        sphereBody.quaternion.w
    )

    torusKnotMesh.position.set(
        torusKnotBody.position.x,
        torusKnotBody.position.y,
        torusKnotBody.position.z
    )
    torusKnotMesh.quaternion.set(
        torusKnotBody.quaternion.x,
        torusKnotBody.quaternion.y,
        torusKnotBody.quaternion.z,
        torusKnotBody.quaternion.w
    )

    // console.log("а точно загружено?? ", modelLoaded)
    if (modelLoaded) {
        
        for (let i = 0; i < loadedObjectChildren.length; i++) {
            loadedObjectChildren[i].mesh.position.set(
                loadedObjectChildren[i].body.position.x,
                loadedObjectChildren[i].body.position.y,
                loadedObjectChildren[i].body.position.z
            )
            loadedObjectChildren[i].mesh.quaternion.set(
                loadedObjectChildren[i].body.quaternion.x,
                loadedObjectChildren[i].body.quaternion.y,
                loadedObjectChildren[i].body.quaternion.z,
                loadedObjectChildren[i].body.quaternion.w

            )
        }

    }


    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()