const _ = require('lodash');

let config = {
  port: 8081,
  mode: 'mock', // mock,proxy,auto
  endpoint: '/api/biz-all',
  proxyTo: '' // worked on proxy mode only
};

module.exports.mergeConfig = rcConfig => {
  return (config = _.merge(config, rcConfig));
};

module.exports.getConfig = () => config;
