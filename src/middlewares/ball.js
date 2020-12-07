const Sequelize = require('sequelize');

const { AppException, AppTypeException } = require('../errors');

const { NODE_ENV } = process.env;

module.exports = (app) => {
  app.use((req, res, next) => next(new AppTypeException('NOT_FOUND')));

  app.use(async (err, req, res, _) => {
    if (err instanceof AppException || err instanceof AppTypeException) {
      const {
        type, detail, message, toJson,
      } = err;

      if (toString) {
        return res.status(err.status).json(toJson());
      }

      return res.status(err.status).json({
        type,
        detail,
        message,
      });
    }

    if (err instanceof Sequelize.ValidationError) {
      const errors = [];
      const { errors: errorsValidations } = err;
      if (errorsValidations.length) {
        errorsValidations.forEach((error) => {
          errors.push({
            message: error.message,
            path: error.path,
            field: error.path,
          });
        });
      }

      return res.status(400).json(errors);
    }

    if (NODE_ENV === 'development') {
      return res.status(500).send(err.toString());
    }

    const defaultError = new AppTypeException('UNKNOWN');
    return res.status(defaultError.status).json(defaultError.toJson());
  });
};
