import BaseService from './baseService'

export default class OrderService extends BaseService {
  constructor(ctx) {
    super(ctx, "Order")
  }

  public async create(trade_no: string) {
    const {ctx} = this;
    const data = {
      trade_no,
      title: "iphone 11",
      price: "1200"
    }


    const result = await super.create(data);

    ctx.body = {
      error_code: 0,
      data: {
        trade_no: result.trade_no
      },
      message: "OK"
    }
  }


  // 根据订单号获取订单
  public async getByTradeNo(trade_no: string) {
    // const {ctx} = this;
    return (await this.search({trade_no}))[0]
  }

  // public async update(id: string, data: any) {
  //   super
  // }

}
