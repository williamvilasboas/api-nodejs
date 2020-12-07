const express = require('express');
const AuthMiddleware = require('../middlewares/auth');
const SecureSimpleMiddleware = require('../middlewares/secure-simple');

const routes = express.Router();

const { Response } = require('../libs/encapsulation');
const { RuleRoot, RuleCustomerUser } = require('../libs/rule');

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

routes.post('/auth/sign-in', Response(AuthController.signIn));
routes.post('/auth/sign-up', Response(AuthController.signUp));

SecureSimpleMiddleware(routes);
AuthMiddleware(routes);

routes.post('/user', RuleRoot, Response(AuthController.signUp));
routes.get('/user/:id?', RuleCustomerUser, Response(UserController.get));
routes.put('/user/:id?', RuleCustomerUser, Response(UserController.update));
routes.delete('/user/:id?', RuleCustomerUser, Response(UserController.remove));

module.exports = routes;
