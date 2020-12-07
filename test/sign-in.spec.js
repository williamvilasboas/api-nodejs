const chai = require('chai');

const http = require('chai-http');

const subSet = require('chai-subset');

const { app } = require('../src/app');

const { APP_TOKEN_ROOT } = process.env;

chai.use(http);

chai.use(subSet);

const chaiGet = (uri, token) => chai.request(app)
  .get(uri)
  .auth(token, {
    type: 'bearer',
  })
  .set('content-type', 'application/json')
  .type('json');

describe('Teste de integração auth/sign-in', () => {
  it('/auth/login - POST ROOT', (done) => {
    chai
      .request(app)
      .post('/auth/sign-in')
      .set('content-type', 'application/json')
      .type('json')
      .send({
        username: 'admin@admin.com.br',
        password: 'admin',
      })
      .end((errAuth, resAuth) => {
        const { error } = resAuth;
        if (error || errAuth) {
          return done(error || errAuth);
        }
        chai.expect(resAuth).to.have.status(200);
        chai.expect(resAuth.body).to.have.own.property('success', true);
        return done();
      });
  });

  it('/auth/login - POST Customer', (done) => {
    chai
      .request(app)
      .post('/auth/sign-in')
      .set('content-type', 'application/json')
      .type('json')
      .send({
        username: 'william.vboas@gmail.com',
        password: 'admin',
      })
      .end((errAuth, resAuth) => {
        const { error } = resAuth;
        if (error || errAuth) {
          return done(error || errAuth);
        }
        chai.expect(resAuth).to.have.status(200);
        chai.expect(resAuth.body).to.have.own.property('success', true);
        return done();
      });
  });
});
