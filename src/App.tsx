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

function App() {

  // const { gl } = useThree()

  //   React.useEffect(() => {
  //     console.log(gl.domElement) // will show me the `<canvas>` dom element.
  //   }, [])
    
  // const [newScenePage, setNewScenePage] = useState(NewScenePage);
  //   console.log(newScenePage, "<- экз новой сцены в приложении")


  /* стоит ли добавлять перевод с китайского, если я сама не особо понимаю, 
  что мне накатил гуг0л переводчик?
  пока не хочу
  */
  return (
    <ScenePage />
  );
}

export default App;


function useThree(): { gl: any; } {
  throw new Error("Function not implemented.");
}

