# koa-node-jscover

koa middleware for instrument code using node-jscover

## usage

```
var app = koa();
var koaNodejsCover = require('koa-node-jscover');
app.use(koaNodeJscover({
    jscover:require('node-jscover')
}));
```
