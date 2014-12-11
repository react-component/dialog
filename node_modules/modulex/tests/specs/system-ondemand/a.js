
define('p-c/a', ['./b'], function (require) {
    var b = require('./b');
    return b + 1;
});
define('p-c/b', ['./c'], function () {
    return 3;
});