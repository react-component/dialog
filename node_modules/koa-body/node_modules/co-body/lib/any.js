
/**
 * Module dependencies.
 */

var json = require('./json');
var form = require('./form');

/**
 * Return a a thunk which parses form and json requests
 * depending on the Content-Type.
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

  // parse Content-Type
  var type = req.headers['content-type'] || '';
  type = type.split(';')[0];

  // json
  if ('application/json' == type) return json(req, opts);

  // form
  if ('application/x-www-form-urlencoded' == type) return form(req, opts);

  // invalid
  return function(done){
    var err = new Error('Unsupported or missing content-type');
    err.status = 415;
    done(err);
  }
};