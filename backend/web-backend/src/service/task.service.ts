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
    console.log('man');
    console.log(projects[projectId].tasklist);
    projects[projectId].tasklist = projects[projectId].tasklist.filter(
      (_, i) => i !== taskId
    );
    console.log(projects);
    console.log(projects[projectId].tasklist);
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
      project.tasklist.forEach((task,i) => {
        task.projectId = index;
        task.id = i;
      });
    });
    this.projectService.rewriteProject(projects);
  }
}
