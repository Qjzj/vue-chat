import {Context} from 'egg'
import BaseService from './baseService'
import {RandomType} from "../utils/utils";

export default class UserServer extends BaseService {
  constructor(ctx: Context) {
    super(ctx, 'User');
  }

  public async register(data) {
    const {ctx} = this;
    // 密码加密
    const salt =  ctx.helper.getRandomString(8, RandomType.MIXIN);

    data.password = ctx.helper.stringEncrypt(data.password, salt);
    data.salt = salt;

    await this.create(data)
  }

  public async login(data: any) {
    const {ctx} = this;
    // 解析出手机号和email
    const {email, phone, password} = data;
    let encryptedPassword: string;

    let param: object = {};
    if(email) {
      param['email'] = email;
    }else {
      param ["phone"] = phone;
    }

    let result = await this.find(param);
    if(result) {
      encryptedPassword = ctx.helper.stringEncrypt(password, result.salt);
      if(encryptedPassword === result.password) {
        // TODO 生成token
        return {error_code: 0, message: 'OK', data: result}
      }else {
        return {error_code: 1, message: '密码错误'}
      }
    }else {
      return {error_code: 1, message: '此账号不存在'}
    }



  }

  public async updateUser(id: string, user: any) {
    const result = await this.update(id, user);
    console.log('result', result);
    if(result) {
      return {
        error_code: 0,
        message: 'OK'
      }
    }
    return {
      error_code: 1,
      message: '服务器错误'
    }

  }

  public async getById(id: string) {
    const result = (await this.get(id)).toJSON();
    if(result) {
      delete result.salt;
      delete result.password;

      return {
        error_code: 0,
        data: result,
        message: 'OK'
      }
    }else {
      return {
        error_code: 1,
        data: null,
        message: '用户不存在'
      }
    }

  }

}
