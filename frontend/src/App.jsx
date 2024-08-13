import { useState } from "react";
import Body from "./components/Body";
import Visual from "./components/Visual";
import "./App.css";

function App() {
  const [leftNav, setleftNav] = useState(1); // 0:看板视图 1:设置看板

  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-red-100">
        <div className="flex flex-row justify-between">
          <button className="bg-red-100" onClick={() => setleftNav(0)}>
            <div className="text-2xl p-1 bg-red-150">敏捷看板</div>
          </button>
          <button
            className="bg-red-100"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="text-xl p-1 ">注销</div>
          </button>
        </div>
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
