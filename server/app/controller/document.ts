import {Controller} from 'egg';

export default class DocumentController extends Controller {
  public async index() {
    const {ctx} = this;
    const [file] = ctx.request.files;
    const data = ctx.request.body;
    console.log(ctx.request.files[0]);

    try {
      ctx.body = await ctx.service.document.index(file, data);
    }catch (e) {
      console.log(e);
      ctx.body = {error_code: 1, message: '服务器错误'}
    }
  }

  public async check() {

  }
}
