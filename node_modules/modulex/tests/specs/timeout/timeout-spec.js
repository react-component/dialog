describe('timeout', function () {
    var mx = modulex;

    var timeout;

    beforeEach(function () {
        mx.clearLoader();
        timeout = mx.config('timeout') || 0;
        mx.config({
            combine: false,
            timeout: 1
        });
    });

    afterEach(function () {
        mx.config({
            timeout: timeout
        });
    });

    it('works for use', function (done) {
        mx.config({
            modules: {
                'timeout/use': {
                    uri: '/tests/specs/timeout/use.jss?' + mx.Loader.Utils.now()
                }
            }
        });

        mx.use(['timeout/use'], {
            success: function (d) {
                expect(d).to.be.equal(1);
                done();
            },
            error: function () {
                done();
            }
        });
    });

    it('works for use2', function (done) {
        mx.config({
            packages: {
                timeout: {
                    base: '/tests/specs/timeout'
                }
            },
            modules: {
                'timeout/r2': {
                    uri: '/tests/specs/timeout/r2.jss?' + mx.Loader.Utils.now()
                }
            }
        });
        mx.use(['timeout/r'], {
            error: function () {
                done();
            }
        });
    });
});