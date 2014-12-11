/*jshint quotmark:false*/

describe('ComboLoader', function () {
    var mx = modulex,
        Utils = mx.Loader.Utils,
        host = location.host;

    beforeEach(function () {
        mx.clearLoader();
        mx.config('combine', true);
    });

    it('can combo test and not combo modulex', function (done) {
        mx.config({
            combine: false,
            packages: {
                tests3: {
                    combine: true,
                    base: '/tests/specs/combo/tests3'
                }
            }
        });

        mx.config('modules', {
            'tests3/a': {
                requires: ['./b']
            },
            'tests3/b': {
                requires: ['./c']
            }
        });

        mx.use(['tests3/b'], function (c) {
            expect(c).to.be.equal(3);
            done();

        });
    });

    it('can combine combo and non combo', function (done) {
        mx.config({
            packages: {
                'no-combo': {
                    combine: false,
                    base: '/tests/specs/combo/no-combo'
                }
            }
        });
        mx.use(['no-combo/a'], function (a) {
            expect(a).to.be.equal(2);
            done();
        });
    });

    it('should works simply', function (done) {
        mx.config({
            packages: {
                tests3: {
                    base: '/tests/specs/combo/tests3'
                }

            }
        });

        mx.config('modules', {
            'tests3/a': {
                requires: ['./b']
            },
            'tests3/b': {
                requires: ['./c']
            }
        });

        mx.use(['tests3/b'], function (c) {
            var a = 2444;
            expect(c).to.be.equal(3);
            // do not queue for loaded module
            mx.use(['tests3/b'], function () {
                a = 1;
            });
            expect(a).to.be.equal(1);
            done();
        });
    });

    it('should calculate rightly', function () {
        var l = new mx.Loader.ComboLoader();

        mx.config('packages', {
            test: {
                base: 'http://a/'
            }
        });

        mx.config('modules', {
            'test/a': {
                requires: ['./b', './c']
            },
            'test/b': {
                requires: ['./d', './e']
            },
            'test/d': {
                requires: ['./f', './g']
            },
            'test/h': {
                requires: ['./a', './m']
            }
        });

        var r;
        r = l.calculate(Utils.createModules(['test/a', 'test/h']));
        var c = l.getComboUris(r);
        expect(c.js[0].uri).to.be.equal('http://a/??a.js,b.js,d.js,f.js,g.js,e.js,c.js,h.js,m.js');

    });

    it('should trunk uri by comboMaxFileNum config rightly', function () {
        var comboMaxFileNum = mx.config('comboMaxFileNum');

        mx.config('comboMaxFileNum', 2);

        mx.config('packages', {
            a: {
                base: 'http://a/'
            }
        });

        var l = new mx.Loader.ComboLoader();

        mx.config('modules', {
            'a/a': {
                requires: ['a/b', 'a/c']
            },
            'a/b': {
                requires: ['a/d', 'a/e']
            }
        });

        var r;
        r = l.calculate(Utils.createModules(['a/a', 'a/b']));
        var c = l.getComboUris(r);
        var js = c.js;
        expect(js.length).to.be.equal(3);
        expect(js[0].uri).to.be.equal('http://a/??a.js,b.js');
        expect(js[1].uri).to.be.equal('http://a/??d.js,e.js');
        expect(js[2].uri).to.be.equal('http://a/??c.js');

        mx.config('comboMaxFileNum', comboMaxFileNum);
    });

    it('should trunk uri by comboMaxUriLength automatically', function () {
        mx.config({
            'comboMaxFileNum': 9999,
            base: '/tests/',
            packages: {
                core: {
                    filter: 'debug'
                }
            }
        });

        var x = {};
        var k = 3000;

        for (var i = 0; i < 100; i++) {
            var r2 = [];
            for (var j = 0; j < 5; j++) {
                r2.push('y' + (k++));
            }
            x['y' + i] = {
                requires: r2
            };
        }

        var l = new mx.Loader.ComboLoader();

        mx.config('modules', x);

        var ret = [];
        for (i = 0; i < 100; i++) {
            ret.push('y' + i);
        }
        var r;
        r = l.calculate(Utils.createModules(ret));
        var c = l.getComboUris(r);
        var cjs = c.js;
        expect(cjs.length).to.be.equal(5);
        mx.Loader.Utils.each(cjs, function (j) {
            expect(j.uri.length).not.to.above(mx.Config.comboMaxUriLength);
        });
    });

    it('should works for packages', function (done) {
        mx.config({
            packages: {
                tests: {
                    base: '/tests/specs/combo/tests'
                }

            }
        });
        mx.config('modules', {
            'tests/a': {
                requires: ['./b']
            },
            'tests/b': {
                requires: ['./c']
            }
        });

        var loader = new mx.Loader.ComboLoader();
        var mods = loader.calculate(Utils.createModules(['tests/a']));
        var uris = loader.getComboUris(mods);
        var host = location.host;

        expect(uris.js[0].uri)
            .to.be.equal('http://' + host + '/tests/specs/combo/' +
                'tests/??a.js,b.js,c.js');

        // remote fetch
        mx.clearLoader();
        mx.config({
            packages: {
                tests: {
                    base: '/tests/specs/combo/tests'
                }

            }
        });
        mx.config('modules', {
            'tests/a': {
                requires: ['./b']
            },
            'tests/b': {
                requires: ['./c']
            }
        });

        mx.use(['tests/a'], function (a) {
            expect(a).to.be.equal(6);
            done();
        });
    });

    it('should works for multiple use at the same time', function (done) {

        mx.config({
            packages: {
                tests2: {
                    base: '/tests/specs/combo/tests2'
                }

            }
        });
        mx.config('modules', {
            'tests2/a': {
                requires: ['./b']
            },
            'tests2/b': {
                requires: ['./c']
            },
            x: {}
        });

        window.TEST_A = 0;

        var ret = 0;

        mx.use(['tests2/a'], function (a) {
            expect(a).to.be.equal(7);
            ret++;
            if (ret === 2) {
                done();
            }
        });

        mx.use(['tests2/a'], function (a) {
            expect(a + 1).to.be.equal(8);
            ret++;
            if (ret === 2) {
                done();
            }
        });
    });

    it('works for not combo for specified packages', function () {
        window.TIMESTAMP_X = 0;

        mx.config({
            packages: {
                'timestamp': {
                    combine: false,
                    base: '/tests/specs/timestamp'
                }
            },
            modules: {
                'timestamp/x': {
                    requires: ['./z']
                },
                'timestamp/y': {
                    requires: ['./x']
                }
            }
        });

        var loader = new mx.Loader.ComboLoader();

        var allMods = loader.calculate(Utils.createModules(['timestamp/y']));

        var comboUris = loader.getComboUris(allMods);

        var jss = comboUris.js;

        expect(jss[0].uri).to.be.equal('http://' + host + '/tests/specs/timestamp/y.js');
        expect(jss[1].uri).to.be.equal('http://' + host + '/tests/specs/timestamp/x.js');
        expect(jss[2].uri).to.be.equal('http://' + host + '/tests/specs/timestamp/z.js');
    });

    it('should load mod not config', function (done) {
        mx.config({
            packages: {
                tests4: {
                    base: '/tests/specs/combo/tests4'
                }
            }
        });
        mx.use(['tests4/a'], function () {
            done();
        });
    });

    it('can use after another use', function (done) {
        mx.config({
            packages: {
                test5: {
                    base: '/tests/specs/combo/test5'
                }
            }
        });
        mx.config('modules', {
            'test5/a': {
                requires: ['test5/b']
            }
        });
        mx.use(['test5/a'], function (A) {
            expect(A).to.be.equal('test5/a');
            mx.use(['test5/b'], function (B) {
                expect(B).to.be.equal('test5/b');
                done();
            });
        });
    });

    it('optimize common prefix', function () {
        mx.config({
            packages: {
                t: {
                    base: '/t'
                }

            }
        });
        var loader = new mx.Loader.ComboLoader();
        var mods = loader.calculate(Utils.createModules(['t/a/b/a', 't/a/b/b', 't/a/b/c']));
        var uris = loader.getComboUris(mods);
        var host = location.host;
        expect(uris.js[0].uri)
            .to.be.equal('http://' + host + '/t/a/b/??a.js,b.js,c.js');
    });
});