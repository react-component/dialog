import React, { PropTypes } from 'react';

const LazyRenderBox = React.createClass({
  propTypes: {
    className: PropTypes.string,
    visible: PropTypes.bool,
    hiddenClassName: PropTypes.string,
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.hiddenClassName || nextProps.visible;
  },

  render() {
    let className = this.props.className;
    if (this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`;
    }
    return <div {...this.props} className={className}/>;
  },
});

export default LazyRenderBox;
