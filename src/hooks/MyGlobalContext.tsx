import { createContext, useContext } from "react"
import * as BABYLON from "@babylonjs/core";

export interface CurrentModelContextType {
  modelArr: BABYLON.AbstractMesh[] | null
}

export const CurrentModelContext = createContext<CurrentModelContextType | null>(null);
