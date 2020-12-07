const { UserModel, sequelize } = require('../models');
const EasyForm = require('../libs/easy-form');
const AppTypeException = require('../errors/AppTypeException');

const signIn = async (req, _, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppTypeException('AUTH_REQUIRED_FIELDS'));
  }

  const { user, authToken } = await UserModel.authenticate(username, password);

  return {
    success: true,
    user,
    token: authToken.token,
  };
};

const signUp = async (req) => EasyForm(sequelize)({
  fields: req.body,
  model: UserModel,
});

module.exports = {
  signIn,
  signUp,
};
