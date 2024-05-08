import * as React from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import Dialog from 'rc-dialog';
import '../../assets/index.less';

const Demo: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);

  const onToggleDrawer = () => {
    setShowDrawer((value) => !value);
  };

  const onToggleDialog = () => {
    setShowDialog((value) => !value);
  };

  const dialog = (
    <Dialog
      visible={showDialog}
      animation="zoom"
      maskAnimation="fade"
      onClose={onToggleDialog}
      forceRender
      title="basic modal"
    >
      <p>
        <button type="button" onClick={onToggleDrawer}>
          show drawer
        </button>
      </p>
      <div style={{ height: 200 }} />
    </Dialog>
  );
  const drawer = (
    <Drawer open={showDrawer} onClose={onToggleDrawer}>
      <button type="button" onClick={onToggleDrawer}>
        close drawer
      </button>
    </Drawer>
  );
  return (
    <div>
      <button type="button" onClick={onToggleDialog}>
        open dialog
      </button>
      {dialog}
      {drawer}
    </div>
  );
};

export default Demo;
