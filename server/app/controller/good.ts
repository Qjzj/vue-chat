import {Controller} from 'egg'

export default class GoodController extends Controller {
  public async show() {
    const {ctx} = this;
    await ctx.render('goodDetail.html')
  }
}
