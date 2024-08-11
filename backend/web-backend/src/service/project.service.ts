import { Provide } from '@midwayjs/core';
import { Project } from '../dto/project.dto';
import { promises as fs } from 'fs';

let datafilepath = 'data/data.json';

@Provide()
export class ProjectService {
  public async readProject(): Promise<Project[]> {
    try {
      const projects = await fs.readFile(datafilepath, 'utf8');
      return projects.trim() ? JSON.parse(projects) : [];
    } catch (err) {
      console.log(err);
    }
  }

  async rewriteProject(projects: Project[]) {
    try {
      await fs.writeFile(datafilepath, JSON.stringify(projects));
    } catch (err) {
      console.log(err);
    }
  }

  async writeProject(project: Project) {
    let projects = await this.readProject();

    projects.push(project);
    this.rewriteProject(projects);
  }

  async deleteProject(projectIndex: number) {
    let projects = await this.readProject();
    console.log(projectIndex);
    projects = projects.filter((_, i) => i !== projectIndex);
    console.log(projects);
    this.rewriteProject(projects);
  }

  async renameProject(projectIndex: number, newName: string) {
    let projects = await this.readProject();
    projects[projectIndex].projectName = newName;
    this.rewriteProject(projects);
  }
}
