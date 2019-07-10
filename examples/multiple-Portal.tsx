import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/DialogWrap';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import 'rc-dialog/assets/index.less';

const Demo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const onToggleDrawer = () => {
    setShowDrawer(value => !value);
  };

  const onToggleDialog = () => {
    setShowDialog(value => !value);
  };

  const dialog = (
    <Dialog
      visible={showDialog}
      animation="zoom"
      maskAnimation="fade"
      onClose={onToggleDialog}
      forceRender
    >
      <p>basic modal</p>
      <p><button onClick={onToggleDrawer}>show drawer</button></p>
      <div style={{ height: 200 }} />
    </Dialog>
  );
  const drawer = (
    <Drawer
      open={showDrawer}
      handler={false}
      onClose={onToggleDrawer}
      level={null}
    >
      <button onClick={onToggleDrawer}>close drawer</button>
    </Drawer>
  );
  return (
    <div>
      <button onClick={onToggleDialog}>open dialog</button>
      {dialog}
      {drawer}
    </div>
  );
};

ReactDOM.render(
  <div>
    <h2>multiple dialog</h2>
    <Demo />
  </div>,
  document.getElementById('__react-content'),
);
