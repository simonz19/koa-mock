const BaseError = require('./BaseError');

module.exports = class SystemError extends BaseError {
  constructor(...args) {
    super(...args);
    this.message = '系统错误';
  }
};
