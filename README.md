# @rc-component/dialog

react dialog component.

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

[npm-image]: https://img.shields.io/npm/v/@rc-component/dialog.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@rc-component/dialog
[travis-image]: https://img.shields.io/travis/react-component/dialog/master?style=flat-square
[travis-url]: https://travis-ci.com/react-component/dialog
[github-actions-image]: https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml/badge.svg
[github-actions-url]: https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/dialog/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/react-component/dialog
[david-url]: https://david-dm.org/react-component/dialog
[david-image]: https://david-dm.org/react-component/dialog/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/dialog?type=dev
[david-dev-image]: https://david-dm.org/react-component/dialog/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/@rc-component/dialog.svg?style=flat-square
[download-url]: https://npmjs.org/package/@rc-component/dialog
[bundlephobia-url]: https://bundlephobia.com/package/@rc-component/dialog
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@rc-component/dialog
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square


## Screenshot

<img src="http://gtms04.alicdn.com/tps/i4/TB1dp5lHXXXXXbmXpXXyVug.FXX-664-480.png" />

## Example

http://localhost:8007/examples/

online example: https://dialog.react-component.vercel.app/

## Install

[![@rc-component/dialog](https://nodei.co/npm/@rc-component/dialog.png)](https://npmjs.org/package/@rc-component/dialog)

## Usage

```js
var Dialog = require('@rc-component/dialog');

ReactDOM.render(
  <Dialog title={title} onClose={callback1} visible>
      <p>first dialog</p>
  </Dialog>
), document.getElementById('t1'));

// use dialog
```

## API

### @rc-component/dialog

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| prefixCls | String | rc-dialog | The dialog dom node's prefixCls |  |
| className | String |  | additional className for dialog |  |
| classNames | { header?: string; body?: string; footer?: string; mask?: string; content?: string; wrapper?: string; } |  | pass className to target area |  |
| styles | { header?: CSSProperties; body?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; content?: CSSProperties; wrapper?: CSSProperties; } |  | pass styles to target area |  |
| style | Object | {} | Root style for dialog element.Such as width, height |  |
| zIndex | Number |  |  |  |
| visible | Boolean | false | current dialog's visible status |  |
| animation | String |  | part of dialog animation css class name |  |
| maskAnimation | String |  | part of dialog's mask animation css class name |  |
| transitionName | String |  | dialog animation css class name |  |
| maskTransitionName | String |  | mask animation css class name |  |
| title | String\|React.Element |  | Title of the dialog |  |
| footer | React.Element |  | footer of the dialog |  |
| closable | Boolean \| ({ closeIcon?: React.ReactNode; disabled?: boolean, afterClose:function } & React.AriaAttributes) | true | whether show close button |  |
| mask | Boolean | true | whether show mask |  |
| maskClosable | Boolean | true | whether click mask to close |  |
| keyboard | Boolean | true | whether support press esc to close |  |
| mousePosition | {x:number,y:number} |  | set pageX and pageY of current mouse(it will cause transform origin to be set). |  |
| onClose | function() |  | called when click close button or mask |  |
| afterClose | function() |  | called when close animation end |  |
| getContainer | function(): HTMLElement |  | to determine where Dialog will be mounted |  |
| destroyOnHidden | Boolean | false | to unmount child compenents on onClose |  |
| closeIcon | ReactNode |  | specific the close icon. |  |
| forceRender | Boolean | false | Create dialog dom node before dialog first show |  |
| focusTriggerAfterClose | Boolean | true | focus trigger element when dialog closed |  |
| modalRender | (node: ReactNode) => ReactNode |  | Custom modal content render | 8.3.0 |

## Development

```
npm install
npm start
```

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

@rc-component/dialog is released under the MIT license.


## 🤝 Contributing 

<a href="https://openomy.app/github/react-component/dialog" target="_blank" style="display: block; width: 100%;" align="center">
  <img src="https://www.openomy.app/svg?repo=react-component/dialog&chart=bubble&latestMonth=24" target="_blank" alt="Contribution Leaderboard" style="display: block; width: 100%;" />
</a>
