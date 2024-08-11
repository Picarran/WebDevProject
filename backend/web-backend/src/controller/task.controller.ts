import { Controller, Post, Inject, Body } from '@midwayjs/core';
import { TaskService } from '../service/task.service';

@Controller('/task')
export class TaskController {
  @Inject()
  taskService: TaskService;

  @Post('/add')
  async addTask(@Body() addTaskMessage) {
    const task = addTaskMessage.task;
    const projectId = addTaskMessage.projectId;
    await this.taskService.addTask(task, projectId);
  }

  @Post('/delete')
  async deleteTask(@Body() deleteTaskMessage) {
    const projectId = deleteTaskMessage.projectId;
    const taskId = deleteTaskMessage.taskId;
    await this.taskService.deleteTask(projectId, taskId);
  }

  @Post('/update')
  async updateTask(@Body() updateTaskMessage) {
    const task = updateTaskMessage.task;
    const projectId = updateTaskMessage.projectId;
    const taskId = updateTaskMessage.taskId;
    await this.taskService.updateTask(task, projectId, taskId);
  }
}
