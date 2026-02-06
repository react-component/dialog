import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@rc-component/dialog';

const DivPortal: React.FC = () => {
  return ReactDOM.createPortal(
    <div
      id="test-portal"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        background: 'white',
        padding: 20,
        border: '1px solid #ccc',
        zIndex: 1000000,
      }}
    >
      <input type="text" />
    </div>,
    document.body
  );
};

const MyControl: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const onClick = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div style={{ margin: 20 }}>
      <p>
        <button type="button" onClick={onClick}>
          show dialog
        </button>
      </p>
      <Dialog visible={visible} onClose={onClose}>
        hello world
        <input type="text" />
        <input type="text" />
        <DivPortal />
      </Dialog>
    </div>
  );
};

export default MyControl;
