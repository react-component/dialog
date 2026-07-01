<div align="center">
  <h1>@rc-component/dialog</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>💬 A composable dialog component for React.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/dialog"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/dialog.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/dialog"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/dialog.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/dialog"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/dialog/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/dialog"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/dialog?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

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
ut install
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
ut install
npm start
```

The dumi site runs at `http://localhost:8000` by default.

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
