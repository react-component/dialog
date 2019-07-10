import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from '../src/DialogWrap';

class MyControl extends React.Component {
  state = {
    visible: false,
    destroyOnClose: false,
  };
  onClick = () => {
    this.setState({
      visible: true,
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  }
  onDestroyOnCloseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  }
  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          animation="slide-fade"
          maskAnimation="fade"
          onClose={this.onClose}
          style={{ width: 600 }}
          title={<div>第二个弹框</div>}
          footer={
            [
              <button
                type="button"
                className="btn btn-default"
                key="close"
                onClick={this.onClose}
              >
              Close
              </button>,
              <button
                type="button"
                className="btn btn-primary"
                key="save"
                onClick={this.onClose}
              >
              Save changes
              </button>,
            ]
          }
        ><h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          <hr />
          <h4>Overflowing text to show scroll behavior</h4>
          <p>Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros.
          </p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
            sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <div style={{ display: '' }}>
            <p>Aenean lacinia bibendum nulla sed
              consectetur. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Donec sed odio dui.
              Donec
              ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>Cras mattis consectetur purus sit amet fermentum.
              Cras justo odio, dapibus ac facilisis in, egestas
              eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>Aenean lacinia bibendum nulla sed consectetur.
              Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui.
              Donec ullamcorper nulla non metus auctor
              fringilla.
            </p>
            <p>Cras mattis consectetur purus sit amet fermentum.
              Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus,
              porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue
              laoreet rutrum faucibus dolor auctor.
            </p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent
              commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla
              non metus auctor fringilla.
            </p>
          </div>
        </Dialog>
      );
    }
    return (
      <div style={{ margin: 20 }}>
        <p>
          <button className="btn btn-primary" onClick={this.onClick}>show dialog</button>
          &nbsp;
          <label>destroy on close:
            <input
              type="checkbox"
              checked={this.state.destroyOnClose}
              onChange={this.onDestroyOnCloseChange}
            />
          </label>
        </p>
        {dialog}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h2>ant-design dialog</h2>
    <MyControl />
  </div>,
  document.getElementById('__react-content'),
);
