<div align="center">
  <h1>@rc-component/dialog</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>💬 可组合的 React 对话框组件。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/dialog"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/dialog.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/dialog"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/dialog.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/dialog/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/dialog"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/dialog/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/dialog"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/dialog?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

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
    <Dialog title="对话框" visible onClose={() => {}}>
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
| animation | 对话框动画名称 | string | - |
| className | 附加对话框 className | string | - |
| classNames | 语义 className | `{ header?: string; body?: string; footer?: string; mask?: string; content?: string; wrapper?: string }` | - |
| closable | 是否显示关闭按钮，或关闭按钮属性 | boolean \| object | true |
| closeIcon | 自定义关闭图标 | `React.ReactNode` | - |
| destroyOnHidden | 对话框关闭后卸载子项 | boolean | false |
| focusTriggerAfterClose | 关闭后聚焦触发元素 | boolean | true |
| footer | Dialog footer | `React.ReactNode` | - |
| forceRender | 在首次显示之前渲染对话框 | boolean | false |
| getContainer | 装载对话框的容器 | `() => HTMLElement` | - |
| keyboard | 按 Esc 是否关闭对话框 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| maskAnimation | 遮罩动画名称 | string | - |
| maskClosable | 单击遮罩是否关闭对话框 | boolean | true |
| maskTransitionName | 遮罩过渡 className | string | - |
| modalRender | 自定义模态内容渲染器 | `(node: React.ReactNode) => React.ReactNode` | - |
| mousePosition | 用于变换原点的鼠标位置 | `{ x: number; y: number }` | - |
| prefixCls | 组件 className 前缀 | string | `rc-dialog` |
| scrollLock | 打开时是否锁定body滚动 | boolean | true |
| style | 根对话框样式 | `React.CSSProperties` | - |
| styles | 语义化样式 | `{ header?: React.CSSProperties; body?: React.CSSProperties; footer?: React.CSSProperties; mask?: React.CSSProperties; content?: React.CSSProperties; wrapper?: React.CSSProperties }` | - |
| title | 对话框标题 | `React.ReactNode` | - |
| transitionName | 对话框过渡 className | string | - |
| visible | 对话框是否可见 | boolean | false |
| zIndex | 对话框 z-index | number | - |
| onClose | 点击关闭按钮或遮罩时的回调 | `(event: React.SyntheticEvent) => void` | - |

## 本地开发

```bash
npm install
npm start
```

dumi 站点默认运行在 `http://localhost:8000`。

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

@rc-component/dialog 基于 [MIT](./LICENSE) 许可证发布。
