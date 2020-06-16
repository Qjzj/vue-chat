import {Controller} from 'egg'

export default class UserController extends Controller{
  public async create() {
    const {ctx} = this;
    const {code, ...data} = ctx.request.body;

    const localCode = ctx.session.emailCode;

    console.log('localCode', localCode);
    console.log('code', code);
    if(code !== localCode) return ctx.body = {error_code: 1, message: '验证码错误'};

    // 注册用户
    try {
      await ctx.service.user.register(data)
      return ctx.body = {error_code: 0, message: '注册成功'};
    }catch (e) {
      console.log('注册失败', e);
      return ctx.body = {error_code: 1, message: '服务器错误'};
    }

  }

  /**
   * 获取用户信息
   */
  public async get() {
    const {ctx} = this;
    const {id} = ctx.params;

    let result;
    try {
      result = await ctx.service.user.getById(id);
    }catch (e) {
      result = {
        error_code: 1,
        message: 'Internal Server Error'
      }
    }

    ctx.body = result;

  }

  /**
   * 登录
   */
  public async login() {
    const ctx = this.ctx;
    const {user, password} = ctx.request.body;
    let phone: string = '';
    let email: string = '';
    console.log(user, password);
    const phoneRegx = /^1\d{10}/;
    if(phoneRegx.test(user)) {
      phone = user;
    }else {
      email = user;
    }

    try {
      let result = await ctx.service.user.login({phone, email, password});
      ctx.body = result;
    }catch (e) {
      console.log(e);
      ctx.body = {error_code: 1, message: '服务器错误'};
    }
  }

  /**
   * 更新用户信息
   */
  public async update() {
    const {ctx} = this;
    const user = ctx.request.body;
    const {id} = ctx.params;
    try {
      let result = await ctx.service.user.updateUser(id, user);
      ctx.body = result;
    }catch (e) {
      console.log('更新出错', e);
      ctx.body = {error: 1, message: '服务器错误'};
    }
  }
}
