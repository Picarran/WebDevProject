import React, { useState } from "react";
import * as util_requests from "../request/util.request";
export class Task {
  constructor(
    projectId,
    id,
    title,
    owner,
    beginTime,
    endTime,
    description = ""
  ) {
    this.projectId = projectId;
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.description = description;
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
                <div>附件：{task.file ? task.file : "未添加"}</div>
              </div>
              <div className="mt-4">
                <div>评论：{task.comment ? task.comment : "未添加"}</div>
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
                <div>附件：{task.file ? task.file : "未添加"}</div>
                {/* todo */}
                <button>上传附件</button>
              </div>
              <div className="mt-4">
                <div>评论：{task.comment ? task.comment : "未添加"}</div>
                {/* todo */}
                <button>添加评论</button>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white p-2 rounded-xl w-full"
                  onClick={() => submit(new Task(projectId, task.id, taskTitle, "", startDateTime, endDateTime, taskDescription), projectId)}
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
    setSubmitHandler(() => handDelete);
    setModelDisplay("delete");
    setSelectedTask(task);
    setShowModel(true);
  };

  // submit handler

  const handleAdd = async(task) => {
    console.log(task);
    if (!task.title) return alert("任务名不能为空");
    // if (!task.beginTime) return alert("开始时间不能为空");
    // if (!task.endTime) return alert("结束时间不能为空");

    try {
      await util_requests.addTask(task, projectId);
      setTasklist((prevTasklist) => [...prevTasklist, task]);
      setShowModel(false);
    } catch (e) {
      console.log(e);
      alert("添加任务失败");
    }
  };

  const handleDetail = () => {
    console.log("detail");
    setShowModel(false);
  };

  const handleEdit = async(task, projectId) => {
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
    } catch (e) {
      console.log(e);
      alert("更新任务失败");
    }

    setShowModel(false);
  };

  const handDelete = async (projectId, taskId) => {
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
    setShowModel(false);
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
