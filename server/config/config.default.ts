import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path');

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590632985796_648';

  // add your egg config in here
  config.middleware = ['handleError'];

  // 文件上传位置
  config.uploadDir = path.resolve(__dirname, '../app/public/upload');

  config.security = {
    csrf: {
      enable: false,
    }
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // ejs配置
  config.view = {
    mapping: {
      '.html': 'ejs'
    }
  };

  // mongoose 配置
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/chat',
      options: {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    }
  };

  // 文件配置
  config.multipart = {
    mode: 'file',
    fileExtensions: ['.pdf'],
    fileSize: 1024 * 1024 * 1024,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
