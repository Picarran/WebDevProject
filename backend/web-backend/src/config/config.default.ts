import { MidwayConfig } from '@midwayjs/core';
// import { join } from 'path';
// import { tmpdir } from 'os';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721529780568_9038',
  koa: {
    port: 7001,
  },
  webSocket: {},
  cors: {
    origin: '*',
  },
  upload: {
    mode: 'file', // 文件模式或流模式
    fileSize: '1000mb', // 最大文件大小
    whitelist: [
      '.png',
      '.docx',
      '.xlsx',
      '.pptx',
      '.pdf',
      '.txt',
      '.md',
      '.jpg',
      '.jpeg',
      '.gif',
      '.mp3',
      '.mp4',
      '.exe',
      '.zip',
      '.rar',
      '.csv',
      '.json',
      '.xml',
      '.html',
      '.css',
      '.js',
      '.ts',
      '.vue',
      '.jsx',
      '.tsx',
      '.py',
      '.java',
      '.c',
      '.cpp',
      '.cs',
      '.go',
      '.php',
      '.rb',
      '.sh',
      '.bat',
      '.ps1',
      '.sql',
      '.yml',
      '.yaml',
    ], // 允许上传的文件扩展名白名单
    tmpdir: './data/save', // 上传的临时存储目录
    cleanTimeout: 3 * 24 * 60 * 60 * 1000, // 临时文件清理超时时间
    base64: true, // 是否支持base64格式
    match: /\/file/, // 匹配需要上传的路由
  },
} as MidwayConfig;
