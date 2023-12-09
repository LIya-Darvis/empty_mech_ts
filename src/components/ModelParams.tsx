export type MeshPosition = {
    x: number,
    y: number,
    z: number
}

export type ModelMesh = {
    meshId: string
    meshPosition: MeshPosition
}

export type ModelMeshArr = {
    meshArr: Array<ModelMesh>
}

export class ModelParams {

    modelMeshArr: ModelMeshArr | undefined
    finishPoint: ModelMesh | undefined

    public constructor(modelMeshArr: ModelMeshArr | undefined, finishPoint: ModelMesh | undefined) {
        this.modelMeshArr = modelMeshArr;
        this.finishPoint = finishPoint;
    }
}