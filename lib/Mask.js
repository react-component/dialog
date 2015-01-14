/** @jsx React.DOM */

var React = require('react');

var Mask = React.createClass({
  render: function () {
    var props = this.props;
    var prefixClsFn = props.prefixClsFn;
    var className = [prefixClsFn('mask')];
    return (<div onClick={props.onClick} className={className.join(' ')}></div>);
  }
});

module.exports = Mask;
