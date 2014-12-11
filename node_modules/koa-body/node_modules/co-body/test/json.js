
var request = require('supertest');
var parse = require('..');
var koa = require('koa');

describe('parse.json(req, opts)', function(){
  describe('with valid json', function(){
    it('should parse', function(done){
      var app = koa();

      app.use(function *(){
        var body = yield parse.json(this);
        body.should.eql({ foo: 'bar' });
        done();
      });

      request(app.listen())
      .post('/')
      .send({ foo: 'bar' })
      .end(function(){});
    })
  })
})
