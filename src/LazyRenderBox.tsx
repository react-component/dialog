import * as React from 'react';

export interface ILazyRenderBoxPropTypes {
  className?: string;
  visible?: boolean;
  hiddenClassName?: string;
  role?: string;
  style?: {};
  forceRender?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

export default class LazyRenderBox extends React.Component<ILazyRenderBoxPropTypes, any> {
  shouldComponentUpdate(nextProps: ILazyRenderBoxPropTypes) {
    if (nextProps.forceRender) {
      return true;
    }
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    const { className, hiddenClassName, visible, forceRender, ...restProps } = this.props;
    let useClassName = className;
    if (!!hiddenClassName && !visible) {
      useClassName += ` ${hiddenClassName}`;
    }
    return <div {...restProps} className={useClassName} />;
  }
}
