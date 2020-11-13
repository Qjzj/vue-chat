/*
 * @Author: your name
 * @Date: 2020-06-15 17:57:40
 * @LastEditTime: 2020-08-03 10:10:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat_programe:\handler\chat-demo\server\app\middleware\handleError.ts
 */
export default (options, app) => {
  return async (ctx, next) => {
    try {
      console.log('handle_error options', options);
      console.log('请求信息', ctx.req.method, ctx.req.url);

      await next();
    }catch (e) {
       console.log('错误', e)
       const status = e.status || 500;

       const message = app.config.env === 'prod' ? 'Internal Server Error' : e.message;
       console.log("message", message);

       ctx.body = {
         error_code: 1,
         code: status,
         message: message,
       };

       if(status.status !== 200) {
         ctx.status = 200;
       }

    }

  }
}
