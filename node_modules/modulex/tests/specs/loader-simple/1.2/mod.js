define('1.2/mod', function (D) {
    expect(this.getUri().replace(/\?.+$/, ''))
        .to.be.equal('http://' + location.host + '/tests/specs/loader-simple/1.2/mod.js');
    return D + 1;
}, {
    requires: ['./dep', './mod.css']
});