import AlipaySDK from "alipay-sdk";

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
