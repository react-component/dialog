module.exports = function (req, res) {
    setTimeout(function () {
        res.set('Content-Type', 'text/javascript');
        res.send('define(function(){});');
    }, 5000);
};
