import { float } from '@babylonjs/core';
import * as CANNON from 'cannon-es'


export class ObjectChild {
    id: number;
    name: string;
    mesh: THREE.Object3D;
    body?: CANNON.Body;
    mass: float;

    constructor(id: number, name: string, mesh: THREE.Object3D, mass: float, body?: CANNON.Body, ) {
        this.id = id;
        this.name = name;
        this.mass = mass;
        this.mesh = mesh;
        this.body = body;
    }

    public display() {
        console.log("Id:", this.id, "Name:", this.name, "Mesh:", 
                    this.mesh, "Body:", this.body, "Mass:", this.mass)
    }
}