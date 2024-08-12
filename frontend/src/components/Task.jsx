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
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const Model = ({ show, title, submit, projectId, showDetail, task }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    if (!show) return null;
    if (!showDetail)
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
    return (
      <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-xl w-96 h-auto flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <div>{title}</div>
              <button onClick={() => setShowModel(false)}>x</button>
            </div>
            <div className="mt-4">
              <div>任务名称：{task.title}</div>
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
          </div>
        </div>
      </>
    );
  };

  const addTask = () => {
    setShowDetail(false);
    setModalTitle("新增任务");
    setSubmitHandler(() => handleAdd);
    setShowModel(true);
  };

  const showTaskDetail = (task) => {
    console.log(task);
    setShowDetail(true);
    setModalTitle("任务详情");
    setSubmitHandler(() => handleDetail);
    setSelectedTask(task);
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

  const handleDetail = () => {
    console.log("detail");
    setShowModel(false);
  };

  const TaskComponent = ({ task }) => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <h3>{task.title}</h3>
          <button>c</button>
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
  if (!tasklist) {
    return (
      <div>
        <div>暂无任务</div>
        {newTask()}
        <Model
          show={showModel}
          showDetail={showDetail}
          title={modalTitle}
          submit={submitHandler}
          projectId={projectId}
          task={selectedTask}
        />
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
      <div>
        {newTask()}
        <Model
          show={showModel}
          showDetail={showDetail}
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
