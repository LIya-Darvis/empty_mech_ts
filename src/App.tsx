import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { ICard, IPage } from "./types/types";
import PageList from "./components/PageList";
import {BrowserRouter, NavLink, Route, RouterChildContext} from 'react-router-dom';
import NewScenePage from "./pages/NewScenePage";
import SettingsPage from "./pages/SettingsPage";

// (alias) function App()
function App() {

  console.log("--dfv--df")

  const mainPages: IPage[] = [
    {id: 1, title: "Create new simulation test", access: true},
    {id: 2, title: "Load simulation test", access: false},
    {id: 3, title: "Settings", access: true},
  ]


/* стоит ли добавлять перевод с китайского, если я сама не особо понимаю, 
что мне накатил гуг0л переводчик?
пока не хочу
*/
  return (
      // BasicScene(canvas)
      <div>
        {/* <h1 className="app_name">这是工作!</h1> */}

        <div className="container">
          {/* <PageList pages={mainPages}/> */}

          <NewScenePage />

        </div>

        {/* <BrowserRouter>
              <NavLink to="/new_scene">New Scene</NavLink>
              <NavLink to="/settings">Settings</NavLink>
        </BrowserRouter> */}

      </div>
    


  );

  

}

export default App;


