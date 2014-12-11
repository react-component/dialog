var run = function (combine) {
  /*jshint quotmark:false*/
  describe("can require absolute module " + (combine ? 'at combo mode' : ''), function () {
    var mx = modulex;
    beforeEach(function () {
      modulex.clearLoader();
      require.config('combine', !!combine);
    });
    it("should works for /", function (done) {
      require(['/tests/specs/absolute-module/a.js'], function (a) {
        expect(a).to.be(2);
        done();
      })
    });

    it("should works for .", function (done) {
      require(['./specs/absolute-module/a'], function (a) {
        expect(a).to.be(2);
        done();
      })
    });

    it("should works for http://", function (done) {
      require(['http://localhost:8000/tests/specs/absolute-module/a.js'], function (a) {
        expect(a).to.be(2);
        done();
      })
    });
  });
};
run();
run(1);