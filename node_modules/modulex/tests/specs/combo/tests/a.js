define("tests/a", function (b) {
    return b + 3;
}, {
    requires:['./b']
});