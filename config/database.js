require('dotenv-flow').config(); // this is important!

const {
  DB_NAME: database, DB_USER: username, DB_PASS: password, DB_HOST: host,
} = process.env;

module.exports = {
  username,
  password,
  database,
  host,
  dialect: 'mysql',
};
