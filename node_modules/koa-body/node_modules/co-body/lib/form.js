
/**
 * Module dependencies.
 */

var raw = require('raw-body');
var qs = require('qs');

/**
 * Return a a thunk which parses x-www-form-urlencoded requests.
 *
 * Pass a node request or an object with `.req`,
 * such as a koa Context.
 *
 * @param {Request} req
 * @param {Options} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function(req, opts){
  req = req.req || req;
  opts = opts || {};

  // defaults
  var len = req.headers['content-length'];
  if (len) opts.length = ~~len;
  opts.encoding = opts.encoding || 'utf8';
  opts.limit = opts.limit || '56kb';

  return function(done){
    raw(req, opts, function(err, str){
      if (err) return done(err);

      try {
        done(null, qs.parse(str));
      } catch (err) {
        err.status = 400;
        err.body = str;
        done(err);
      }
    });
  }
};