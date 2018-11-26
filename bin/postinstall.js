#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { realpathSync } = fs;
const cwd = process.cwd();

const appDirectory = realpathSync(cwd);
const rcPath = path.resolve(appDirectory, '.koamockrc.js');
const mockDirectory = path.resolve(appDirectory, 'mock');

if (!fs.existsSync(mockDirectory)) {
  fs.mkdirsSync(mockDirectory);
}

if (!fs.existsSync(rcPath)) {
  const tplFile = fs.readFileSync(path.resolve(__dirname, '..', 'src/tpl/.koamockrc.js'), 'utf-8');
  fs.writeFileSync(rcPath, tplFile);
  console.log(chalk.cyan("a temp config file '.koamockrc.js' of koa-mock has been generated"));
  console.log();
}
