// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
// import { ICard, IPage } from "./types/types";
// import PageList from "./components/PageList";

import "./App.css";
import NewScenePage from "./pages/NewScenePage";

// (alias) function App()
function App() {


  console.log("--dfv--df")

  // const mainPages: IPage[] = [
  //   {id: 1, title: "Create new simulation test", access: true},
  //   {id: 2, title: "Load simulation test", access: false},
  //   {id: 3, title: "Settings", access: true},
  // ]


/* стоит ли добавлять перевод с китайского, если я сама не особо понимаю, 
что мне накатил гуг0л переводчик?
пока не хочу
*/
  return (
      <div>
        <div className="container">
          {/* <PageList pages={mainPages}/> */}

          <NewScenePage />

        </div>
      </div>
  );
}

export default App;


