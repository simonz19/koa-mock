const url = require('url');
const fs = require('fs-extra');
const cwd = process.cwd();
const paths = require('../config/paths')(cwd);
const path = require('path');
const {
  endpoint
} = require('../config').getConfig();

const getMockPath = ctx => {
  const ctxUrl = url.parse(ctx.request.url);
  if (ctxUrl.pathname.indexOf(endpoint) === -1) {
    ctx.throw('can not match endpoint');
    return;
  }
  const subPathnames = ctxUrl.pathname
    .replace(endpoint, '')
    .split('/')
    .filter(item => !!item);

  return path.resolve(paths.mockDir, subPathnames.join('/'), 'index.json'); // eslint-disable-line
};

module.exports = async ctx => {
  const mockpath = getMockPath(ctx);

  if (!mockpath || !fs.existsSync(mockpath)) {
    ctx.throw('no such mock data yet!');
    return;
  }
  const resp = require(mockpath); // eslint-disable-line
  ctx.body = resp;

  // if (!fs.existsSync(mockpath)) {
  //   fs.mkdirs(mockpath, { recursive: true }, err => {
  //     // if (err) throw err;
  //     console.log(err)
  //   });
  // }
};
