const router = require('koa-router')();
const mockController = require('../middleware/mockController');

router.get('*', async (ctx, next) => {
  await mockController(ctx);
  await next();
});

module.exports = router;
