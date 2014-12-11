
describe('timestamp for individual module works', function () {
    var mx = modulex;

    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', false);
    });

    it('works and avoid repeated loading', function (done) {
        var mods = modulex.Env.mods;

        require.config({
            packages: {
                'timestamp': {
                    tag: 'a',
                    base: '/tests/specs/timestamp'
                }
            },
            modules: {
                'timestamp/x': {
                    tag: 'b',
                    requires: ['./z']
                },
                'timestamp/z': {
                    tag: 'z'
                }
            }
        });

        var r1 = Q.defer();

        require(['timestamp/x'], function () {
           r1.resolve();
        });

        r1.promise.then(function () {
            expect(mx.Loader.Utils.endsWith(mods['timestamp/x'].uri, 'b.js')).to.be.equal(true);
            expect(mx.Loader.Utils.endsWith(mods['timestamp/z'].uri, 'z.js')).to.be.equal(true);
            expect(mods['timestamp/x'].getTag()).to.be.equal('b');
            expect(mods['timestamp/z'].getTag()).to.be.equal('z');
            expect(window.TIMESTAMP_X).to.be.equal(1);
        });

        var r2 = Q.defer();

        r1.promise.then(function () {
            require(['timestamp/y'], function () {
                r2.resolve();
            });
        });

        r2.promise.then(function () {
            expect(mods['timestamp/x'].getTag()).to.be.equal('b');
            expect(mods['timestamp/y'].getTag()).to.be.equal('a');
            expect(window.TIMESTAMP_X).to.be.equal(1);

            done();
        });
    });

    it('can be set later', function (done) {
        window.TIMESTAMP_X = 0;

        var mods = modulex.Env.mods;

        require.config({
            packages: {
                'timestamp': {
                    tag: 'a',
                    base: '/tests/specs/timestamp'
                }
            },
            modules: {
                'timestamp/x': {
                    tag: 'b',
                    requires: ['./z']
                },
                'timestamp/z': {
                    tag: 'z'
                }
            }
        });

        require.config('modules', {
            'timestamp/x': {
                tag: 'q'
            }
        });

        var r1 = Q.defer();
        var r2 = Q.defer();

        require(['timestamp/x'], function () {
           r1.resolve();
        });

        r1.promise.then(function () {
            expect(mx.Loader.Utils.endsWith(mods['timestamp/x'].uri, 'q.js')).to.be.equal(true);
            expect(mx.Loader.Utils.endsWith(mods['timestamp/z'].uri, 'z.js')).to.be.equal(true);
            expect(mods['timestamp/x'].getTag()).to.be.equal('q');
            expect(mods['timestamp/z'].getTag()).to.be.equal('z');
            expect(window.TIMESTAMP_X).to.be.equal(1);
        });

        r1.promise.then(function () {
            require(['timestamp/y'], function () {
                r2.resolve();
            });
        });

        r2.promise.then(function () {
            expect(mods['timestamp/x'].getTag()).to.be.equal('q');
            expect(mods['timestamp/y'].getTag()).to.be.equal('a');
            expect(window.TIMESTAMP_X).to.be.equal(1);

            done();
        });
    });
});
