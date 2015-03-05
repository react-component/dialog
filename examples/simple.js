/** @jsx React.DOM */

require('rc-dialog/assets/bootstrap.css');
var React = require('react');
var Dialog = require('rc-dialog');

function close() {
  console.log('close');
}

function show() {
  console.log('show');
}

React.render(<div><h1>call method</h1><div id="d1"></div></div>,document.getElementById('__react-content'));

var dialog = React.render(
  (<Dialog title="第一个弹框" onClose={close} onShow={show}
    style={{width: 500}}
  >
    <p>第一个dialog</p>
  </Dialog>),
  document.getElementById('d1')
);

setTimeout(function () {
  dialog.show();
}, 100);
