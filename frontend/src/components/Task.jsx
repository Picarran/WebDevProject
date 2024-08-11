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

  const Model = ({ show, title, submit, projectId }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    if (!show) return null;
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-xl w-96 h-auto flex flex-col justify-between">
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
  };

  const addTask = () => {
    setModalTitle("新增任务");
    setSubmitHandler(() => handleAdd);
    setShowModel(true);
  };

  const handleAdd = (task) => {
    console.log(task);
    if (!task.title) return alert("任务名不能为空");
    // if (!task.beginTime) return alert("开始时间不能为空");
    // if (!task.endTime) return alert("结束时间不能为空");

    try {
      util_requests.addTask(task, projectId);
      tasklist.push(task);
      setShowModel(false);
    } catch (e) {
      console.log(e);
      alert("添加任务失败");
    }
  };

  const TaskComponent = ({ task }) => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <h3>{task.title}</h3>
          <button>f</button>
        </div>
      </>
    );
  };

  const newTask = () => {
    return (
      <>
        <button onClick={addTask}>新增任务</button>
        <Model
          show={showModel}
          title={modalTitle}
          submit={submitHandler}
          projectId={projectId}
        />
      </>
    );
  };
  // 显示内容
  if (!tasklist) {
    return (
      <div>
        <div>暂无任务</div>
        {newTask()}
      </div>
    );
  }

  return (
    <>
      <div>
        {tasklist.map((task, index) => (
          <TaskComponent key={index} task={task} />
        ))}
      </div>
      <div>{newTask()}</div>
    </>
  );
};
export default Tasks;
