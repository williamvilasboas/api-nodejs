const chai = require('chai');

const http = require('chai-http');

const subSet = require('chai-subset');

const { app } = require('../src/app');

const { APP_TOKEN_ROOT: TOKEN } = process.env;

chai.use(http);

chai.use(subSet);

const easyChai = (uri, token, method = 'get') => chai.request(app)[method](uri)
  .auth(token, {
    type: 'bearer',
  })
  .set('content-type', 'application/json')
  .type('json');

describe('Teste de integração - USER', () => {
  it('/user - List', (done) => {
    easyChai('/user', TOKEN)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('array').lengthOf(2);
        return done();
      });
  });

  it('/user - Detail', (done) => {
    easyChai('/user/1', TOKEN)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.property('name', 'admin');
        chai.expect(res.body).to.property('deletedAt', null);
        return done();
      });
  });

  it('/user - Create', (done) => {
    easyChai('/user', TOKEN, 'post')
      .send({
        name: 'William',
        email: 'vilas@gmail.com',
        password: '123456789',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.property('name', 'William');
        chai.expect(res.body).to.property('type', 'customer');

        return done();
      });
  });

  it('/user - Update', (done) => {
    easyChai('/user/2', TOKEN, 'put')
      .send({
        name: 'Vilas 02',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.property('name', 'Vilas 02');
        return done();
      });
  });

  it('/user - DELETE', (done) => {
    easyChai('/user/2', TOKEN, 'delete')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.property('deletedAt');
        return done();
      });
  });

  it('/user - SignIn', (done) => {
    easyChai('/user', TOKEN, 'post')
      .send({
        name: 'William',
        email: 'vilas2@gmail.com',
        password: '123456789',
      })
      .end((errSignUp, restSignUp) => {
        if (errSignUp) {
          return done(errSignUp);
        }

        const credentials = {
          name: 'William',
          username: 'vilas2@gmail.com',
          password: '123456789',
          type: 'customer',
        };

        chai.expect(restSignUp).to.have.status(200);
        chai.expect(restSignUp.body).to.be.a('object');
        chai.expect(restSignUp.body).to.property('name', credentials.name);
        chai.expect(restSignUp.body).to.property('type', 'customer');

        easyChai('/auth/sign-in', TOKEN, 'post')
          .send(credentials)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body.user).to.property('name', credentials.name);
            chai.expect(res.body.user).to.property('email', credentials.username);
            chai.expect(res.body).to.property('token');

            return done();
          });
      });
  });
});
