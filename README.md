<div align="center">
  <h1>@rc-component/dialog</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>💬 A composable dialog component for React.</p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


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

## Highlights

- Supports controlled visibility, mask, keyboard close, and focus restoration.
- Allows custom title, footer, close icon, container, motion, and modal content rendering.
- Provides semantic `classNames` and `styles` hooks for the dialog structure.
- Ships compiled JavaScript, TypeScript definitions, and CSS assets.

## Install

```bash
npm install @rc-component/dialog
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

| Property | Description | Type | Default |
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

## Development

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

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/dialog is released under the [MIT](./LICENSE) license.
