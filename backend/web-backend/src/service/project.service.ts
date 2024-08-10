import { Provide } from '@midwayjs/core';
import { Project } from '../dto/project.dto';
import { promises as fs } from 'fs';

let datafilepath = 'data/data.json';

@Provide()
export class ProjectService {
  async writeProject(project: Project) {
    let projects = await this.readProject();

    projects.push(project);
    try {
      await fs.writeFile(datafilepath, JSON.stringify(projects));
    } catch (err) {
      console.log(err);
    }
  }

  async readProject(): Promise<Project[]> {
    try {
      const projects = await fs.readFile(datafilepath, 'utf8');
      return projects.trim() ? JSON.parse(projects) : [];
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProject(projectIndex: number) {
    let projects = await this.readProject();
    console.log(projectIndex);
    projects = projects.filter((_, i) => i !== projectIndex);
    console.log(projects);
    try {
      await fs.writeFile(datafilepath, JSON.stringify(projects));
    } catch (err) {
      console.log(err);
    }
  }

  async renameProject(projectIndex: number, newName: string) {
    let projects = await this.readProject();
    projects[projectIndex].projectName = newName;
    try {
      await fs.writeFile(datafilepath, JSON.stringify(projects));
    } catch (err) {
      console.log(err);
    }
  }
}
