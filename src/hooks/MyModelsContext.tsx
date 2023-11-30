import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

// export type ContextValue = {
//     model: any
// };

export interface Returns {
    value: any
    updateValue: (value: any) => void
}

/** defines the default value if none provided */
export const initialValue: any = {
    model: "start_value"
};

export const MyContext = createContext<any>({
    value: initialValue,
    updateValue: (value: any) => {
        return console.warn('DefaultContextCallback', value);
    }
});

export const useMyContext = () => useContext(MyContext);
