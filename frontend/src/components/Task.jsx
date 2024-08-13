import React, { useState, useEffect } from "react";
import * as util_requests from "../request/util.request";
export class Task {
  constructor(
    projectId,
    id,
    title,
    owner,
    beginTime,
    endTime,
    description = "",
    status = "todo",
    comments = [],
    files = []
  ) {
    this.projectId = projectId;
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.description = description;
    this.status = status;
    this.comments = comments;
    this.files = files;
  }
}

const Tasks = ({ projectId, tasklist }) => {
  const [showModel, setShowModel] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增任务");
  const [submitHandler, setSubmitHandler] = useState(() => () => {});
  const [ModelDisplay, setModelDisplay] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasklst, setTasklist] = useState(tasklist ? tasklist : []);

  const Model = ({ show, title, submit, projectId, ModalDisplay, task }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    const [comments, setComments] = useState(task ? task.comments : []);
    const [commentContent, setCommentContent] = useState("");
    const [files, setFiles] = useState(task ? task.files : []);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = async () => {
      if (!selectedFile) return alert("请选择一个文件");
      if (files.includes(selectedFile.name))
        return alert("文件已存在，请勿重复上传");
      let success = true;
      try {
        await util_requests.uploadFile(selectedFile, projectId, task.id);
        console.log(selectedFile);
      } catch (e) {
        success = false;
        console.log(e);
        alert("上传文件失败，不支持的文件类型");
      }
      console.log(success);
      if (success) setFiles((prevFiles) => [...prevFiles, selectedFile.name]);
    };

    const getAndDownloadFile = async (filename) => {
      console.log(filename);
      await util_requests.getAndDownloadFile(filename);
    };

    const deleteFile = (filename) => {
      setFiles((prevFiles) => {
        return prevFiles.filter((file) => file !== filename);
      });
    };

    if (!show) return null;
    if (ModalDisplay === "add")
      return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4  w-3/4 flex flex-col justify-between max-h-[75%] overflow-y-auto">
            <div className="flex flex-row justify-between items-center">
              <div>{title}</div>
              <button onClick={() => setShowModel(false)}>x</button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="任务名称"
                className="w-full p-2 rounded-xl"
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="任务描述（可选）"
                className="w-full p-2 rounded-xl"
                onChange={(e) => {
                  setTaskDescription(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="start-datetime">选择任务开始日期和时间:</label>
              <input
                type="datetime-local"
                className="w-full p-2 rounded-xl"
                onChange={(e) => {
                  setStartDateTime(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="start-datetime">选择任务结束日期和时间:</label>
              <input
                type="datetime-local"
                className="w-full p-2 rounded-xl"
                onChange={(e) => {
                  setEndDateTime(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-xl w-full"
                onClick={() =>
                  submit(
                    new Task(
                      projectId,
                      tasklist ? tasklist.length : 0,
                      taskTitle,
                      "",
                      startDateTime,
                      endDateTime,
                      taskDescription
                    )
                  )
                }
              >
                确定
              </button>
            </div>
          </div>
        </div>
      );
    if (ModalDisplay === "detail")
      return (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4  w-3/4 flex flex-col justify-between max-h-[75%] overflow-y-auto">
              <div className="flex flex-row justify-between items-center">
                <div>{title}</div>
                <button onClick={() => setShowModel(false)}>x</button>
              </div>
              <div className="mt-4">
                <div>任务名称：{task.title}</div>
                <button>c</button>
              </div>
              <div className="mt-4">
                <div>
                  任务描述：{task.description ? task.description : "未填写"}
                </div>
              </div>
              <div className="mt-4">
                <div>开始时间：{task.beginTime}</div>
              </div>
              <div className="mt-4">
                <div>结束时间：{task.endTime}</div>
              </div>
              <div className="mt-4">
                <div>附件：</div>
                <div className="flex flex-col">
                  {files.map((filename, index) => {
                    return (
                      <div className="flex flex-row" key={index}>
                        <div>{filename}</div>
                        <button onClick={() => getAndDownloadFile(filename)}>
                          下载
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <div>评论：</div>
                <div className="flex flex-col">
                  {comments.length === 0
                    ? "未评论"
                    : comments.map((comment, index) => {
                        return <div key={index}>{comment}</div>; // todo:评论时间、人、id
                      })}
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white p-2 rounded-xl w-full"
                  onClick={submit}
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </>
      );
    if (ModalDisplay === "edit")
      return (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4  w-3/4 flex flex-col justify-between max-h-[75%] overflow-y-auto">
              <div className="flex flex-row justify-between items-center">
                <h1>{title}</h1>
                <button onClick={() => setShowModel(false)}>x</button>
              </div>
              <div className="mt-4">
                <div>任务名称：</div>
                <input
                  type="text"
                  placeholder={task.title}
                  className="w-full p-2 rounded-xl"
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <div>任务描述：</div>
                <input
                  type="text"
                  placeholder={task.description ? task.description : "未填写"}
                  className="w-full p-2 rounded-xl"
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <div>开始时间：</div>
                <input
                  type="datetime-local"
                  className="w-full p-2 rounded-xl"
                  value={startDateTime ? startDateTime : task.beginTime}
                  onChange={(e) => {
                    setStartDateTime(e.target.value);
                  }}
                ></input>
              </div>
              <div className="mt-4">
                <div>结束时间：</div>
                <input
                  type="datetime-local"
                  className="w-full p-2 rounded-xl"
                  value={endDateTime ? endDateTime : task.endTime}
                  onChange={(e) => {
                    setEndDateTime(e.target.value);
                  }}
                ></input>
              </div>
              <div className="mt-4">
                <div>附件：</div>
                <div className="flex flex-col">
                  {files.map((filename, index) => {
                    return (
                      <div className="flex flex-row" key={index}>
                        <div>{filename}</div>
                        <button onClick={() => deleteFile(filename)}>x</button>
                        <button onClick={() => getAndDownloadFile(filename)}>
                          d
                        </button>
                      </div>
                    );
                  })}
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                ></input>
                <button onClick={handleFileUpload}>上传附件</button>
              </div>
              <div className="mt-4">
                <div>评论：</div>
                <div className="flex flex-col">
                  {comments.map((comment, index) => {
                    return <div key={index}>{comment}</div>; // todo:评论时间、人、id
                  })}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder={"添加评论"}
                    className="w-full p-2 rounded-xl"
                    value={commentContent}
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!commentContent) return alert("添加评论不能为空");
                      setComments([...comments, commentContent]);
                      setCommentContent("");
                    }}
                  >
                    添加
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white p-2 rounded-xl w-full"
                  onClick={() =>
                    submit(
                      new Task(
                        projectId,
                        task.id,
                        taskTitle ? taskTitle : task.title,
                        "",
                        startDateTime,
                        endDateTime,
                        taskDescription,
                        task.status,
                        comments,
                        files
                      ),
                      projectId
                    )
                  }
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </>
      );
    if (ModalDisplay === "delete")
      return (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4  w-3/4 flex flex-col justify-between max-h-[75%] overflow-y-auto">
              <div className="flex flex-row justify-between items-center">
                <h1>{title}</h1>
                <button onClick={() => setShowModel(false)}>x</button>
              </div>
              <div className="mt-4">
                <div>任务名称：{task.title}</div>
              </div>
              <div className="mt-4 flex flex-row">
                <button
                  className="bg-blue-500 text-white p-2 rounded-xl w-full"
                  onClick={() => submit(projectId, task.id)}
                >
                  确定
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-xl w-full"
                  onClick={() => setShowModel(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </>
      );
  };

  // model control
  const addTask = () => {
    setModelDisplay("add");
    setModalTitle("新增任务");
    setSubmitHandler(() => handleAdd);
    setShowModel(true);
  };

  const showTaskDetail = (task) => {
    console.log(task);
    setModelDisplay("detail");
    setModalTitle("任务详情");
    setSubmitHandler(() => handleDetail);
    setSelectedTask(task);
    setShowModel(true);
  };

  const editTask = (task) => {
    setModalTitle("修改任务");
    setSubmitHandler(() => handleEdit);
    setSelectedTask(task);
    setModelDisplay("edit");
    setShowModel(true);
  };

  const deleteTask = (projectId, task) => {
    setModalTitle("删除任务");
    setSubmitHandler(() => handleDelete);
    setModelDisplay("delete");
    setSelectedTask(task);
    setShowModel(true);
  };

  // submit handler

  const handleAdd = async (task) => {
    console.log(task);
    if (!task.title) return alert("任务名不能为空");
    // if (!task.beginTime) return alert("开始时间不能为空");
    // if (!task.endTime) return alert("结束时间不能为空");

    try {
      await util_requests.addTask(task, projectId);
      setTasklist((prevTasklist) => [...prevTasklist, task]);
      setShowModel(false);
      await util_requests.updateProjectId();
      await loadAllTask(task.projectId);
    } catch (e) {
      console.log(e);
      alert("添加任务失败");
    }
  };

  const handleDetail = () => {
    console.log("detail");
    setShowModel(false);
  };

  const handleEdit = async (task, projectId) => {
    if (!task.title) return alert("任务名不能为空");
    // if (!task.beginTime) return alert("开始时间不能为空");
    // if (!task.endTime) return alert("结束时间不能为空");
    console.log("edit");
    try {
      await util_requests.updateTask(task, projectId, task.id);
      setTasklist((prevTasklist) => {
        return prevTasklist.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        });
      });
      await util_requests.updateProjectId();
      await loadAllTask(task.projectId);
    } catch (e) {
      console.log(e);
      alert("更新任务失败");
    }

    setShowModel(false);
  };

  const handleDelete = async (projectId, taskId) => {
    try {
      await util_requests.deleteTask(projectId, taskId);
      console.log(tasklist);
      setTasklist((prevTasklist) => {
        return prevTasklist.filter((task) => task.id !== taskId);
      });
      console.log(tasklist);
    } catch (e) {
      console.log(e);
      alert("删除任务失败");
    }
    await util_requests.updateProjectId();
    await loadAllTask(projectId);
    setShowModel(false);
  };

  const loadAllTask = async (projectId) => {
    try {
      let tasks = await util_requests.fetchTasks(projectId);
      console.log(tasks);
      setTasklist(tasks);
    } catch (e) {
      console.log(e);
      alert("读取任务失败");
    }
  };

  // component
  const TaskComponent = ({ task }) => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <h3>{task.title}</h3>
          <button onClick={() => deleteTask(projectId, task)}>x</button>
          <button onClick={() => editTask(task)}>c</button>
          <button onClick={() => showTaskDetail(task)}>d</button>
        </div>
      </>
    );
  };

  const newTask = () => {
    return (
      <>
        <button onClick={addTask}>新增任务</button>
      </>
    );
  };

  // 显示内容
  return (
    <>
      <div>
        {tasklst.map((task, index) => (
          <TaskComponent key={index} task={task} />
        ))}
      </div>
      <div>
        {newTask()}
        <Model
          show={showModel}
          ModalDisplay={ModelDisplay}
          title={modalTitle}
          submit={submitHandler}
          projectId={projectId}
          task={selectedTask}
        />
      </div>
    </>
  );
};
export default Tasks;
