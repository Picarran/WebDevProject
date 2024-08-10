import * as axios from "axios";

const client = axios.default;

const base = "http://127.0.0.1:7001";

// export async function signUp(username, password) {
//   try {
//     const result = await client.post(base + "/user/signUp", {
//       username,
//       password,
//     });
//   } catch (e) {
//     alert("注册失败:用户名或密码不能为空");
//   }
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

export async function writeProject(projectName) {
  await client.post(base + "/project/write", {
    projectName,
  });
}

export async function fetchProjects(index = -1) {
  try {
    const result = await client.get(base + "/project/read");
    console.log(result.data);
    if (index !== -1) {
      return result.data[index];
    }
    return result.data;
  } catch (e) {
    console.log(e);
    alert("读取项目失败");
  }
}

export async function deleteProject(index) {
  try {
    console.log(index);
    await client.post(base + "/project/delete", { index });
  } catch (e) {
    console.log(e);
    alert("删除项目失败");
  }
}

export async function renameProject(index, newName) {
  try {
    console.log(index, newName);
    await client.post(base + "/project/rename", { index, newName });
  } catch (e) {
    console.log(e);
    alert("重命名项目失败");
  }
}
