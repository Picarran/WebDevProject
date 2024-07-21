import { useState } from "react";
import LogInForm from "./components/LoginForm";
import Nav from "./components/nav";
import Main from "./components/main";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="flex flex-col h-screen w-screen">
        <LogInForm />
        <div class="w-full flex-1 flex flex-row justify-between">
          <div class="w-1/4 bg-red-100 p-3 ">
            <Nav />
          </div>

          <div class="w-3/4 bg-red-200 p-4 ">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
