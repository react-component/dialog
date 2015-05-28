'use strict';

require('rc-dialog/assets/bootstrap.css');
var React = require('react');
var Dialog = require('rc-dialog');

function close() {
  console.log('close');
}

function show() {
  console.log('show');
}

React.render(<div><h1>render</h1>
  <p>does not support render visible on server!</p>
  <Dialog
    title="第一个弹框"
    width="500"
    zIndex={100}
    visible={true}
    onClose={close}
    onShow={show}
  >
    <p>第一个dialog</p>
  </Dialog>

</div>,document.getElementById('__react-content'));
