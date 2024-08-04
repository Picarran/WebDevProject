import * as axios from "axios";
import { useNavigate } from "react-router-dom";

const client = axios.default;

const base = "http://127.0.0.1:7001";

// export async function getTitle(){
//     const result = await client.get(base);
//     return result.data;
// }

export async function logIn(username, password) {
  try {
    const result = await client.post(base + "/user/logIn", {
      username,
      password,
    });
    console.log(result.data);
    return result.data.success;
  } catch (e) {
    alert("登录失败:用户名或密码不能为空");
  }
}
