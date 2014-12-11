/**
 * test loader
 * @author yiminghe@gmail.com
 */
/*jshint quotmark:false*/
/*global $*/

(function (mx) {
    var d = '/tests/specs/loader-simple';
    var run = function (combine) {
        describe('loader-simple ' + (combine ? 'at combo mode' : ''), function () {
            beforeEach(function () {
                modulex.clearLoader();
                require.config('combine', !!combine);
            });

            it(' modulex.requirenot to attach', function () {
                var runned = 0;
                mx.add('z', ['d'], function (require) {
                    require('d');
                    runned = 1;
                    return 1;
                });
                expect(mx.require('z')).to.be.equal(undefined);
                expect(runned).to.be.equal(0);
            });

            it('should load and attach custom mods correctly', function (done) {
                require.config({
                    packages: {
                        '1.2': {
                            tag: mx.Loader.Utils.now(),
                            base: d + '/1.2' //包对应路径，相对路径指相对于当前页面路径
                        }
                    }
                });

                $(document.body).append('<div id="k11x"/>');
                $(document.body).append('<div id="k12"/>');

                mx.use(['1.2/mod'], function (Mod) {
                    var ee;
                    try {
                        expect(Mod).to.be.equal(2);
                        expect(mx.require('1.2/mod')).to.be.equal(Mod);
                        var mod12;
                        var flag = mx.config('combine') ? '1.2/??mod.js' : '1.2/mod.js';
                        var scripts = document.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            var script = scripts[i];
                            if (script.src.indexOf(flag) > -1) {
                                mod12 = script;
                                break;
                            }
                        }
                        expect(mod12.async).to.be.equal(true);
                        expect(mod12.charset).to.be.equal('utf-8');
                        expect($('#k12').css('width')).to.be.equal('111px');
                    } catch (e) {
                        ee = e;
                    }
                    done(ee);
                });
            });
        });
    };
    if (!window.callPhantom) {
        run();
        run(1);
    }
})(modulex);

