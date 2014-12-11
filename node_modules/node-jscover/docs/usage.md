# 使用 node-jscover 做测试覆盖率检测

[node-jscover](https://github.com/yiminghe/node-jscover) 是 [jscover](https://github.com/tntim96/JSCover) 的 javascript 实现，通过和 nodejs 结合，特别是通过配合 nodejs server 的拦截功能可以很方便得做测试覆盖率检测

## 安装

在根目录执行 npm install express node-jscover node-jscover-handler --save-dev

## on fly intrument

node-jscover 提供了 express 的中间件 [node-jscover-handler](https://github.com/yiminghe/node-jscover-handler) 可以对请求的源码进行动态 instrument.

例如源代码地址为 localhost/i18n.js，文件内容为
```javascript
modulex.add('i18n', {
    alias: function (mx, name) {
        return name + '/i18n/' + mx.Config.lang;
    }
});
```

那么可以访问一个实际不存在的文件 localhost/i18n-coverage.js 或 localhost/_node_jscover/i18n.js 得到 nodejs-cover 动态 instrument 的脚本:
```javascript
if (! _$jscoverage['lib/i18n.js']) {
  _$jscoverage['lib/i18n.js'] = {};
  _$jscoverage['lib/i18n.js'].lineData = [];
  _$jscoverage['lib/i18n.js'].lineData[6] = 0;
  _$jscoverage['lib/i18n.js'].lineData[8] = 0;
}
if (! _$jscoverage['lib/i18n.js'].functionData) {
  _$jscoverage['lib/i18n.js'].functionData = [];
  _$jscoverage['lib/i18n.js'].functionData.index = [];
  _$jscoverage['lib/i18n.js'].functionData[0] = 0;
  _$jscoverage['lib/i18n.js'].functionData.index[0] = ['alias',7,12];
}
if (! _$jscoverage['lib/i18n.js'].branchData) {
  _$jscoverage['lib/i18n.js'].branchData = {};
}
_$jscoverage['lib/i18n.js'].lineData[6]++;
modulex.add('i18n', {
  alias: function (mx, name) {
    _$jscoverage['lib/i18n.js'].functionData[0]++;
    _$jscoverage['lib/i18n.js'].lineData[8]++;
    return name + '/i18n/' + mx.Config.lang;
  }
});
```

中间件使用起来也很简单:

``` javascript
var app = require('express')();
// 动态 instrument -coverage 结尾的 js 文件 或 /_node_jscover/ 开头的 url
app.use(require('node-jscover-handler')());
app.listen(8000);
```

## 测试覆盖率结果的简单展示

首先需要修改测试驱动页面 runner.html 引入 node-jscover 前端资源以及 instrument 后的脚本文件和测试框架的报告文件，例如 mocha （jasmine也类似）：

``` html
<!-- jscover 前端资源-->
<script src="/node_modules/node-jscover/lib/front-end/header.js"></script>
<script src="/node_modules/node-jscover/lib/front-end/jscoverage-branch.js"></script>

<!-- instrumented 源码文件-->
<script src="/lib/i18n-coverage.js"></script>

<!-- mocha 以及 node-jscover 的适配报告 -->
<script src='/node_modules/chai/chai.js'></script>
<script src='/node_modules/mocha/mocha.js'></script>
<script src='/node_modules/node-jscover/lib/reporters/mocha/console.js'></script>
```

那么当 runner.html 执行完毕后可以在控制台看到测试覆盖率的数据展示，例如

![node-jscover-console](http://gtms03.alicdn.com/tps/i3/TB1RuKDFVXXXXXVaXXXZjoG1FXX-1075-323.png)

## 测试覆盖率结果的详细展示

如果想要更详细的结果可以访问 jscover 的前端展示页面，例如

http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

结果的详细展示：

![info](http://gtms01.alicdn.com/tps/i1/TB1R07.FFXXXXbCapXXwzFUMpXX-1042-366.png)

![info](http://gtms03.alicdn.com/tps/i3/TB1o.ecFVXXXXc_aXXXC0hr.VXX-983-381.png)

## 和 coveralls 的整合

node-jscover 通过通过中间件还可以整合 coveralls，首先配置 coveralls 为 github 的 hook。然后使用 [node-jscover-coveralls](https://github.com/yiminghe/node-jscover-coveralls) 来处理和 coveralls 服务器的交互。


服务器端加入该中间件，例如：
```javascript
app.use(require('node-jscover-coveralls')());
```

runner.html 加入 report 逻辑：

```html
<script src='/node_modules/node-jscover-coveralls/lib/reports/mocha.js'></script>
<script>
(function () {
        var runner;
        if (window.mochaPhantomJS) {
            runner = mochaPhantomJS.run();
            window.nodeJsCoverCoveralls(runner);
        } else {
            runner = mocha.run();
        }
    })();
</script>
```

之后配合 [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs) 和 [travis](travis-ci.org) 就可以在提交文件后将测试覆盖率结果发动到 coveralls了，例如：
[https://coveralls.io/r/kissyteam/modulex?branch=master](https://coveralls.io/r/kissyteam/modulex?branch=master)