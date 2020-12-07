const AppTypeException = require('../errors/AppTypeException');

module.exports = (app) => {
  app.put('*', async (req, _, next) => {
    if (req.header('Content-type') !== 'application/json') {
      return next(new AppTypeException('HEADER_CONTENT_TYPE_NOT_ACCEPT'));
    }
    return next();
  });

  return app;
};
