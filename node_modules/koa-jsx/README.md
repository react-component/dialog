# koa-jsx

koa middleware for transforming jsx of react


## usage

```javascript
var koa = require('koa');
var jsx= require('koa-jsx');
app.use(jsx(__dirname,{
  reactTools: require('react-tools')
}));
```

## api

#### jsx

middleware for koa

```javascript
GeneratorFunction jsx(dir:String, option: Object)
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
          <td>load js file at path (dir + url),
              if this file's first line contains /** @jsx React.DOM */,
              then transform its content into normal javascript and output to browser.</td>
      </tr>
      <tr>
          <td>option</td>
          <td>Object</td>
          <td>option config</td>
      </tr>
      <tr>
          <td>option.reactTools</td>
          <td>Object</td>
          <td>require('react-tools') module exports</td>
      </tr>
    </tbody>
</table>