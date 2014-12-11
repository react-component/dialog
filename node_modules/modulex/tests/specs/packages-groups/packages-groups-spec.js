/**
 * tc for support group combo for package
 * @author 阿古
 */
/*jshint quotmark:false*/

describe('modules and groups', function () {
    var mx = modulex,
        Utils = mx.Loader.Utils,
        ComboLoader = mx.Loader.ComboLoader;

    beforeEach(function () {
        modulex.clearLoader();
        require.config('combine', true);
    });

    it('combo packages', function () {
        require.config({
            packages: {
                'pkg-a': {
                    group: 'my',
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'pkg-b': {
                    group: 'my',
                    base: '/tests/specs/packages-groups/pkg-b'
                },
                'pkg-c': {
                    base: '/tests/specs/packages-groups/pkg-c'
                }
            },
            modules: {
                'pkg-a/a': {
                    requires: ['pkg-b/b', 'pkg-c/c']
                }
            }
        });
        var l = new ComboLoader();
        var r = l.calculate(Utils.createModules(['pkg-a/a', 'pkg-c/c']));
        var c = l.getComboUris(r);
        var js = c.js;
        expect(js.length).to.be.equal(2);
        expect(js[0].uri.substring(js[0].uri.indexOf('??')))
            .to.be.equal('??c.js');
        expect(js[1].uri.substring(js[1].uri.indexOf('??')))
            .to.be.equal('??pkg-a/a.js,pkg-b/b.js');
    });

    it('works', function (done) {
        require.config({
            packages: {
                'pkg-a': {
                    group: 'my',
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'pkg-b': {
                    group: 'my',
                    base: '/tests/specs/packages-groups/pkg-b'
                },
                'pkg-c': {
                    base: '/tests/specs/packages-groups/pkg-c'
                }
            },
            modules: {
                'pkg-a/a': {
                    requires: ['pkg-b/b', 'pkg-c/c']
                }
            }
        });

        require(['pkg-a/a'], function (r) {
            expect(r).to.be.equal(5);
            done();
        });
    });

    it('combo packages which have no combo prefix', function () {
        var l = new ComboLoader();

        require.config({
            packages: {
                'pkg-a': {
                    group: 'my',
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'test': {
                    group: 'my',
                    base: 'http://g.tbcdn.cn/test'
                }
            },
            modules: {
                'pkg-a/a': {},
                'test/x': {}
            }
        });

        var r = l.calculate(Utils.createModules(['pkg-a/a', 'test/x']));
        var c = l.getComboUris(r);
        var js = c.js;
        expect(js.length).to.be.equal(2);
        expect(js[0].uri.substring(js[0].uri.indexOf('??')))
            .to.be.equal('??a.js');
        expect(js[1].uri).to.be.equal('http://g.tbcdn.cn/test/??x.js');
    });

    it('combo packages with different charset', function () {
        var l = new ComboLoader();

        require.config({
            packages: {
                'pkg-a': {
                    group: 'my',
                    charset: 'utf-8',
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'pkg-b': {
                    group: 'my',
                    charset: 'gbk',
                    base: '/tests/specs/packages-groups/pkg-b'
                }
            },
            modules: {
                'pkg-a/a': {
                    requires: ['pkg-b/b']
                }
            }
        });

        var r = l.calculate(Utils.createModules(['pkg-a/a']));
        var c = l.getComboUris(r);
        var js = c.js;
        expect(js.length).to.be.equal(2);
        expect(js[0].uri.substring(js[0].uri.indexOf('??')))
            .to.be.equal('??a.js');
        expect(js[1].uri.substring(js[1].uri.indexOf('??')))
            .to.be.equal('??b.js');
    });

    it('can perform 3 package combo', function () {
        require.config({
            group: 'my',
            packages: {
                'pkg-a': {
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'pkg-b': {
                    base: '/tests/specs/packages-groups/pkg-b'
                },
                'pkg-c': {
                    base: '/tests/specs/packages-groups/pkg-c'
                }
            },
            modules: {
                'pkg-a/a': {
                    requires: ['pkg-b/b', 'pkg-c/c']
                }
            }
        });

        var l = new ComboLoader();
        var r = l.calculate(Utils.createModules(['pkg-a/a', 'pkg-c/c']));
        var c = l.getComboUris(r);
        var size = 0;
        for (var i in c) {
            size++;
            i = 0;
        }
        expect(size).to.be.equal(1);
        var js = c.js;
        expect(js.length).to.be.equal(1);
        expect(js[0].uri.substring(js[0].uri.indexOf('??')))
            .to.be.equal('??pkg-a/a.js,pkg-b/b.js,pkg-c/c.js');

    });

    it('can skip cross origin package combo', function () {
        if (location.hostname !== 'localhost') {
            return;
        }

        var uri = 'http://localhost:9999/src/loader/tests/specs/packages-groups';
        require.config({
            group: 'my',
            packages: {
                'pkg-a': {
                    base: '/tests/specs/packages-groups/pkg-a'
                },
                'pkg-b': {
                    base: uri + '/pkg-b'
                },
                'pkg-c': {
                    base: '/tests/specs/packages-groups/pkg-c'
                }
            },
            modules: {
                'pkg-a/a': {
                    requires: ['pkg-b/b', 'pkg-c/c']
                }
            }
        });
        var l = new ComboLoader();
        var r = l.calculate(Utils.createModules(['pkg-a/a']));
        var c = l.getComboUris(r);
        expect(c.js.length).to.be.equal(2);
        var js = c.js;
        expect(js[0].uri).to.be.equal('http://localhost:9999/src/loader/tests/specs/packages-groups/pkg-b/??b.js');
        expect(js[1].uri).to.be.equal('http://' + location.host + '/tests/specs/packages-groups/??pkg-a/a.js,pkg-c/c.js');
    });
});