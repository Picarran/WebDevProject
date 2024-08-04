import { useState } from "react";

const Project = () => {
  return (
    <>
      <div className="flex-none w-64 h-full p-3">
        <div className="bg-white rounded-xl p-4">项目</div>
      </div>
    </>
  );
};

const CreateNewProject = ({ onClick }) => {
  return (
    <>
      <div className="flex-none w-64 h-full p-3">
        <button className="bg-white rounded-xl p-4" onClick={onClick}>
          {" "}
          新增项目
        </button>
      </div>
    </>
  );
};



const Main = () => {
  const [projects, setProjects] = useState([<Project key={0} />]);
  const addProject = () => {
    setProjects([...projects, <Project key={projects.length} />]);
  };

  return (
    <>
      <div className="h-full flex flex-row  space-x-3 overflow-x-auto">
        {projects}
        <CreateNewProject onClick={addProject} />
      </div>
    </>
  );
};
export default Main;

