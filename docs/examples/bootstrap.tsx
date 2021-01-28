import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import Dialog from 'rc-dialog';
import '../../assets/bootstrap.less';

// Check for memo update should work
const InnerRender = () => {
  console.log('Updated...', Date.now());
  return null;
};

const MyControl = () => {
  const [visible, setVisible] = React.useState(false);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);

  const onClick = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onDestroyOnCloseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestroyOnClose(e.target.checked);
  };

  const dialog = (
    <Dialog
      visible={visible}
      destroyOnClose={destroyOnClose}
      animation="slide-fade"
      maskAnimation="fade"
      onClose={onClose}
      style={{ width: 600 }}
      title={<div>第二个弹框</div>}
      footer={[
        <button type="button" className="btn btn-default" key="close" onClick={onClose}>
          Close
        </button>,
        <button type="button" className="btn btn-primary" key="save" onClick={onClose}>
          Save changes
        </button>,
      ]}
    >
      <InnerRender />
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <hr />
      <h4>Overflowing text to show scroll behavior</h4>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
      <p>
        <button type="button" className="btn btn-primary">
          Primary
        </button>{' '}
        <button type="button" className="btn btn-secondary">
          Secondary
        </button>{' '}
        <button type="button" className="btn btn-success">
          Success
        </button>{' '}
        <button type="button" className="btn btn-danger">
          Danger
        </button>{' '}
        <button type="button" className="btn btn-warning">
          Warning
        </button>{' '}
        <button type="button" className="btn btn-info">
          Info
        </button>{' '}
      </p>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
        vel augue laoreet rutrum faucibus dolor auctor.
      </p>
      <div style={{ display: '' }}>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </p>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </p>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </p>
      </div>
    </Dialog>
  );

  return (
    <div style={{ margin: 20 }}>
      <p>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          show dialog
        </button>
        &nbsp;
        <label>
          destroy on close:
          <input type="checkbox" checked={destroyOnClose} onChange={onDestroyOnCloseChange} />
        </label>
      </p>
      {dialog}
    </div>
  );
};

export default MyControl;
