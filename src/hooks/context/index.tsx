import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from "react";

type ModelId = {
  modelId: any;
  setModelId: Dispatch<SetStateAction<any>>;
};

export const Context = createContext<ModelId>({} as ModelId);

export const ModelsContext = ({ children }: { children: ReactNode }) => {
  const [modelId, setModelId] = useState("start_value");

  return (
    <Context.Provider value={{ modelId, setModelId }}>
      {children}
    </Context.Provider>
  );
};

// export const useModelsContext = () => useContext(Context);
export function useModelsContext  () {
  const context = useContext(Context);
  if (context === undefined) {
    throw Error (
      "we dont need undefined value"
    )
  }

  return context;
} 
















// export interface CurrentModelContextType {
//   modelArr: any
// }

// export const CurrentModelContext = createContext<CurrentModelContextType>({modelArr: "something"});
