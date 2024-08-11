import { Controller, Inject, Post, Body, Get } from '@midwayjs/core';
import { ProjectService } from '../service/project.service';
import { Project } from '../dto/project.dto';

@Controller('/project')
export class ProjectController {
  @Inject()
  projectService: ProjectService;

  @Post('/write')
  public async writeProject(@Body() project: Project) {
    await this.projectService.writeProject(project);
  }

  @Get('/read')
  public async readProject(): Promise<Project[]> {
    return await this.projectService.readProject();
  }

  @Post('/delete')
  public async deleteProject(@Body() projectMessage) {
    await this.projectService.deleteProject(projectMessage.index);
  }

  @Post('/rename')
  public async renameProject(@Body() projectMessage) {
    await this.projectService.renameProject(
      projectMessage.index,
      projectMessage.newName
    );
  }
}
