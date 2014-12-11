/*jshint quotmark:false*/
/*global $*/

describe('mod with suffix combo', function () {
    var mx = modulex;
    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', true);
    });

    it('can load mod with a suffix when combo loader', function (done) {
        require.config({
            packages: {
                suffix: {
                    base: '/tests/specs/suffix'
                }
            },
            modules: {
                'suffix/a-tpl': {
                    requires: ['./a-tpl.css']
                }
            }
        });

        $('<div id="suffix-test"></div>').appendTo('body');

        mx.use(['suffix/a-tpl'], function (A) {
            expect(A).to.be.equal(1);
            expect($('#suffix-test').css('font-size')).to.be.equal('77px');
            done();
        });
    });
});