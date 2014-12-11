modulex.clearLoader = function () {
    var self = this;
    var mods = self.Env.mods;
    var keys = [];
    for (var m in mods) {
        if (m !== 'i18n') {
            keys.push(m);
        }
    }
    for (var i = 0, l = keys.length; i < l; i++) {
        delete mods[keys[i]];
    }
    self.config({
        onModuleError: false,
        afterModuleInit: false,
        // global config
        tag: false,
        group: false,
        packages: false
    });
};