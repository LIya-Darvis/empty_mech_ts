import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import * as BABYLON from "@babylonjs/core";

export type ContextSceneValue = {
    this_scene: any,
    this_engine: any
};

export interface Returns {
    context_scene: ContextSceneValue
    updateScene: (newScene: ContextSceneValue) => void
}

export const initialScene: ContextSceneValue = {
    this_scene: "default_scene_name",
    this_engine: "default_engine_name"
};

export const SceneContext = createContext<Returns>({
    context_scene: initialScene,
    updateScene: (newScene: any) => {
        return console.warn('DefaultContextCallback', newScene);
    }
});

export const useSceneContext = () => useContext(SceneContext);