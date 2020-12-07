function AppError(type, detail = {}, message = 'No description') {
  this.name = 'AppError';

  this.type = type;
  this.detail = detail;
  this.message = message;

  this.toString = function toString() {
    let detailStr = null;

    try {
      detailStr = JSON.stringify(detail, null, 2);
    } catch (e) {
      detailStr = '{}';
    }

    return `AppError: ${this.message} (${detailStr})`;
  };
}

AppError.prototype = new Error();
module.exports = AppError;
