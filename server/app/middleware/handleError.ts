export default (options, app) => {
  return async (ctx, next) => {
    try {
      console.log('handle_error options', options);

      await next();
    }catch (e) {
      console.log('错误', e)
       const status = e.status || 500;

       const message = app.config.env === 'prod' ? 'Internal Server Error' : e.message;

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
