import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';

const MyControl = React.createClass({
  getInitialState() {
    return {
      visible: false,
      destroyOnClose: false,
    };
  },

  onClick() {
    this.setState({
      visible: true,
    });
  },

  onClose() {
    this.setState({
      visible: false,
    });
  },

  onDestroyOnCloseChange(e) {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  },

  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          animation="fade"
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
        >
          <input />
          <p>basic modal</p>
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
  },
});

ReactDOM.render(
  <div>
    <h2>ant-design dialog</h2>
    <MyControl/>
  </div>,
  document.getElementById('__react-content')
);
