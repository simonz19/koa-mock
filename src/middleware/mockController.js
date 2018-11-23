const qs = require('qs');
const config = require('../config');

const {
  app: { endpoint }
} = config;

module.exports = async ctx => {
  let url = ctx.request.url;
  if (url.indexOf(endpoint) > -1) {
    // url = url.replace(endpoint, '');
    console.log(qs.parse(url));
  }
};
