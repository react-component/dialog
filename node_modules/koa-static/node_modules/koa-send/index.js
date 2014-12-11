/**
 * Module dependencies.
 */

var debug = require('debug')('koa-send');
var assert = require('assert');
var path = require('path');
var normalize = path.normalize;
var basename = path.basename;
var extname = path.extname;
var resolve = path.resolve;
var fs = require('mz/fs');
var join = path.join;

/**
 * Expose `send()`.
 */

module.exports = send;

/**
 * Send file at `path` with the
 * given `options` to the koa `ctx`.
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function send(ctx, path, opts) {
  assert(ctx, 'koa context required');
  assert(path, 'pathname required');
  opts = opts || {};

  // options
  debug('send "%s" %j', path, opts);
  var root = opts.root ? normalize(resolve(opts.root)) : '';
  var index = opts.index;
  var maxage = opts.maxage || opts.maxAge || 0;
  var hidden = opts.hidden || false;

  return function *(){
    var trailingSlash = '/' == path[path.length - 1];
    var encoding = this.acceptsEncodings('gzip', 'deflate', 'identity');

    // normalize path
    path = decode(path);

    if (-1 == path) return ctx.throw('failed to decode', 400);

    // null byte(s)
    if (~path.indexOf('\0')) return ctx.throw('null bytes', 400);

    // index file support
    if (index && trailingSlash) path += index;

    // malicious path
    if (!root && !isAbsolute(path)) return ctx.throw('relative paths require the .root option', 500);
    if (!root && ~path.indexOf('..')) return ctx.throw('malicious path', 400);

    // relative to root
    path = normalize(join(root, path));

    // out of bounds
    if (root && 0 !== path.indexOf(root)) return ctx.throw('malicious path', 400);

    // hidden file support, ignore
    if (!hidden && leadingDot(path)) return;

    // serve gzipped file when possible
    if (encoding === 'gzip' && (yield fs.exists(path + '.gz'))) {
      path = path + '.gz';
      ctx.set('Content-Encoding', 'gzip');
      ctx.res.removeHeader('Content-Length');
    }

    // stat
    try {
      var stats = yield fs.stat(path);
      if (stats.isDirectory()) return;
    } catch (err) {
      var notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
      if (~notfound.indexOf(err.code)) return;
      err.status = 500;
      throw err;
    }

    // stream
    ctx.set('Last-Modified', stats.mtime.toUTCString());
    ctx.set('Content-Length', stats.size);
    ctx.set('Cache-Control', 'max-age=' + (maxage / 1000 | 0));
    ctx.type = type(path);
    ctx.body = fs.createReadStream(path);

    return path;
  }
}

/**
 * Check if it's hidden.
 */

function leadingDot(path) {
  return '.' == basename(path)[0];
}

/**
 * File type.
 */

function type(file) {
  return extname(basename(file, '.gz'));
}

/**
 * Decode `path`.
 */

function decode(path) {
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
}

/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

function isAbsolute(path){
  if ('/' == path[0]) return true;
  if (':' == path[1] && '\\' == path[2]) return true;
  if ('\\\\' == path.substring(0, 2)) return true; // Microsoft Azure absolute path
}
