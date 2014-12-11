/**
 * test loader
 * @author yiminghe@gmail.com
 */
/*jshint quotmark:false*/

(function () {
    var run = function (combine) {
        describe('loader-cyclic ' + (combine ? 'at combo mode' : ''), function () {
            beforeEach(function () {
                modulex.clearLoader();
                require.config('combine', !!combine);
            });

            it('can load indirect circular dependency', function (done) {
                require.config({
                    packages: {
                        'circular-dependency': {
                            base: '/tests/specs/circular-dependency'
                        }
                    }
                });

                require(['circular-dependency/a'], function (a) {
                    var ret = a.get();
                    expect(ret).to.be.equal('caba');
                    done();
                });
            });

            it('can load direct circular dependency', function (done) {
                require.config({
                    packages: {
                        'circular-dependency': {
                            base: '/tests/specs/circular-dependency'
                        }
                    }
                });

                require(['circular-dependency/a1'], function (a) {
                    var ret = a.b();
                    expect(ret).to.be.equal(3);
                    done();
                });
            });
        });
    };
    run();
    run(1);
})(modulex);

