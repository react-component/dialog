/*jshint quotmark:false*/
/*global $*/

describe('css-combo', function () {
    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', true);
    });

    it('works for css and js', function (done) {
        $('<div>' +
            '<div class="test2"></div>' +
            '<div class="test1"></div>' +
            '</div>').appendTo('body');

        require.config({
            packages: {
                x: {
                    base: '/tests/specs/css-combo/x'
                }
            },
            modules: {
                'x/x1': {
                    requires: ['x/x2', 'x/x1.css']
                },
                'x/x2': {
                    requires: ['x/x2.css']
                }
            }
        });

        require(['x/x1'], function (X1) {
            expect(X1).to.be.equal(2);

            expect($('.test1').css('font-size')).to.be.equal('20px');
            expect($('.test2').css('font-size')).to.be.equal('30px');
            $('link[href*="x2.css"]').remove();
            $('link[href*="x1.css"]').remove();
            done();
        });
    });

    it('works for css and js when taged', function (done) {
        var mx = modulex;

        $('<div>' +
            '<div class="test2"></div>' +
            '<div class="test1"></div>' +
            '</div>').appendTo('body');

        require.config({

            packages: {
                x: {
                    tag: mx.Loader.Utils.now(),
                    base: '/tests/specs/css-combo/x'
                }
            },
            modules: {
                'x/x1': {
                    requires: ['x/x1.css', 'x/x2']
                },
                'x/x2': {
                    requires: ['x/x2.css']
                }
            }
        });

        require(['x/x1'], function (X1) {
            expect(X1).to.be.equal(2);

            expect($('.test1').css('font-size')).to.be.equal('20px');
            expect($('.test2').css('font-size')).to.be.equal('30px');
            done();
        });
    });
});