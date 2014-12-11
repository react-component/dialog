define('circular-dependency/a1',function (require, exports) {
    var b = require('./b1');
    exports.b = function () {
        return b.b() + 1;
    };
    exports.a = function () {
        return 1;
    };
});