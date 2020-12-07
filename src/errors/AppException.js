module.exports = function AppException(
  type,
  detail = null,
  message = null,
  options = { status: 500 },
) {
  const { status } = options;
  this.name = 'AppException';
  this.type = type;
  this.detail = detail;
  this.message = message;

  this.status = status;
};
