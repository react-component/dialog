/*jshint quotmark:false*/

var run = function (combine) {
    var mx = modulex;

    describe('simple config for package works ' + (combine ? 'at combo mode' : ''), function () {
        beforeEach(function () {
            modulex.clearLoader();
            require.config('combine', !!combine);
        });

        it('works', function (done) {
            var mods = modulex.Env.mods;
            require.config({
                packages: {
                    t: {
                        base: '/tests/specs/package/t'
                    }
                }
            });

            require(['t/t'], function (t) {
                expect(t).to.be.equal(1);
                expect(mods['t/t'].exports).to.be.equal(1);
                done();
            });
        });

        it('support main config', function (done) {
            require.config({
                packages: {
                    t: {
                        base: '/tests/specs/package/t',
                        main: 't'
                    }
                }
            });
            var mods = modulex.Env.mods;
            require(['t'], function (t) {
                expect(t).to.be(1);
                expect(mods['t/t'].exports).to.be(1);
                done();
            });
        });

        it('allows use package directly', function (done) {
            mx.config({
                packages: {
                    t: {
                        base: '/tests/specs/package/t'
                    }
                }
            });

            require(['t'], function (T) {
                expect(T).to.be.equal(2);
                done();
            });
        });
    });
};
run();
run(1);