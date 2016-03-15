import React from 'react';

const DOMWrap = React.createClass({
  propTypes: {
    tag: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      tag: 'div',
    };
  },

  render() {
    const props = {...this.props};
    if (!props.visible) {
      props.className = props.className || '';
      props.className += ' ' + props.hiddenClassName;
    }
    const Tag = props.tag;
    return <Tag {...props}>{props.children}</Tag>;
  },
});

export default DOMWrap;
