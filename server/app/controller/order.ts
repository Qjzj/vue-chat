import {Controller} from 'egg'
// import AlipaySdk, {AliPayForm} from '../utils/alipay'


export default class OrderController extends Controller {
  // 创建订单
  public async create() {
    const {ctx} = this;

    const out_trade_no = Date.now().toString() + Math.random().toString().substr(2, 5);

    await ctx.service.order.create(out_trade_no);

  }

  // 取消订单
  public async cancel() {
    const {ctx} = this;
    const {trade_no} = ctx.params;
    const result = await ctx.service.order.update(trade_no, {status: 2});

    ctx.body = result;

    // TODO 支付宝取消订单

  }
}
