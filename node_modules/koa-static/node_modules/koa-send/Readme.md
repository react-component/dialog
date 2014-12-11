
# koa-send

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

 Static file serving middleware.

## Installation

```js
$ npm install koa-send
```

## Options

 - `maxage` Browser cache max-age in milliseconds. defaults to 0
 - `hidden` Allow transfer of hidden files. defaults to false
 - `root` Root directory to restrict file access

Note that the module will try to serve the gzipped version of a file automatically when `gzip` is supported by a client and if the requested file with `.gz` extension exists.

## Root path

  Note that when `root` is _not_ used you __MUST__ provide an _absolute_
  path, and this path must not contain "..", protecting developers from
  concatenating user input. If you plan on serving files based on
  user input supply a `root` directory from which to serve from.

  For example to serve files from `./public`:

```js
app.use(function *(){
  yield send(this, this.path, { root: __dirname + '/public' });
})
```

  To serve developer specified files:

```js
app.use(function *(){
  yield send(this, 'path/to/my.js');
})
```

## Example

```js
var send = require('koa-send');
var koa = require('koa');
var app = koa();

// $ GET /package.json
// $ GET /

app.use(function *(){
  if ('/' == this.path) return this.body = 'Try GET /package.json';
  yield send(this, __dirname + '/package.json');
})

app.listen(3000);
console.log('listening on port 3000');
```

## License

  MIT

[npm-image]: https://img.shields.io/npm/v/koa-send.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-send
[github-tag]: http://img.shields.io/github/tag/koajs/send.svg?style=flat-square
[github-url]: https://github.com/koajs/send/tags
[travis-image]: https://img.shields.io/travis/koajs/send.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/send
[coveralls-image]: https://img.shields.io/coveralls/koajs/send.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koajs/send?branch=master
[david-image]: http://img.shields.io/david/koajs/send.svg?style=flat-square
[david-url]: https://david-dm.org/koajs/send
[license-image]: http://img.shields.io/npm/l/koa-send.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/koa-send.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/koa-send
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
