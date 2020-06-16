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
  router.get('/activity/get/:id', controller.activity.get)
};
