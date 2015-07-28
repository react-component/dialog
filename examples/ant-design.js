'use strict';

import 'rc-dialog/assets/index.css';
import React from 'react';
import Dialog from 'rc-dialog';
var container;

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
      title: <p> 第二个弹框 <input /></p>,
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
    <h2>render dialog standalone</h2>
    <MyControl/>
  </div>,
  document.getElementById('__react-content')
);
