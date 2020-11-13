import {Controller} from 'egg'
import AlipaySDK from 'alipay-sdk'
import AlipayFormData from 'alipay-sdk/lib/form'
// import {formatData} from "../utils/utils";

const fs = require('fs')
const path = require('path')

const appId = "2016102300746397"

const alipaySDK = new AlipaySDK({
  appId: appId,
  privateKey: fs.readFileSync(
    path.join(__dirname, "../../config/pem/private_key.pem"),
    "ascii"
  ), // 私钥
  signType: "RSA2", // 签名类型
  alipayPublicKey: fs.readFileSync(
    path.join(__dirname, "../../config/pem/alipay_public_key.pem"),
    "ascii"
  ), // 支付宝公钥（不是应用公钥）
  gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
  timeout: 5000, // 网关超时时间
  camelcase: true // 是否把网关返回的下划线 key 转换为驼峰写法
});



export default class PayController extends Controller {
  async test() {
    const {ctx} = this;
    const {id} = ctx.params;

    const {trade_no, title, price, status} = await ctx.service.order.get(id)

    console.log('订单信息', trade_no, title, price);

    if(status !== "0") {
      throw Error('订单异常')
    }

    const formData = new AlipayFormData();
    formData.setMethod("get");
    // formData.addField('appId', appId);
    // formData.addField('charset', "utf-8");
    // formData.addField('signType', "RSA2");
    // formData.addField('timestamp', formatData("yyyy-MM-dd hh:mm:ss"));
    formData.addField('returnUrl', "http://qjz.free.vipnps.vip/alipay/callback");
    formData.addField('notifyUrl', "http://qjz.free.vipnps.vip/alipay/asyncResult");
    formData.addField('bizContent', {
      out_trade_no: trade_no,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount: price,
      body: title + "沙箱环境",
      subject: title
    });

    const result = await alipaySDK.exec("alipay.trade.page.pay", {}, {formData});

    console.log("****", result);
    if(typeof result === "string") {
      console.log("123456");
      ctx.redirect(result);
    }else {
      ctx.body = result;
    }
  }

  public async pay() {
    const {ctx} = this;

    const {trade_no} = ctx.query;

    // 查询订单
    const result = await ctx.service.order.getByTradeNo(trade_no);

    console.log("****", result);

    if(result) {
      await ctx.render("orderDetail.html", result.toJSON());
    }else {
      ctx.body = "没有订单信息"
    }


  }

  async callback() {
    const {ctx} = this;
    // const {trade_no} = ctx.query;

    console.log("进入了回调");

    // 查询订单接口
    const params = {
      sign_type: "RSA2",
      bigContent: {
        // "out_trade_no": trade_no,
      }
    }

    const result = await alipaySDK.exec("alipay.trade.query", params, {});

    ctx.body = {
      query: ctx.query,
      result: result,
      success: "OK"
    }


  }

  public async asyncResult() {
    const {ctx} = this;

    console.log('进入了异步结果回调');
    console.log('result', ctx.request.body);
    const postData = ctx.request.body;

    const result = alipaySDK.checkNotifySign(postData)

    if(result) {
      ctx.body = "success";
    }else {
      ctx.body = "failure";
    }
  }

}
