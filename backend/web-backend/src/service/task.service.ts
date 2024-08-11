import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import { Task } from '../dto/task.dto';

@Provide()
export class TaskService {
  async getTaskList(): Promise<Task[]> {
    fs.readFile('file.md', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    return [];
  }
}
