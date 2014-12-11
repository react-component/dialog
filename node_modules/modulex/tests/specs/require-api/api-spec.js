describe('support require api in define', function () {
    beforeEach(function () {
        modulex.clearLoader();
        require.config({
            combine: false
        });
    });

    it('async and toUrl works', function (done) {
        require.config('packages', {
            't': {
                tag: 2,
                base: '/tests/specs/require-api'
            }
        });
        var ret1 = Q.defer();
        var ret2 = Q.defer();

        require(['t/t1', 't/t2'], function (t1, t2) {
            t1.init(function (tt1) {
                ret1.resolve(tt1);
            });

            t2.init(function (tt2) {
                ret2.resolve(tt2);
            });

            Q.all([ret1.promise, ret2.promise]).then(function (v) {
                var ee;
                try {
                    expect(v[0].css).to.be.equal('http://' + location.host + '/tests/specs/require-api/x.css');
                    expect(v[0].swf).to.be.equal('http://' + location.host + '/tests/specs/require-api/x.swf');
                    expect(v[1]).to.be.equal(2);
                } catch (e) {
                    ee = e;
                }
                done(ee);
            });
        });
    });
});