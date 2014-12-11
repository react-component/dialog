var through = require('through2').obj;
var jsx = require('jsx-transform');

module.exports = function(options) {
  var options = options || {};
  
  return through(function write (file, enc, next) {
    if (file.isNull()) return next(null, file);

    if (file.path.match(options.match || /jsx?$/i)) {
      if (file.isStream()) {
        var data = '';
        file.contents.on('data', function(chunk) {
          data += chunk.toString('utf8');
          console.log(data);
        });
        file.contents.on('end', function() {
          file.contents = jsx.transform(data, options);
          next();
        });
        return this.push(file);
      }

      if (file.isBuffer()) {
        file.contents = new Buffer(
          jsx.transform(file.contents.toString('utf8'), options)
        );
      }
    }

    this.push(file);

    next();
  });
};
