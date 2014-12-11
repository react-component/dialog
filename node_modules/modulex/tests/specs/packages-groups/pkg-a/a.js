define("pkg-a/a", function (b, c) {
    return b + c;
}, {
    requires: ['pkg-b/b', 'pkg-c/c']
});