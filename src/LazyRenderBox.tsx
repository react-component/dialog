import React from 'react';
import assign from 'object-assign';

export interface ILazyRenderBoxPropTypes {
  className?: string;
  visible?: boolean;
  hiddenClassName?: string;
  role?: string;
  style?: {};
}

export default class LazyRenderBox extends React.Component<ILazyRenderBoxPropTypes, any> {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    let className = this.props.className;
    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`;
    }
    const props: any = assign({}, this.props);
    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return <div {...props} />;
  }
}
