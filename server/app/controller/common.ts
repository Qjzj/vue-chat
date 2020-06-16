import {Controller} from 'egg'

export default class CommonController extends Controller {
  public async index() {
    const {ctx} = this;

    const query = ctx.query;

    console.log('**********', query);

    const commonMap = {
      date: String(Date.now())
    };

    let result = {};

    if(Object.keys(query).length) {
      for(const key in query) {
        if(query.hasOwnProperty(key) && commonMap.hasOwnProperty(key)) {
          result[key] = commonMap[key]
        }
      }

    }else {
      result = commonMap;
    }

    ctx.body = {
      error_code: 0,
      data: result,
      message: 'OK'
    }

  }
}
