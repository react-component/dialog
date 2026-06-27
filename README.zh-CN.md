<div align="center">
  <h1>@rc-component/dialog</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
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

- 支持受控可见性、遮罩、键盘关闭和焦点恢复。
- 支持自定义标题、页脚、关闭图标、容器、动画和弹窗内容渲染。
- 为对话框结构提供语义 `classNames` 和 `styles` 挂钩。
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

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | 关闭动画结束后回调 | `() => void` | - |
| 动画片 | 对话框动画名称 | string | - |
| className | 附加对话框className | string | - |
| classNames | 语义className | `{ header?: string; body?: string; footer?: string; mask?: string; content?: string; wrapper?: string }` | - |
| closable | 是否显示关闭按钮，或关闭按钮属性 | boolean \| object | true |
| closeIcon | 自定义关闭图标 | `React.ReactNode` | - |
| destroyOnHidden | 对话框关闭后卸载子项 | boolean | false |
| focusTriggerAfterClose | 关闭后聚焦触发元素 | boolean | true |
| footer | Dialog footer | `React.ReactNode` | - |
| forceRender | 在首次显示之前渲染对话框 | boolean | false |
| getContainer | 装载对话框的容器 | `() => HTMLElement` | - |
| keyboard | 按 Esc 是否关闭对话框 | boolean | true |
| mask | 是否显示面具 | boolean | true |
| maskAnimation | 蒙版动画名称 | string | - |
| maskClosable | 单击蒙版是否关闭对话框 | boolean | true |
| maskTransitionName | 掩码转换className称 | string | - |
| modalRender | 自定义模态内容渲染器 | `(node: React.ReactNode) => React.ReactNode` | - |
| mousePosition | 用于变换原点的鼠标位置 | `{ x: number; y: number }` | - |
| prefixCls | 组件className前缀 | string | `rc-dialog` |
| scrollLock | 打开时是否锁定body滚动 | boolean | true |
| 风格 | 根对话框样式 | `React.CSSProperties` | - |
| styles | Semantic styles | `{ header?: React.CSSProperties; body?: React.CSSProperties; footer?: React.CSSProperties; mask?: React.CSSProperties; content?: React.CSSProperties; wrapper?: React.CSSProperties }` | - |
| title | Dialog title | `React.ReactNode` | - |
| transitionName | 对话框转换className | string | - |
| 可见的 | 对话框是否可见 | boolean | false |
| zIndex | Dialog z-index | number | - |
| onClose | 点击关闭按钮或遮罩时的回调 | `(event: React.SyntheticEvent) => void` | - |

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

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/dialog 基于 [MIT](./LICENSE.md) 许可证发布。
