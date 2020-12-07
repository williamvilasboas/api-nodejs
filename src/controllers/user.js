const { UserModel, sequelize, Sequelize } = require('../models');
const EasyForm = require('../libs/easy-form');
const { RuleIsRoot } = require('../libs/rule');

const get = async (req, _, next) => {
  const where = {
    deletedAt: {
      [Sequelize.Op.is]: null,
    },
  };

  if (RuleIsRoot(req) && !req.params.id) {
    return UserModel.findAll({ where });
  }

  if ((req.params.id || req.session.user.id)) {
    where.id = req.params.id || req.session.user.id;
    return UserModel.findOrFail({ where });
  }

  return next();
};

const update = async (req) => EasyForm(sequelize)({
  data: { id: req.params.id || req.session.user.id },
  fields: req.body,
  model: UserModel,
});

const remove = async (req) => {
  const user = await UserModel.findOrFail({
    where: { id: req.params.id || req.session.user.id },
  });
  user.deletedAt = new Date();
  return user.save();
};

module.exports = {
  get, update, remove,
};
