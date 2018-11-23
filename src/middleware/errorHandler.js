const SystemError = require('../errors/SystemError');

// eslint-disable-next-line
module.exports = config => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = new SystemError();
      ctx.app.emit('error', err, ctx);
    }
  };
};
