import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  }
};

export default plugin;
