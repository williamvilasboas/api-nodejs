const AuthValidation = require('../libs/auth');

module.exports = (app) => (
  app.use(async (req, _, next) => AuthValidation(true)(req, _, next, true))
);
