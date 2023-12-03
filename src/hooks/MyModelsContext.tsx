import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export type ContextValue = {
    value: any
};

export interface Returns {
    mesh_arr: ContextValue
    updateMeshArr: (newValue: ContextValue) => void
}

export const initialValue: ContextValue = {
    value: "start_value"
};

export const MyContext = createContext<Returns>({
    mesh_arr: initialValue,
    updateMeshArr: (newValue: any) => {
        return console.warn('DefaultContextCallback', newValue);
    }
});

export const useModelContext = () => useContext(MyContext);
