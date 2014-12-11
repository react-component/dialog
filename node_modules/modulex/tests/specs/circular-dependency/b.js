define('circular-dependency/b', function (require, exports) {
    var c = require('./c');
    exports.b = 'b';
    exports.get = function () {
        return c.get() + 'b';
    };
});