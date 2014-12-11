var path = require('path');
var fs = require('fs');

module.exports = function (dir, option) {
    dir = dir || process.cwd();
    option = option||{};
    var reactTools = option.reactTools;
    return function* (next) {
        var fileType = (this.url.match(/\.(js)$/) || []).shift();
        if (fileType) {
            var file, content = this.body;
            if(!content) {
                file = path.join(dir, this.url);
                if (!fs.existsSync(file)) {
                    return yield *next;
                }
                content = fs.readFileSync(file, 'utf-8');
            }
            if (!/\/\*\*(\s)@jsx/.test(content.split('\n')[0])) {
                yield *next;
            } else {
                content = reactTools.transform(content, {});
                this.set('Content-Type', 'application/javascript;charset=utf-8');
                this.set('Content-Length', Buffer.byteLength(content));
                this.body = content;
                if(option.next && option.next.call(this)) {
                    yield * next;
                }
            }
        } else {
            yield *next;
        }
    };
};
