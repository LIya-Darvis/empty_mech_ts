import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export type ContextValue = {
    value: any
};

export interface Returns {
    value: ContextValue
    updateValue: (newValue: ContextValue) => void
}

/** defines the default value if none provided */
export const initialValue: ContextValue = {
    value: "staaaaaart"
};

export const MyContext = createContext<Returns>({
    value: initialValue,
    updateValue: (newValue: any) => {
        return console.warn('DefaultContextCallback', newValue);
    }
});

export const useMyContext = () => useContext(MyContext);
