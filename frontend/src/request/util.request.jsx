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

// login
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

// project
export async function writeProject(projectName, tasklist = []) {
  await client.post(base + "/project/write", {
    projectName,
    tasklist,
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

// task
export async function addTask(task, projectId) {
  try {
    console.log(task, projectId);
    await client.post(base + "/task/add", { task, projectId });
  } catch (e) {
    console.log(e);
    alert("添加任务失败");
  }
}

export async function deleteTask(projectId, taskId) {
  try {
    console.log(projectId, taskId);
    await client.post(base + "/task/delete", { projectId, taskId });
  } catch (e) {
    console.log(e);
    alert("删除任务失败");
  }
}

export async function updateTask(task, projectId, taskId) {
  try {
    console.log(task, projectId, taskId);
    await client.post(base + "/task/update", { task, projectId, taskId });
  } catch (e) {
    console.log(e);
    alert("更新任务失败");
  }
}

export async function updateProjectId() {
  try {
    await client.post(base + "/task/updateProjectId");
  } catch (e) {
    console.log(e);
    alert("更新任务失败");
  }
}

export async function fetchTasks(projectId) {
  try {
    console.log(projectId);
    const project = await fetchProjects(projectId);
    return project.tasklist;
  } catch (e) {
    console.log(e);
    alert("读取任务失败");
  }
}

// file
export async function uploadFile(file, projectId, taskId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("projectId", projectId);
  formData.append("taskId", taskId);
  console.log(file, projectId, taskId);
  await client.post(base + "/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getAndDownloadFile(filename) {
  try {
    console.log(filename);
    const res = await client.post(
      base + "/file/download",
      { filename },
      {
        responseType: "json",
      }
    );
    console.log(res);

    const fileUrl = res.data;
    console.log("文件URL:", fileUrl);


    const result = await client.post(
      base + "/file/download",
      { fileUrl },
      {
        responseType: "blob",
      }
    );
    console.log(result);

    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.log(e);
    alert("下载文件失败");
  }
}
