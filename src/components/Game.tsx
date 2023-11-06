import * as BABYLON from '@babylonjs/core';


export class Game
{
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera | undefined;

    constructor(canvasElement: string)
    {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = this.createScene();
    }

    private createScene(): BABYLON.Scene
    {
        // Create a basic BJS Scene object.
        let scene = new BABYLON.Scene(this._engine);

        scene.clearColor = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);

        // Create a FreeCamera, and set its position to (x:0, y:0, z:-10).
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 6, -10), scene);

        // Target the camera to scene origin.
        this._camera.setTarget(BABYLON.Vector3.Zero());

        let box = BABYLON.Mesh.CreateBox("box", 4.0, scene);

        // Attach the camera to the canvas.
        this._camera.attachControl(this._canvas, false);

        return scene;
    }

    public doRender(): void
    {
        // Run the render loop.
        this._engine.runRenderLoop(() =>
        {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () =>
        {
            this._engine.resize();
        });
    }
}