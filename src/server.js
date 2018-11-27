const Koa = require('koa');
const http = require('http');
const chalk = require('chalk');
const bodyparser = require('koa-bodyparser');
const cors = require('koa-cors');
const logger = require('koa-logger');
const converter = require('koa-convert');
const config = require('./config').mergeConfig(require('./utils/getAppConfig')(process.cwd()));
const errorHandler = require('./middleware/errorHandler');
const chalkWapper = require('./utils/chalkWapper');
const mockController = require('./middleware/mockController');
const setupWatch = require('./utils/setupWatch');

if (config.mode === 'proxy' && !config.proxyTo) {
  console.error("'proxyTo' is required in 'proxy' mode");
  console.log();
  process.emit(1);
  return;
}

if (config.mode === 'auto' && !config.proxyTo) {
  console.warn("seems like you forget to set 'proxyTo' in 'auto' mode, data will be only generated in local. ");
  console.log();
}

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
app.use(mockController);

const httpServer = http.createServer(app.callback());
httpServer.listen(config.port, () => {
  if (require.main !== module) {
    setupWatch(httpServer);
  }
  chalkWapper(chalk.cyan)(`mock started sucessfully on http://localhost:${config.port}`);
});
