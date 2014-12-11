var run = function (combine) {
    describe('loader should report error ' + (combine ? 'at combo mode' : ''), function () {
        var mx = modulex;

        beforeEach(function () {
            modulex.clearLoader();
            require.config('combine', !!combine);
        });

        it('should works', function (done) {
            require.config({
                'packages': {
                    'report': {
                        base: '/tests/specs/error-report/' +
                            (combine ? 'combo' : 'simple')
                    }
                }
            });

            if (combine) {
                require.config('modules', {
                    'report/s1': {
                        requires: ['./s2']
                    },
                    'report/s3': {
                        requires: ['./s4', './s2']
                    }
                });
            }

            var success1;
            var error1;

            var r1 = Q.defer();

            require(['report/s1'], {
                success: function () {
                    success1 = arguments;
                    r1.resolve();
                },
                error: function () {
                    error1 = arguments;
                    r1.resolve();
                }
            });

            var success2;
            var error2;
            var r2 = Q.defer();

            require(['report/s3'], {
                success: function () {
                    success2 = arguments;
                    r2.resolve();
                },
                error: function () {
                    error2 = arguments;
                    r2.resolve();
                }
            });

            Q.all([r1.promise, r2.promise]).then(function () {
                var ee;
                try {
                    expect(success1[0]).to.be.equal('!!');
                    expect(success1.length).to.be.equal(1);
                    expect(error1).to.be.equal(undefined);
                    expect(success2).to.be.equal(undefined);
                    expect(error2.length).to.be.equal(1);
                    expect(error2[0].id).to.be.equal(combine ? 'report/s3' : 'report/s4');
                    expect(error2[0].status).to.be.equal(mx.Loader.Status.ERROR);
                } catch (e) {
                    ee = e;
                }
                done(ee);
            });
        });
    });
};

run();
run(1);