const Types = require('./types');

module.exports = function AppTypeException(
  type,
  detail = null,
  message = null,
  options = { status: 500 },
) {
  const typeItem = Types[type];
  const { status } = options;
  this.name = typeItem.name || 'AppTypeException';
  this.type = typeItem.type || type;
  this.detail = typeItem.detail || detail;
  this.message = typeItem.message || message;

  this.status = typeItem.status || status;

  this.toJson = () => this;
};
