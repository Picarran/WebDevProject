import { Provide } from '@midwayjs/core';
import { Task } from '../dto/task.dto';
import { ProjectService } from './project.service';

@Provide()
export class TaskService {
  projectService = new ProjectService();

  async addTask(task: Task, projectId: number) {
    let projects = await this.projectService.readProject();
    projects[projectId].tasklist.push(task);
    this.projectService.rewriteProject(projects);
  }

  async deleteTask(projectId: number, taskId: number) {
    let projects = await this.projectService.readProject();
    projects[projectId].tasklist = projects[projectId].tasklist.filter(
      (_, i) => i !== taskId
    );
    this.projectService.rewriteProject(projects);
  }

  async updateTask(task: Task, projectId: number, taskId: number) {
    let projects = await this.projectService.readProject();
    projects[projectId].tasklist[taskId] = task;
    this.projectService.rewriteProject(projects);
  }

  async updateProjectId() {
    let projects = await this.projectService.readProject();
    projects.forEach((project, index) => {
      project.tasklist.forEach(task => {
        task.projectId = index;
      });
    });
    this.projectService.rewriteProject(projects);
  }
}
