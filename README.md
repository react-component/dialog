# rc-dialog
---

react dialog component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-dialog)](https://saucelabs.com/u/rc-dialog)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-dialog.svg)](https://saucelabs.com/u/rc-dialog)

[npm-image]: http://img.shields.io/npm/v/rc-dialog.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dialog
[travis-image]: https://img.shields.io/travis/react-component/dialog.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/dialog
[coveralls-image]: https://img.shields.io/coveralls/react-component/dialog.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/dialog?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/dialog.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/dialog
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-dialog.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-dialog

## Screenshot

<img src="http://gtms04.alicdn.com/tps/i4/TB1dp5lHXXXXXbmXpXXyVug.FXX-664-480.png" />

## Install

[![rc-dialog](https://nodei.co/npm/rc-dialog.png)](https://npmjs.org/package/rc-dialog)

## Usage

```js
var Dialog = require('rc-dialog');

  React.renderComponent(
      (<Dialog title={title} onClose={callback1} onShow={callback2}>
        <p>first dialog</p>
      </Dialog>),
      document.getElementById('t1')
  );
  
// use dialog
```

## API 

### props

#### prefixCls
  * The dialog dom node's prefixCls. Defaults to `rc-dialog`

#### visible 
  * The dialog whether or not shown,default false

#### renderToBody
  * whether render dialog to body. default true

#### animation
  * part of dialog animation css class name

#### maskAnimation
  * part of dialog's mask animation css class name

#### transitionName
  * dialog animation css class name

#### maskTransitionName
  * dialog's mask animation css class name

#### title
  * Title of the dialog

#### footer
  * footer of the dialog

#### closable
  * whether show close button and click mask to close

#### onBeforeClose
  * called by requestClose or click close button or mask

#### onShow 
  * When the dialog shown , the callback was called.

#### onClose 
  * When the dialog closed, the callback was called.

#### align

  * align config. see https://github.com/yiminghe/dom-align

```js
{
  node: // defaults to window,
  points: ['tc', 'tc'],
  offset: [0, 100]
}
```

### methods (not recommended)

#### show
  * make dialog show and trigger onShow if current visible is false

#### close
  * make dialog hide and trigger onClose if current visible is true

#### requestClose
  * run props.beforeClose first, if beforeClose does not return false then call close()

## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/index.md

online example: http://react-component.github.io/dialog/build/examples/

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-dialog is released under the MIT license.