const _ = require('lodash');

let config = {
  port: 8081,
  mode: 'mock' // mock,proxy,auto
};

module.exports.mergeConfig = rcConfig => {
  return (config = _.merge(config, rcConfig));
};

module.exports.getConfig = () => config;
