/*jshint quotmark:false*/

describe('loader package', function () {
    var mx = modulex;
    var Loader = mx.Loader;

    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', false);
    });

    it('longest match works', function (done) {
        var debug = mx.Config.debug;
        mx.Config.debug = true;
        mx.config({
            packages: {
                test: {
                    base: '/tests/specs/package_path_longest_match/test'
                },
                test2: {
                    base: '/tests/specs/package_path_longest_match/test/test2'
                }
            }
        });

        var ret = 0;

        mx.use(['test2/a'], function (A) {
            ret = A;
            expect(A).to.be.equal(9);
            mx.Config.debug = debug;
            done();
        });
    });

    it('match by slash', function () {
        mx.config({
            packages: {
                com: {
                    base: '/tests/specs/package_path_longest_match/com'
                },
                'com/c': {
                    base: '/tests/specs/package_path_longest_match/com/c'
                }
            }
        });

        var m1 = new Loader.Module({
            id: 'component'
        });

        expect(m1.getPackage().name).to.be.equal('core');


        m1 = new Loader.Module({
            id: 'component/a'
        });

        expect(m1.getPackage().name).to.be.equal('core');

        m1 = new Loader.Module({
            id: 'component/a/c'
        });

        expect(m1.getPackage().name).to.be.equal('core');

        m1 = new Loader.Module({
            id: 'com'
        });

        expect(m1.getPackage().name).to.be.equal('com');

        m1 = new Loader.Module({
            id: 'com/a'
        });

        expect(m1.getPackage().name).to.be.equal('com');

        m1 = new Loader.Module({
            id: 'com/a/a'
        });

        expect(m1.getPackage().name).to.be.equal('com');

        m1 = new Loader.Module({
            id: 'com/c'
        });

        expect(m1.getPackage().name).to.be.equal('com/c');

        m1 = new Loader.Module({
            id: 'com/c/a'
        });

        expect(m1.getPackage().name).to.be.equal('com/c');
    });
});