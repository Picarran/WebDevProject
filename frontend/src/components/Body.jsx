import { useEffect, useState } from "react";
import React from "react";
import * as util_requests from "../request/util.request";
import Tasks from "./Task";

const Body = () => {
  const [projects, setProjects] = useState([]);
  const Project = ({ index, name, tasklist }) => {
    return (
      <>
        <div className="flex-none w-64 h-full p-3">
          <div className="bg-white rounded-xl p-4">
            <div className="flex flex-row justify-between items-center">
              <div className="text-2xl overflow-x-auto">
                <div>项目{index + 1}:</div>
                <div>{name}</div>
              </div>
              <div className="items-right">
                <div className="flex flex-col space-y-1">
                  <button
                    className="bg-red-100 p-2"
                    onClick={() => renameProject(index)}
                  >
                    <div>修改</div>
                  </button>
                  <button
                    className="bg-red-100 p-2"
                    onClick={() => removeProject(index)}
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-3 border-t-2 border-gray-300" />
            <div>
              <Tasks projectId={index} tasklist={tasklist} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const Projects = () => {
    return (
      <>
        {projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            name={project.name}
            tasklist={project.tasklist}
          />
        ))}
      </>
    );
  };

  const CreateNewProject = () => {
    return (
      <>
        <div className="flex-none w-64 h-full p-3">
          <button className="bg-white rounded-xl p-4" onClick={addProject}>
            新增项目
          </button>
        </div>
      </>
    );
  };

  const [showModel, setShowModel] = useState(false);
  const [modalTitle, setModalTitle] = useState("创建项目");
  const [submitHandler, setSubmitHandler] = useState(() => () => {});
  let renameProjectIndex = -1;

  const Model = ({ show, title, submit }) => {
    const [projectName, setProjectName] = useState("");

    if (!show) return null;
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-xl w-96 h-48 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <div>{title}</div>
            <button onClick={() => setShowModel(false)}>x</button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="项目名称"
              className="w-full p-2 rounded-xl"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-xl w-full"
              onClick={() => submit(projectName)}
            >
              确定
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleAddProject = async (projectName) => {
    console.log("submit");
    try {
      await util_requests.writeProject(projectName);
      setShowModel(false);
      let newProject = await util_requests.fetchProjects(projects.length);
      console.log(newProject);

      setProjects((prevProjects) => [
        ...prevProjects,
        { id: projects.length, name: newProject.projectName, tasklist: [] },
      ]);
    } catch (e) {
      alert("写入项目失败:项目名不能为空");
      console.log(e);
    }
  };

  const handleRenameProject = async (newName) => {
    await util_requests.renameProject(renameProjectIndex, newName);
    setProjects((prevProjects) => {
      const newProjects = prevProjects.map((project, i) => {
        if (i === renameProjectIndex) {
          return { id: i, name: newName, tasklist: project.tasklist };
        }
        return project;
      });
      return newProjects;
    });
  };

  const addProject = async () => {
    await loadAllProjects();
    setModalTitle("创建项目");
    setSubmitHandler(() => handleAddProject);
    setShowModel(true);
  };

  const renameProject = (index) => {
    setModalTitle("重命名项目");
    setSubmitHandler(() => handleRenameProject);
    renameProjectIndex = index;
    setShowModel(true);
  };

  const removeProject = async (index) => {
    setProjects((prevProjects) => {
      const newProjects = prevProjects.filter((_, i) => i !== index);
      return newProjects.map((project, i) => ({
        id: i,
        name: project.name,
        tasklist: project.tasklist,
      }));
    });
    await util_requests.deleteProject(index);
    await util_requests.updateProjectId();
    await loadAllProjects();
  };

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

  useEffect(() => {
    loadAllProjects();
  }, []);
  return (
    <>
      <div className="h-full flex flex-row  space-x-3 overflow-x-auto">
        <Projects />
        <CreateNewProject />
        <Model show={showModel} title={modalTitle} submit={submitHandler} />
      </div>
    </>
  );
};
export default Body;
