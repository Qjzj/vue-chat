import {Service} from 'egg'
import {RandomType} from "../utils/utils";

const nodeMailer = require('nodemailer');

const USER_EMAIL = '610241598@qq.com';
const AUTH_CODE = 'mzvcblllmuuwbfeg';
const transporter = nodeMailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: AUTH_CODE
  }
});

export default class UtilsServer extends Service {
  public async sendEmail(to: string) {
    const {ctx} = this;

    const code = ctx.helper.getRandomString(6, RandomType.NUMBER);
    // 保存code到session
    ctx.session.emailCode = code;

    let html =  `<p>您的验证码为<a href="javascript:void(0)">${code}</a>, 十分钟内有效</p>`;
    const mailOptions = {
      from: USER_EMAIL,
      to,
      subject: '验证邮件',
      html: html,
    };
    let result: any = null;
    try {
      result = await transporter.sendMail(mailOptions);
    }catch (e) {
      console.log('邮件发送失败', e);
      // result = e;
    }
    return result


  }

  public async sendPhoneCode() {
    const {ctx} = this;
    const code: string = ctx.helper.getRandomString(6, RandomType.NUMBER);
    return code;
  }
}
