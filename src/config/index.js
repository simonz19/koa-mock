const _ = require('lodash');

let config = {
  port: 8081,
  mode: 'mock', // mock,proxy,auto
  endpoint: '',
  proxyTo: '', // worked on proxy and auto mode
  priority: '' // worked on auto mode only, value which defines to be firstTry can be mock or proxy
};

module.exports.mergeConfig = rcConfig => {
  return (config = _.merge(config, rcConfig));
};

module.exports.getConfig = () => config;
