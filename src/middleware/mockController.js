const url = require('url');
const fs = require('fs-extra');
const cwd = process.cwd();
const paths = require('../config/paths')(cwd);
const path = require('path');
const proxy = require('koa-proxy');
const convert = require('koa-convert');
const { endpoint = '', mode, proxyTo } = require('../config').getConfig();

const getMockPath = ctx => {
  const ctxUrl = url.parse(ctx.request.url);
  if (endpoint && ctxUrl.pathname.indexOf(endpoint) === -1) {
    ctx.throw('can not match endpoint');
    return;
  }
  const subPathnames = ctxUrl.pathname
    .replace(endpoint, '')
    .split('/')
    .filter(item => !!item);

  return path.resolve(paths.mockDir, subPathnames.join('/'), 'index.json'); // eslint-disable-line
};

const handleMockMode = async ctx => {
  const mockpath = getMockPath(ctx);
  if (!mockpath || !fs.existsSync(mockpath)) {
    ctx.throw('no such mock data yet!');
    return;
  }

  let respBody = require(mockpath); // eslint-disable-line
  if (typeof respBody === 'function') {
    respBody = respBody();
  }
  ctx.body = respBody;
  delete require.cache[require.resolve(mockpath)];
};

const handleAutoMode = async ctx => {
  const mockpath = getMockPath(ctx);
  if ((mockpath && fs.existsSync(mockpath)) || !proxyTo) {
    return handleMockMode(ctx);
  } else {
    return handleProxyMode(ctx);
  }
};

const handleProxyMode = async ctx => {
  const proxyFunc = convert(
    proxy({
      host: proxyTo
    })
  );
  ctx.request.header['accept-encoding'] = null;
  await proxyFunc(ctx);
  const mockpath = getMockPath(ctx);
  const status = ctx.response.status;
  const contentType = ctx.response.headers['content-type'];
  if (status === 200 && contentType && contentType.indexOf('json') !== -1) {
    fs.createFileSync(mockpath);
    fs.writeFileSync(mockpath, ctx.body);
  }
};

module.exports = async (ctx, next) => {
  switch (mode) {
    case 'auto':
      await handleAutoMode(ctx);
      break;
    case 'proxy':
      await handleProxyMode(ctx);
      break;
    case 'mock':
    default:
      await handleMockMode(ctx);
  }

  await next();
};
