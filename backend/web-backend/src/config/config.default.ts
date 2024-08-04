import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721529780568_9038',
  koa: {
    port: 7001,
  },
  webSocket: {
  },
  cors: {
    origin: '*',
  },
} as MidwayConfig;
