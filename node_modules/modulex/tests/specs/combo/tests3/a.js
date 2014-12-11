define("tests3/a", function (b) {
    return b + 3;
}, {
    requires:['./b']
});