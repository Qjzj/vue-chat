export default app => {
  const {mongoose} = app;

  const {Schema, model} = mongoose;

  const OrderSchema = new Schema({
    trade_no: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    price: {
      type: Schema.Types.String,
      required: true
    },
    status: {
      type: Schema.Types.String,
      default: 0,       // 0 待付款 1 已完成 2 已关闭
    }
  })


  return model("Order", OrderSchema)



}
