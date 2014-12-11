describe('importStyle', function () {
    beforeEach(function () {
        modulex.clearLoader();
    });

    it('works', function () {
        require.config({
            'packages': {
                'a': {
                    combine: true,
                    base: '/a'
                },
                'b': {
                    base: '/b'
                }
            },
            'modules': {
                'a/a1.css': {
                    requires: ['./a2.css', './a3']
                },
                'b/b1.css': {
                    requires: ['b/b2.css']
                }
            }
        });
        var uris = modulex.importStyle(['a/a1.css', 'b/b1.css'], true).css;
        expect(uris.length).to.be(3);
        expect(uris[0].uri).to.be('http://localhost:8000/a/??a1.css,a2.css');
        expect(uris[1].uri).to.be('http://localhost:8000/b/b1.css');
        expect(uris[2].uri).to.be('http://localhost:8000/b/b2.css');
        expect(modulex.Env.mods['a/a3'].status).to.be(modulex.Loader.Status.UNLOADED);
        expect(modulex.Env.mods['a/a1.css'].status).to.be(modulex.Loader.Status.INITIALIZED);
    });
});