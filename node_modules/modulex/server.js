var gutil = require('gulp-util');
var express = require('express');
var jscoverHandler = require('node-jscover-handler');
var jscoverCoveralls = require('node-jscover-coveralls');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var comboHandler = require('combo-handler');
var path = require('path');
var app = express();
var cwd = require('path').normalize(process.cwd());
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(comboHandler());
app.use(jscoverCoveralls());
app.use(function (req, res, next) {
    if (path.extname(req.path) === '.jss') {
        require(path.resolve(__dirname, req.path.substring(1)))(req, res);
    } else {
        next();
    }
});
app.use(jscoverHandler());
app.use(serveIndex(cwd, {
    hidden: true,
    view: 'details'
}));
app.use(serveStatic(cwd));
var port = process.env.PORT || 8000;
app.listen(port);
gutil.log('server start at ' + port);