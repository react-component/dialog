'use strict';

require('rc-dialog/assets/index.css');
var React = require('react');
var Dialog = require('rc-dialog');
var container;
var packageJson = require('../package.json');

function showDialog(content, props) {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }
  var close = props.onClose;
  props.onClose = function () {
    if (close) {
      close();
    }
    React.unmountComponentAtNode(container);
  };
  var dialog = React.render(<Dialog {...props} renderToBody={false}>{content}</Dialog>, container);
  dialog.show();
  return dialog;
}

var DialogContent = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },

  render: function () {
    return <div>
      <p>basic modal</p>
    </div>;
  }
});

var MyControl = React.createClass({
  handleTrigger: function () {
    this.d = showDialog(<DialogContent />, {
      title: "第二个弹框",
      animation: 'zoom',
      maskAnimation: 'fade',
      onBeforeClose: this.beforeClose,
      style: {width: 600}
    });
  },


  render: function () {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleTrigger}>show dialog</button>
      </div>
    );
  }
});

React.render(
  <div>
    <h1>render dialog standalone {packageJson.name}@{packageJson.version}</h1>
    <MyControl/>
  </div>,
  document.getElementById('__react-content')
);
