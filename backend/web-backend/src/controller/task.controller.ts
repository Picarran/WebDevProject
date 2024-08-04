import { Controller, Get, Inject } from "@midwayjs/core";
import { TaskService } from "../service/task.service";


@Controller('/task')
export class TaskController {

    @Inject()
    taskService:TaskService;

    @Get('/overview')
    public async overview(): Promise<any> {
        return await this.taskService.getTaskList();
    }
}