if(!window.callPhantom) {
    describe('mod with suffix', function () {
        var mx = modulex;

        beforeEach(function () {
            modulex.clearLoader();
            require.config('combine', false);
        });

        it('can load mod with a suffix when simple loader', function (done) {
            require.config({
                packages: {
                    suffix: {
                        base: '/tests/specs/suffix'
                    }
                }
            });

            $('<div id="suffix-test"></div>').appendTo('body');

            mx.use(['suffix/a-tpl'], function (A) {
                var ee;
                try {
                    expect(A).to.be.equal(1);
                    expect($('#suffix-test').css('font-size')).to.be.equal('77px');
                } catch (e) {
                    ee = e;
                }
                done(ee);
            });
        });
    });
}