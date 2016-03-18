import React from 'react';

const LazyRenderBox = React.createClass({
  shouldComponentUpdate(nextProps) {
    return nextProps.visible;
  },

  render() {
    return <div {...this.props} />;
  },
});

export default LazyRenderBox;
