import { useState } from "react";
import Body from "./components/Body";
import HeadNav from "./components/HeadNav";
import Visual from "./components/Visual";
import "./App.css";
import * as util_requests from "./request/util.request";
import * as ws from "./request/client.websocket";

function App() {
  const [leftNav, setleftNav] = useState(1); // 0:看板视图 1:设置看板

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HeadNav />
        <div className="w-full flex-1 flex flex-row justify-between">
          <div className="w-1/4 bg-red-100 p-3 ">
            <>
              <div className="p-1 flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setleftNav(0);
                  }}
                >
                  设置看板
                </button>
                <button
                  onClick={() => {
                    setleftNav(1);
                  }}
                >
                  看板视图
                </button>
              </div>
            </>
          </div>

          <div className="w-3/4 bg-red-200 p-4 ">
            {leftNav === 0 ? <Body /> : <Visual />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
