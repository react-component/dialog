
var request = require('supertest');
var parse = require('..');
var koa = require('koa');

describe('parse(req, opts)', function(){
  describe('with valid form body', function(){
    it('should parse', function(done){
      var app = koa();

      app.use(function *(){
        var body = yield parse(this);
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

  describe('with valid json', function(){
    it('should parse', function(done){
      var app = koa();

      app.use(function *(){
        var body = yield parse(this);
        body.should.eql({ foo: 'bar' });
        done();
      });

      request(app.listen())
      .post('/')
      .send({ foo: 'bar' })
      .end(function(){});
    })
  })

  describe('with missing content-type', function(){
    it('should fail with 415', function(done){
      var app = koa();

      app.use(function *(){
        yield parse(this);
      });

      request(app.listen())
      .post('/')
      .expect(415, 'Unsupported Media Type', done);
    })
  })
})
