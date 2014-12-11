define('alias-a/b', function (d) {
    expect(d).to.be.equal('alias-a/d/e');
    return 'alias-a/b';
}, {
    requires: ['alias-a/d']
});