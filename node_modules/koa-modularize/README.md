# koa-modularize

koa middleware for transforming commonjs file into browser module format


## usage

```javascript
var koa = require('koa');
var jsx= require('koa-modularize');
app.use(modularize(__dirname,{
}));
```

## api

#### jsx

middleware for koa

```javascript
GeneratorFunction modularize(dir:String, option: Object)
```

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>dir</td>
          <td>String</td>
          <td>load js from this.body or file at path (dir + url), then add define header for browser loader library</td>
      </tr>
      <tr>
          <td>option</td>
          <td>Object</td>
          <td>option config</td>
      </tr>
      <tr>
          <td>option.next</td>
          <td>Function</td>
          <td>request handler will call this function to judge whether yield next</td>
      </tr>
    </tbody>
</table>