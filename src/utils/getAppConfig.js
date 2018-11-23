const fs = require('fs');
const { existsSync, readFileSync } = fs;
const stripJsonComments = require('strip-json-comments');
const getPaths = require('../config/paths');

const getConfig = (configFile, paths) => {
  const rcConfig = paths.resolveApp(configFile);
  const jsConfig = paths.resolveApp(`${configFile}.js`);

  if (existsSync(rcConfig)) {
    if (existsSync(jsConfig)) {
      console.error(`Config error: You must delete ${rcConfig} if you want to use ${jsConfig}`);
    }
    return JSON.parse(stripJsonComments(readFileSync(rcConfig, 'utf-8')));
  } else if (existsSync(jsConfig)) {
    return require(jsConfig); // eslint-disable-line
  } else {
    return {};
  }
};

module.exports = cwd => {
  return getConfig('.koamockrc', getPaths(cwd));
};
