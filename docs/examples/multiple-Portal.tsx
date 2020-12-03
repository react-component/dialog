import * as React from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import Dialog from 'rc-dialog';
import '../../assets/index.less';

const { useState } = React;

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
      <p><button type="button" onClick={onToggleDrawer}>show drawer</button></p>
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
      <button type="button" onClick={onToggleDrawer}>close drawer</button>
    </Drawer>
  );
  return (
    <div>
      <button type="button" onClick={onToggleDialog}>open dialog</button>
      {dialog}
      {drawer}
    </div>
  );
};

export default Demo;
