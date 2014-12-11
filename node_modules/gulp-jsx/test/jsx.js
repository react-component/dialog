var expect = require('expect.js');
var File = require('vinyl');
var jsx = require('..');

function performTransformTest(filename, done) {
  var stream = jsx({
    jsx: "virtualdom.h",
    ignoreDocblock: true
  });

  var file = new File({
    cwd: "",
    base: "",
    path: filename,
    contents: new Buffer("<div></div>", 'utf8')
  });

  stream.on('data', function(chunk) {
    expect(chunk).to.equal(file);
  });

  stream.on('end', function() {
    expect(file.contents.toString()).to.contain("virtualdom.h('div");
    done();
  });

  stream.write(file);
  stream.end();
}

describe('gulp-jsx', function() {
  it('returns passthrough stream', function() {
    var stream = jsx();
    expect(stream).to.have.property('on');
    expect(stream).to.have.property('write');
    expect(stream).to.have.property('end');
  });

  it('transforms js files in stream', function(done) {
    performTransformTest("some.js", done);
  });

  it('works with .jsx files', function(done) {
    performTransformTest("some.jsx", done);
  });
});
