import {Subscription} from 'egg';

export default class TraverseActivity extends Subscription {
  static get schedule() {
    return {
      interval: '1s',
      type: 'all'
    }
  }

  async subscribe() {
    const {ctx} = this;

    // console.log('定时任务执行', parseInt(String(Date.now() / 1000)));

    await ctx.service.activity.test();

  }
}
