var expect = require('expect.js');
var modulex = require('../../../build/modulex-nodejs');
var path = require('path');

describe('modulex', function () {
    it('use works in nodejs', function (done) {
        modulex.config('packages', {
            'test': {
                base: path.resolve(__dirname, '../fixture')
            }
        });
        modulex.use(['test/m1'], function (m1) {
            var ee;
            try {
                expect(m1).to.be(2);
            } catch (e) {
                ee = e;
            }
            done(ee);
        });
    });

    it('nodeRequire works in nodejs', function () {
        modulex.config('packages', {
            'test2': {
                base: path.resolve(__dirname, '../fixture')
            }
        });
        expect(modulex.nodeRequire('test2/m1')).to.be(2);
    });
});