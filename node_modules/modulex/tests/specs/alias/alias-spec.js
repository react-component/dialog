var run = function (combine) {
    /*jshint quotmark:false*/
    describe("modulex Loader alias" + (combine ? ' at combo mode' : ''), function () {
        beforeEach(function () {
            modulex.clearLoader();
            require.config('combine', !!combine);
        });

        it('works for package alias', function (done) {
            var modules = {
                'alias-a/x': ['alias-a/b', 'alias-a/c'],
                'alias-a/d': ['alias-a/d/e', 'alias-a/d/f']
            };
            require.config({
                packages: {
                    'alias-a': {
                        base: '/tests/specs/alias/alias-a',
                        alias: function (name) {
                            return modules[name];
                        }
                    }
                }
            });
            require(['alias-a/x'], function (X) {
                var ee;
                try {
                    expect(X).to.be.equal('alias-a/b');
                } catch (e) {
                    ee = e;
                }
                done(ee);
            });
        });

        it('works for global alias', function (done) {
            var modules = {
                'alias-a/x': ['alias-a/b', 'alias-a/c'],
                'alias-a/d': ['alias-a/d/e', 'alias-a/d/f']
            };
            require.config({
                alias: modules,
                packages: {
                    'alias-a': {
                        base: '/tests/specs/alias/alias-a'
                    }
                }
            });
            require(['alias-a/x'], function (X) {
                expect(X).to.be.equal('alias-a/b');
                done();
            });
        });

        it('alias works for module', function (done) {
            require.config({
                packages: {
                    'alias-a': {
                        base: '/tests/specs/alias/alias-a'
                    }
                },
                modules: {
                    'alias-a/x': {
                        alias: ['alias-a/b', 'alias-a/c']
                    },
                    'alias-a/d': {
                        alias: ['alias-a/d/e', 'alias-a/d/f']
                    },
                    'alias-a/b': {
                        requires: ['alias-a/d']
                    }
                }
            });

            require(['alias-a/x'], function (X) {
                expect(X).to.be.equal('alias-a/b');
                done();
            });
        });
    });
};
run();
run(1);