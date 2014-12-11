var path = require('path');
var fs = require('fs');
var util = require('modulex-util');
var cwd = process.cwd();
var cwdLength = cwd.length;

function getPackageName(moduleName) {
  var index = moduleName.indexOf('/');
  if (index !== -1) {
    return {
      packageName: moduleName.slice(0, index),
      suffix: moduleName.slice(index)
    };
  } else {
    return moduleName;
  }
}

function findPackagePath(file, name, suffix) {
  var dir = path.resolve(path.dirname(file));
  do {
    var packageDir = path.join(dir, 'node_modules/' + name);
    if (fs.existsSync(packageDir)) {
      var packagePath = packageDir.slice(cwdLength);
      if (!suffix) {
        var main = require(path.join(packageDir, 'package.json')).main || 'index';
        if (util.startsWith(main, './')) {
          main = main.slice(2);
        }
        suffix = '/' + main;
      }
      return packagePath + suffix;
    }
  } while (dir !== cwd && (dir = path.resolve(dir, '../')));
  console.warn('Can not find package in file ' + file + ': ' + name + ', please npm install ' + name + '!');
  return name;
}

var requireRegExp = /[^.'"]\s*require\s*\((['"])([^)]+)\1\)/g;
function completeRequire(file, content) {
  // Remove comments from the callback string,
  // look for require calls, and pull them into the dependencies,
  // but only if there are function args.
  return content.replace(requireRegExp, function (match, quote, dep) {
    var leading = match.charAt(0) + 'require(';
    if (dep.charAt(0) !== '.') {
      var packageName = getPackageName(dep);
      var suffix = '';
      if (packageName !== dep) {
        suffix = packageName.suffix;
        packageName = packageName.packageName;
      }
      return leading + quote + findPackagePath(file, packageName, suffix) + quote + ')';
    } else {
      return match;
    }
  });
}

module.exports = function (dir, option) {
  dir = dir || process.cwd();
  option = option || {};
  return function* (next) {
    var fileType = (this.url.match(/\.(js)$/) || []).shift();
    if (fileType) {
      var file = path.join(dir, this.url), content = this.body;
      if (!content) {
        var json = 0;
        if (!fs.existsSync(file)) {
          if (util.endsWith(file, '.json.js')) {
            file = file.slice(0, -3);
            json = 1;
          }
        }
        if (!fs.existsSync(file)) {
          return yield *next;
        }
        content = fs.readFileSync(file, 'utf-8');
        if (json) {
          content = 'module.exports = ' + content + ';';
        }
      }
      if (!option.nowrap || !option.nowrap.call(this)) {
        content = completeRequire(file, content);
        content = 'define(function (require, exports, module) {' + content + '\n});';
      }
      this.set('Content-Type', 'application/javascript;charset=utf-8');
      this.set('Content-Length', Buffer.byteLength(content));
      this.body = content;
      if (option.next && option.next.call(this)) {
        yield * next;
      }
    } else {
      yield *next;
    }
  };
};