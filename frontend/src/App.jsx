import { useState } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import HeadNav from "./components/HeadNav";
import "./App.css";
import * as util_requests from "./request/util.request";
import * as ws from "./request/client.websocket";

function App() {


  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HeadNav />
        <div className="w-full flex-1 flex flex-row justify-between">
          <div className="w-1/4 bg-red-100 p-3 ">
            <Nav />
          </div>

          <div className="w-3/4 bg-red-200 p-4 ">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
