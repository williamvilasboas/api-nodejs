require('dotenv-flow').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const ball = require('./middlewares/ball');

const { APP_PORT, APP_NAME } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/status', async (req, res) => res.send({ status: 'ok' }));
app.use(routes);

ball(app);

module.exports = {
  app, port: APP_PORT, name: APP_NAME,
};
