const AppTypeException = require('../errors/AppTypeException');

const { AuthTokenModel } = require('../models');

module.exports = (throwException = false) => async (req, _, next) => {
  try {
    const authorization = req.header('Authorization');

    if (!authorization && !throwException) {
      return next();
    }

    if (!authorization && throwException) {
      return next(new AppTypeException('AUTH_FAIL'));
    }

    const typeAuthorization = authorization.split(' ')[0];

    if (typeAuthorization.toLowerCase() !== 'bearer' && throwException) {
      return next(new AppTypeException('AUTH_NOT_BEARER'));
    }

    const token = authorization.split(' ')[1];
    const { user } = await AuthTokenModel.verify(token);

    if (user) {
      req.session = {
        user,
      };

      return next();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
