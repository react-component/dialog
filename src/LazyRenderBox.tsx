import * as React from 'react';

export interface ILazyRenderBoxPropTypes {
  className?: string;
  visible?: boolean;
  hiddenClassName?: string;
  role?: string;
  style?: {};
}

export default class LazyRenderBox extends React.Component<ILazyRenderBoxPropTypes, any> {
  shouldComponentUpdate(nextProps: ILazyRenderBoxPropTypes) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    let className = this.props.className;
    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`;
    }
    const props: any = { ...this.props };
    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return <div {...props} />;
  }
}
