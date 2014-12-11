define(function (require, exports, module) {
    module.exports = {
        init: function (fn) {
            require(['./t2-async'], fn);
        }
    };
});