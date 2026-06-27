<div align="center">
  <h1>@rc-component/dialog</h1>
  <p><sub>Ant Design 生态的一部分。</sub></p>
  <img alt="Ant Design" height="32" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  <p>💬 可组合的 React 对话框组件。</p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


<div align="center">

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

</div>

[npm-image]: https://img.shields.io/npm/v/@rc-component/dialog.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@rc-component/dialog
[github-actions-image]: https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml/badge.svg
[github-actions-url]: https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/dialog/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/react-component/dialog
[download-image]: https://img.shields.io/npm/dm/@rc-component/dialog.svg?style=flat-square
[download-url]: https://npmjs.org/package/@rc-component/dialog
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/%40rc-component%2Fdialog?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/@rc-component/dialog
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

## 特性

- 支持 controlled visibility, mask, keyboard close, and focus restoration.
- 支持自定义标题、页脚、关闭图标、容器、动画和弹窗内容渲染。
- 提供 semantic `classNames` and `styles` hooks for the dialog structure.
- 提供编译后的 JavaScript、TypeScript 类型定义和 CSS 资源。

## 安装

```bash
npm install @rc-component/dialog
```

## 使用

```tsx | pure
import Dialog from '@rc-component/dialog';
import '@rc-component/dialog/assets/index.css';

export default function App() {
  return (
    <Dialog title="Dialog" visible onClose={() => {}}>
      <p>Dialog content</p>
    </Dialog>
  );
}
```

## 示例

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

在线演示： https://dialog.react-component.vercel.app/

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | Callback after close animation ends | `() => void` | - |
| animation | Dialog animation name | string | - |
| className | Additional dialog class name | string | - |
| classNames | Semantic class names | `{ header?: string; body?: string; footer?: string; mask?: string; content?: string; wrapper?: string }` | - |
| closable | Whether to show close button, or close button props | boolean \| object | true |
| closeIcon | Custom close icon | `React.ReactNode` | - |
| destroyOnHidden | Unmount children after dialog closes | boolean | false |
| focusTriggerAfterClose | Focus trigger element after close | boolean | true |
| footer | Dialog footer | `React.ReactNode` | - |
| forceRender | Render dialog before it is first shown | boolean | false |
| getContainer | Container where dialog is mounted | `() => HTMLElement` | - |
| keyboard | Whether pressing Esc closes the dialog | boolean | true |
| mask | Whether to show mask | boolean | true |
| maskAnimation | Mask animation name | string | - |
| maskClosable | Whether clicking mask closes the dialog | boolean | true |
| maskTransitionName | Mask transition class name | string | - |
| modalRender | Custom modal content renderer | `(node: React.ReactNode) => React.ReactNode` | - |
| mousePosition | Mouse position used for transform origin | `{ x: number; y: number }` | - |
| prefixCls | Component class name prefix | string | `rc-dialog` |
| scrollLock | Whether to lock body scroll when open | boolean | true |
| style | Root dialog style | `React.CSSProperties` | - |
| styles | Semantic styles | `{ header?: React.CSSProperties; body?: React.CSSProperties; footer?: React.CSSProperties; mask?: React.CSSProperties; content?: React.CSSProperties; wrapper?: React.CSSProperties }` | - |
| title | Dialog title | `React.ReactNode` | - |
| transitionName | Dialog transition class name | string | - |
| visible | Whether the dialog is visible | boolean | false |
| zIndex | Dialog z-index | number | - |
| onClose | Callback when close button or mask is clicked | `(event: React.SyntheticEvent) => void` | - |

## 本地开发

```bash
npm install
npm start
```

```bash
npm test
npm run tsc
npm run lint
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## 许可证

@rc-component/dialog is released under the [MIT](./LICENSE.md) license.
