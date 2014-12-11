describe('core package', function () {
    var mx = modulex;

    beforeEach(function () {
        mx.clearLoader();
        mx.config({
            combine: false
        });
    });

    if (!window.isCoverage) {
        it('infer base', function () {
            expect(mx.config('base')).to.be(mx.version === '@VERSION@' ? 'http://localhost:8000/lib/' : 'http://localhost:8000/build/');
        });
    }

    it('can set individually', function (done) {
        mx.config({
            base: '/tests/specs/core-package',
            packages: {
                core: {
                    filter: ''
                },
                'core-package-test': {
                    filter: 'min',
                    base: '/tests/specs/core-package/core-package-test'
                }
            }
        });
        require(['t', 'core-package-test/t'], function (coreT, t) {
            expect(coreT).to.be.equal(1);
            expect(t).to.be.equal(2);
            done();
        });
    });
});