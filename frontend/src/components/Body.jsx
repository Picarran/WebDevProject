import { useEffect, useState } from "react";
import React from "react";
import * as util_requests from "../request/util.request";

const Body = () => {
  const [showModel, setShowModel] = useState(false);

  const handleSubmit = async (projectName) => {
    console.log("submit");

    await util_requests.writeProject(projectName);
    setShowModel(false);
    let newProject = await util_requests.fetchProjects(projects.length);
    console.log(newProject);

    setProjects((prevProjects) => [
      ...prevProjects,
      <Project
        key={projects.length}
        index={projects.length}
        name={newProject.projectName}
      />,
    ]);
  };

  const AddProjectModel = ({ show }) => {
    const [projectName, setProjectName] = useState("");

    if (!show) return null;
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-xl w-96 h-48 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <div>新建项目</div>
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
              onClick={() => handleSubmit(projectName)}
            >
              确定
            </button>
          </div>
        </div>
      </div>
    );
  };

  const [projects, setProjects] = useState([]);
  const Project = ({ index, name }) => {
    return (
      <>
        <div className="flex-none w-64 h-full p-3">
          <div className="bg-white rounded-xl p-4">
            <div className="flex flex-row justify-between items-center">
              <div>
                项目{index}
                {name}
              </div>
              <div className="items-right">
                <button>
                  {/* todo */}
                  {/* <img src={renameImage} />    */}c
                </button>
                <button onClick={() => removeProject(index)}>x</button>
              </div>
            </div>
          </div>
        </div>
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

  const loadAllProjects = async () => {
    let projects = await util_requests.fetchProjects();
    console.log(projects);
    setProjects(
      projects.map((project, i) => (
        <Project key={i} index={i} name={project.projectName} />
      ))
    );
  };

  const addProject = () => {
    setShowModel(true);
  };

  const removeProject = async(index) => {
    setProjects((prevProjects) => {
      const newProjects = prevProjects.filter((_, i) => i !== index);
      return newProjects.map((project, i) =>
        React.cloneElement(project, { key: i, index: i })
      );
    });
    await util_requests.deleteProject(index);
  };

  useEffect(() => {
    loadAllProjects();
  }, []);
  return (
    <>
      <div className="h-full flex flex-row  space-x-3 overflow-x-auto">
        {projects}
        <CreateNewProject />
        <AddProjectModel show={showModel} />
      </div>
    </>
  );
};
export default Body;
