# gulp-jscs [![Build Status](https://travis-ci.org/jscs-dev/gulp-jscs.svg?branch=master)](https://travis-ci.org/jscs-dev/gulp-jscs)

> Check JavaScript code style with [jscs](https://github.com/jscs-dev/node-jscs)

![](screenshot.png)

*Issues with the output should be reported on the jscs [issue tracker](https://github.com/jscs-dev/node-jscs/issues).*


## Install

```sh
$ npm install --save-dev gulp-jscs
```


## Usage

```js
var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(jscs());
});
```


## API

### jscs(options)

#### options

Type: `object`

See the jscs [options](https://github.com/jscs-dev/node-jscs#options).

Alternatively you can set the `configPath` *(default: `'.jscsrc'`)* option to the path of a [.jscsrc](https://github.com/jscs-dev/node-jscs#configuration) file.

Set `esnext: true` if you want your code to be parsed as ES6 using the harmony
version of the esprima parser.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
