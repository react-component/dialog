var run = function (combine) {
    /*jshint quotmark:false*/
    describe("require.config('modules', {x:{requires:[]}}) " + (combine ? 'at combo mode' : ''), function () {
        var mx = modulex;
        beforeEach(function () {
            modulex.clearLoader();
            require.config('combine', !!combine);
        });
        it("should solve index", function () {
            require.config("modules", {
                "add_require/x/": {
                    requires: ['add_require/y/']
                }
            });

            require.config('modules', {
                "add_require/a/": {
                    requires: ['add_require/b/']
                }
            });

            define('add_require/a/', '2', {
                requires: ['add_require/b/']
            });

            define('add_require/b/', '1');

            require(['add_require/a/']);

            expect(mx.require('add_require/b/')).to.be.equal('1');
            expect(mx.require('add_require/a/')).to.be.equal('2');
        });
    });
};
run();
run(1);