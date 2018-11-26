#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
// const { realpathSync } = fs;
const cwd = process.cwd();

const appDirectory = path.resolve(cwd, '..', '..');
const rcTplPath = path.resolve(__dirname, '..', 'src/tpl/.koamockrc.js');
const rcAppPath = path.resolve(appDirectory, '.koamockrc.js');
const mockTplDirectory = path.resolve(__dirname, '..', 'src/tpl/mock');
const mockAppDirectory = path.resolve(appDirectory, 'mock');

if (!fs.existsSync(mockAppDirectory)) {
  fs.copySync(mockTplDirectory, mockAppDirectory);
}

if (!fs.existsSync(rcAppPath)) {
  const tplFile = fs.readFileSync(rcTplPath, 'utf-8');
  fs.writeFileSync(rcAppPath, tplFile);
  console.log(chalk.cyan("a temp config file '.koamockrc.js' of koa-mock has been generated"));
  console.log();
}
