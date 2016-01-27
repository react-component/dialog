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

  onClick(e) {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
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
        <Dialog visible={this.state.visible}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onClose}
                style={{width: 600}}
                mousePosition={this.state.mousePosition} title={<div>第二个弹框</div>}>
          <input />
          <p>basic modal</p>
        </Dialog>
      );
    }
    return (
      <div>
        <p>
          <button className="btn btn-primary" onClick={this.onClick}>show dialog</button>
          &nbsp;
          <label>destroy on close: <input type="checkbox" checked={this.state.destroyOnClose} onChange={this.onDestroyOnCloseChange}/></label>
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
