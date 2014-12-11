/** @jsx React.DOM */

var React = require('react');
var Mask = React.createClass({
  render: function () {
    var cls = "modal-backdrop modal-mask ",
      visible = this.props.visible,
      showCls =  visible ? 'fade in' : 'fade',
      display = visible ? 'block' : 'none',
      style = {display: display};

    cls = cls + showCls;
    if (display){
      style.height = Math.max(window.screen.height,document.body.offsetHeight);
    }
    return (<div className={cls} style={style}></div>);
  }
});

module.exports = Mask;
