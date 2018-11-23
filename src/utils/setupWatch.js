const chokidar = require('chokidar');
const paths = require('../config/paths')(process.cwd());
const chalk = require('chalk');
const chalkWapper = require('./chalkWapper');

function setupWatch(devServer) {
  const files = [paths.resolveApp('.koamockrc'), paths.resolveApp('.koamockrc.js')];
  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true
  });
  watcher.on('change', path => {
    console.log(chalkWapper(chalk.green)(`File ${path.replace(paths.appDirectory, '.')} changed, try to restart server`));
    watcher.close();
    devServer.close();
    process.send('RESTART');
  });
}

module.exports = setupWatch;
