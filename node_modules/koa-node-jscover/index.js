var fs = require('fs');
var Path = require('path');
var cwd = process.cwd();

module.exports = function (option) {
    var jscover = option.jscover;
    return function *(next) {
        var path = this.path;
        var originalSrc = path.match(/\/node-jscover\/lib\/front-end\/original-src\/(.+)/);
        if (originalSrc) {
            var srcPath = Path.join(cwd, originalSrc[1]);
            this.set('Content-Type', 'application/javascript;charset=utf-8');
            this.body = fs.readFileSync(srcPath, {
                encoding: 'utf-8'
            });
            return;
        }
        var pathname;
        if (this.url.match(/-coverage\.js/)) {
            pathname = this.path.replace(/-coverage/, '');
        }
        if (!pathname) {
            yield *next;
            return;
        }
        var codeFile = Path.join(cwd, pathname);
        var name = pathname.substring(1);
        this.set('Content-Type', 'application/javascript;charset=utf-8');
        var content = this.body;
        if (!content) {
            content = fs.readFileSync(codeFile, {
                encoding: 'utf-8'
            });
        }
        if(!option.onlyLoad || !option.onlyLoad.call(this)){
            content = jscover.instrument(content, name, {
                excludeHeader: true
            });
        }
        this.body = content;
        if (option.next && option.next.call(this)) {
            yield *next;
        }
    };
};