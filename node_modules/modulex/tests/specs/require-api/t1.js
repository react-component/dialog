define(function (require, exports, module) {
    module.exports = {
        init: function (fn) {
            require(['./t1-async'], fn);
        }
    };
});