# gulp-jsx [![Build Status](http://img.shields.io/travis/alexmingoia/gulp-jsx.svg?style=flat)](http://travis-ci.org/alexmingoia/gulp-jsx) [![NPM version](http://img.shields.io/npm/v/gulp-jsx.svg?style=flat)](https://npmjs.org/package/gulp-jsx) [![Dependency Status](http://img.shields.io/david/alexmingoia/gulp-jsx.svg?style=flat)](http://david-dm.org/alexmingoia/gulp-jsx)

[jsx-transform](https://github.com/alexmingoia/jsx-transform/) for
[Gulp](https://github.com/gulpjs/gulp/).

## Installation

```sh
npm install gulp-jsx
```

## Usage

```javascript
var gulp = require('gulp');
var jsx = require('gulp-jsx');

gulp.task('build', function() {
  return gulp.src('views/**/*.js')
    .pipe(jsx())
    .pipe(gulp.dest('dist'));
});
```

See [jsx-transform](https://github.com/alexmingoia/jsx-transform) for options
and other usage information.

## Options

Options are passed to
[jsx-transform](https://github.com/alexmingoia/jsx-transform).

### options.match

Type: `RegExp` or `String`
Default: `/jsx?$/i`

Only parses files with pathnames that match this value.

## BSD Licensed
