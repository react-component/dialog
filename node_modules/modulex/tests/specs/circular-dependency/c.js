define("circular-dependency/c", function (require, exports) {
    var a = require('./a');
    exports.c = 'c';
    exports.get = function () {
        return this.c+a.a;
    }
});