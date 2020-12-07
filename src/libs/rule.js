const AppTypeException = require('../errors/AppTypeException');

const RuleIsRoot = (req) => req.session.user.type === 'root';

const RuleRoot = async (req, _, next) => {
  if (RuleIsRoot(req)) {
    return next();
  }
  return next(new AppTypeException('PERMISSION_DENIED'));
};

const RuleCustomerUser = async (req, _, next) => {
  if (RuleIsRoot(req)) {
    return next();
  }

  if (req.params.id === req.session.user.id) {
    return next();
  }

  if (!req.params.id) {
    return next();
  }

  return next(new AppTypeException('PERMISSION_DENIED'));
};

module.exports = { RuleRoot, RuleIsRoot, RuleCustomerUser };
