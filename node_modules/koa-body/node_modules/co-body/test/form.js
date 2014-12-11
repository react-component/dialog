
var request = require('supertest');
var parse = require('..');
var koa = require('koa');

describe('parse.form(req, opts)', function(){
  describe('with valid form body', function(){
    it('should parse', function(done){
      var app = koa();

      app.use(function *(){
        var body = yield parse.form(this);
        body.foo.bar.should.equal('baz');
        done();
      });

      request(app.listen())
      .post('/')
      .type('form')
      .send({ foo: { bar: 'baz' }})
      .end(function(){});
    })
  })
})
