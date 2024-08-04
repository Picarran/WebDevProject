import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
class Task {
  id: number;
  title: string;
  description: string;
}

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

    return [
      {
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Task 2 description',
      },
    ];
  }
}
