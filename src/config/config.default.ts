import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { config as envInit } from 'dotenv';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  envInit();

  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1639552067420_9627';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    // 配合egg-cors使用
    // domainWhiteList: [ 'http://localhost:7003' ],
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
      ignoreJSON: true,
    },
  };
  config.multipart = {
    // mode: 'file',
    fileSize: '300mb',
    whitelist: [
      // images
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/png, image/x-png
      '.zip',
      '.scene',
      '.xscene',
      '.glb',
      'bmp',
      'svg',
      'webp',
    ],
  };
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  };

  config.taskConfig = {
    redis: { port: 6379, host: '127.0.0.1', password: '123456' },
    prefix: 'midway-task',
    defaultJobOptions: {
      repeat: {
        tz: 'Asia/Shanghai', // Task等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
      },
    },
  };

  config.jwt = {
    secret: 'INnyQ50BEE6AITQraIaDGooJ',
    redisScope: 'rbacAuth', // redis的作用域前缀
    accessTokenExpiresIn: 60 * 60 * 24 * 3, // 签名过期时间单位s
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  };

  return config;
};
