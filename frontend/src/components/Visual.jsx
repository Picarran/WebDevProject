import React, { useState, useEffect } from "react";
import * as util_requests from "../request/util.request";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Visual = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const loadAllProjects = async () => {
    let projects = await util_requests.fetchProjects();
    console.log(projects);
    setProjects(
      projects.map((project, i) => ({
        id: i,
        name: project.projectName,
        tasklist: project.tasklist,
      }))
    );
  };

  const loadAllTasks = async () => {
    const projects = await util_requests.fetchProjects();
    let tasks1 = [];
    projects.forEach((project) => {
      project.tasklist.forEach((task) => {
        tasks1.push({
          projectId: task.projectId,
          title: task.title,
          beginTime: task.beginTime,
          endTime: task.endTime,
        });
      });
    });
    setTasks(tasks1);
  };

  const renderTasksForDate = (date, onCalendar) => {
    const tasksForDate = tasks.filter((task) => {
      const taskBeginDate = new Date(task.beginTime).toDateString();
      const taskEndDate = new Date(task.endTime).toDateString();
      const targetDate = date.toDateString();
      return taskBeginDate === targetDate || taskEndDate === targetDate;
    });

    return tasksForDate.map((task, index) => {
      const taskBeginDate = new Date(task.beginTime).toDateString();
      const taskEndDate = new Date(task.endTime).toDateString();
      const targetDate = date.toDateString();
      const isBeginDate = taskBeginDate === targetDate;
      const isEndDate = taskEndDate === targetDate;

      return (
        <div key={index}>
          {onCalendar ? (
            <span>
              {task.title}
              {isBeginDate}
              {isEndDate}
            </span>
          ) : (
            <div>
              <strong>项目：{projects[task.projectId].name}</strong>:{" "}
              {task.title}
              {isBeginDate && " (任务开始)"}
              {isEndDate && " (任务结束)"}
            </div>
          )}
        </div>
      );
    });
  };
  useEffect(() => {
    loadAllProjects();
    loadAllTasks();
  }, []);

  console.log(projects);
  console.log(tasks);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <h1>看板视图</h1>
      </div>
      <div className="flex flex-col items-center p-10 h-screen">
        <div className="flex flex-row w-full h-auto items-center justify-around">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) =>
              view === "month" && renderTasksForDate(date, true)
            }
          />
          <div>
            <h2>{date.toDateString()} 的任务</h2>
            {renderTasksForDate(date, false)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Visual;
