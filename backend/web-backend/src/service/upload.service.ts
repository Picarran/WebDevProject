import { Provide } from '@midwayjs/core';
import { join } from 'path';
// import { tmpdir } from 'os';
import { promises as fs, createWriteStream } from 'fs';
import { ProjectService } from './project.service';
import config from '../config/config.default';

let datafilepath = './data';

@Provide()
export class UploadService {
  projectService = new ProjectService();

  async saveFile(file) {
    const savePath = join(datafilepath, file.filename);

    // 创建写入流
    const writeStream = createWriteStream(savePath);

    // 监听错误事件
    writeStream.on('error', err => {
      console.error('写入文件时出错:', err);
    });

    // 将文件数据写入流
    writeStream.write(file.data);

    // 结束写入流
    writeStream.end();
    return file.filename;
  }

  async uploadTaskFile(file, projectId, taskId) {
    const filename = await this.saveFile(file);
    let projects = await this.projectService.readProject();
    console.log(filename);
    console.log(projects[projectId].tasklist[taskId]);

    projects[projectId].tasklist[taskId].files.push(filename);
    console.log(projects[projectId].tasklist[taskId]);
    await this.projectService.rewriteProject(projects);
  }

  async downloadTaskFile(filename, get = '') {
    console.log(config.upload.whitelist); // 输出 ['.png', '.docx', '.pdf', '.txt']
    const filePath = get ? get : join(datafilepath, filename);
    const file = await fs.readFile(filePath);
    return file;
  }
}
