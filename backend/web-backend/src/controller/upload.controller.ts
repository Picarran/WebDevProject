import { Controller, Post, Fields, Inject, File, Body } from '@midwayjs/core';
import { UploadService } from '../service/upload.service';

@Controller('/file')
export class UploadController {
  @Inject()
  uploadService: UploadService;

  @Post('/upload')
  async upload(@File() file, @Fields() fields) {
    const { projectId, taskId } = fields;
    console.log(file);
    console.log(projectId);
    console.log(taskId);
    await this.uploadService.uploadTaskFile(file, projectId, taskId);
    return { message: 'Files uploaded successfully' };
  }

  @Post('/download')
  async download(@Body() fileMessage) {
    const filename = fileMessage.filename;
    const fileUrl = fileMessage.fileUrl;
    console.log(filename);
    console.log(fileUrl);
    
    const file = await this.uploadService.downloadTaskFile(filename, fileUrl);
    return file;
  }
}
