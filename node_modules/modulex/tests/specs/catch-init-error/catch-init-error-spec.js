describe('module init error', function () {
    beforeEach(function () {
        modulex.clearLoader();
        modulex.Config.debug = 0;
        require.config({
            onModuleError: function () {
            },
            'packages': {
                err: {
                    base: '/tests/specs/catch-init-error/mods'
                }
            }});
    });
    afterEach(function () {
        modulex.Config.debug = 1;
    });
    it('will catch module initialize error', function (done) {
        require('err/a', {
            success: function () {

            }, error: function (e2, e1) {
                expect(e2.id).to.be('err/a-b-c');
                expect(e1.id).to.be('err/a-d');
                expect(e2.error.type).to.be('init');
                expect(e1.error.type).to.be('init');
                done();
            }});
    });
});