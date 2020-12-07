const chai = require('chai');

const http = require('chai-http');

const subSet = require('chai-subset');

const { app } = require('../src/app');

chai.use(http);

chai.use(subSet);

describe('Teste de integração', () => {
  it('/status - GET', done => {
    chai
      .request(app)
      .get('/status')
      .send()
      .end((err, res) => {
        const { body } = res;

        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        const { to } = chai.expect(body);

        to.containSubset({
          status: 'ok'
        });
        done();
      });
  });
});
