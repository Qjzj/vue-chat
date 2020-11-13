import AlipaySDK from 'alipay-sdk'
import _AliPayForm from 'alipay-sdk/lib/form'
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

export default alipaySDK

export const AliPayForm = _AliPayForm;

