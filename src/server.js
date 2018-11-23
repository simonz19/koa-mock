const Koa = require('koa');
const chalk = require('chalk');
const bodyparser = require('koa-bodyparser');
const cors = require('koa-cors');
const logger = require('koa-logger');
const converter = require('koa-convert');
const config = require('./config').mergeConfig(require('./utils/getAppConfig')(process.cwd()));
const errorHandler = require('./middleware/errorHandler');
const chalkWapper = require('./utils/chalkWapper');
const router = require('./router');

const app = new Koa();

app.use(errorHandler());
app.use(
  converter(
    cors({
      headers: ['Content-Type', 'Authorization', 'Access-Control-Request-Origin', 'X-Requested-With', 'Cache-Control'],
      credentials: true
    })
  )
);
app.use(bodyparser());
app.use(logger());
app.use(router.routes());

if (require.main === module) {
  app.listen(config.port, () => {
    chalkWapper(chalk.cyan)(`mock start sucessful on http://localhost:${config.port}`);
  });
}
