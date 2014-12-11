/**
 * tc for modules config
 * @author yiminghe@gmail.com
 */

describe('modules and packages', function () {
    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', true);
    });

    it('does not depend on order', function (done) {
        require.config({
            'modules': {
                'x/x': {
                    requires: ['x/y']
                }
            }
        });

        require.config('packages', {
            x: {
                base: '/tests/specs/packages-modules/x'
            }
        });

        require(['x/x'], function (X) {
            expect(X).to.be.equal(8);
            done();
        });
    });

    it('package can has same path', function (done) {
        require.config({
            packages: {
                y: {
                    base: '/tests/specs/packages-modules/y'
                },
                z: {
                    base: '/tests/specs/packages-modules/z'
                }
            }
        });

        require(['y/y', 'z/z'], function (y, z) {
            try {
                expect(y).to.be.equal(2);
                expect(z).to.be.equal(1);
            } catch (e) {
                done(e);
            }
            done();
        });
    });
});