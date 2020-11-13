import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/utils/sendEmail', controller.utils.sendEmail);
  router.post('/user/register', controller.user.create);
  router.post('/user/login', controller.user.login);
  router.put('/user/update/:id', controller.user.update);
  router.get('/user/get/:id', controller.user.get);
  router.post('/document/create', controller.document.index);
  router.get('/common/utils', controller.common.index);
  router.post('/activity/create', controller.activity.create);
  router.get('/activity/list', controller.activity.list);
  router.get('/activity/get/:id', controller.activity.get);
  router.get('/test', controller.activity.create);
  router.get('/goodDetail', controller.good.show);
  router.get('/alipay/test/:id', controller.alipay.test);
  router.get('/alipay/pay', controller.alipay.pay);
  router.get('/alipay/callback', controller.alipay.callback);
  router.post('/alipay/asyncResult', controller.alipay.asyncResult);
  router.post('/order/create', controller.order.create);
  router.post('/order/cancel/:trade_no', controller.order.cancel);
};
