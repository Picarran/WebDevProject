import { useNavigate } from "react-router-dom";
import * as util_requests from "../request/util.request";
import { useState } from "react";

const Form = ({ type, children, onChange }) => {
  return (
    <div className="w-64">
      <div className="flex items-center justify-between h-20 space-x-10">
        <div className="flex-1">{children}</div>
        <div className="flex-none w-40">
          <input
            type={type}
            className="border border-blue-100 "
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

const LogInForm = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <Form
          type="text"
          children="用户名"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Form
          type="password"
          children="密码"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            util_requests.logIn(username, password).then((success) => {
              if (success) {
                navigate("/app");
              }
            });
          }}
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default LogInForm;
