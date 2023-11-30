// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
// import { ICard, IPage } from "./types/types";
// import PageList from "./components/PageList";

import { useState } from "react";
import "./App.css";
import ScenePage from "./pages/scenePage/ScenePage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import React from "react";
import { MyContext, initialValue } from "./hooks/MyModelsContext";

function App() {

  const [value , updateValue] = useState(initialValue);

  /* стоит ли добавлять перевод с китайского, если я сама не особо понимаю, 
  что мне накатил гуг0л переводчик?
  пока не хочу
  */
 
  return (
    // <MyContext.Provider value={{ value, updateValue }} >
      <ScenePage />
    // </MyContext.Provider>
    
  );
}

export default App;


function useThree(): { gl: any; } {
  throw new Error("Function not implemented.");
}

