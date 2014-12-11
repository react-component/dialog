# modulex

A module registration and load library

[![modulex](https://nodei.co/npm/modulex.png)](https://npmjs.org/package/modulex)
[![NPM downloads](http://img.shields.io/npm/dm/modulex.svg)](https://npmjs.org/package/modulex)
[![Build Status](https://secure.travis-ci.org/kissyteam/modulex.png?branch=master)](https://travis-ci.org/kissyteam/modulex)
[![Coverage Status](https://coveralls.io/repos/kissyteam/modulex/badge.png?branch=master)](https://coveralls.io/r/kissyteam/modulex?branch=master)
[![Dependency Status](https://gemnasium.com/kissyteam/modulex.png)](https://gemnasium.com/kissyteam/modulex)
[![Bower version](https://badge.fury.io/bo/modulex.svg)](http://badge.fury.io/bo/modulex)

[![browser support](https://ci.testling.com/kissyteam/modulex.png)](https://ci.testling.com/kissyteam/modulex)


## api

http://docs.kissyui.com/5.0/api/classes/Modulex.html

### config environment

```javascript
require.config({
    packages: {},
    modules: {}
});
```

### register module

#### commonjs style

```javascript
define(function(require,exports,module){
});
```

#### amd style

```javascript
define(function(X){
},{
    requires:['x']
});
```

### use module

can also load requirejs commonjs style module

```javascript
require(['x','u'],function(X,U){
});
```

### use module inside define

```javascript
define(function(require,exports){
    exports.onClick = function(){
        var z = ['mod/z'];
        require(z, function(Z){
            // TODO with z
        });
    };
});
```

### noConflict

can use modulex.noConflict() to give up global require and define variable.

``` javascript
var require = global.require;
var define = global.define;
global.require = modulex.use;
global.require.config = modulex.config;
global.define = modulex.add;
mx.noConflict = function () {
    global.require = require;
    global.define = define;
};
```

## guide

http://docs.kissyui.com/5.0/guides/modulex/index.html

## contribution

### prepare development environment

* npm install
* npm install -g gulp
* gulp server

### modify code

* modify source file inside lib

### run test cases

* open [http://localhost:8000/tests/runner.html](http://localhost:8000/tests/runner.html) to test
* open [http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage](http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage) to check test coverage

### pull request

* file an issue: [https://github.com/kissyteam/modulex/issues/new](https://github.com/kissyteam/modulex/issues/new)
* then pull request
