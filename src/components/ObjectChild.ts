
import * as CANNON from 'cannon-es'


export class ObjectChild {
    id: number;
    name: string;
    readonly mass: number = 3;
    mesh: THREE.Object3D;
    body: CANNON.Body;

    constructor(id: number, name: string, mesh: THREE.Object3D, body: CANNON.Body) {
        this.id = id;
        this.name = name;
        this.mesh = mesh;
        this.body = body;
    }

    public display() {
        console.log("Id:", this.id, "Name:", this.name, "Mesh:", 
                    this.mesh, "Body:", this.body)
    }
}