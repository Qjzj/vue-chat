import {Controller} from 'egg'

export default class UtilsController extends Controller{
  async sendEmail() {
    const {ctx} = this;
    const {email} = ctx.request.body;
    if(!email) return ctx.body = {error_code: 1, message: '邮箱不能为空'};

    let result = await ctx.service.utils.sendEmail(email);

    if(!result) return ctx.body = {error_code : 1, message : "验证码发送失败"};

    ctx.body = {error_code: 0, message: '验证码发送成功'};

  }
}
