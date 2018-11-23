module.exports = class BaseError {
  constructor(...args) {
    this.success = false;
    this.message = args.message || '未知错误';
  }
};
