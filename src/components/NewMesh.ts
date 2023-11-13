

export class NewMesh {
    id?: number;
    name?: string;
    mesh?: THREE.Object3D;

    constructor(id: number, name: string, mesh: THREE.Object3D) {
        this.id = id;
        this.name = name;
        this.mesh = mesh;
    }

    public display() {
        console.log("Id:", this.id, "Name:", this.name, "Mesh:", this.mesh)
    }
}
