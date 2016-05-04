/* eslint no-console:0 */

import 'rc-dialog/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';

const MyControl = React.createClass({
  getInitialState() {
    return {
      visible: false,
      visible2: false,
      width: 600,
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
  onClick2() {
    this.setState({
      visible2: true,
    });
  },

  onClose(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },

  onClose2() {
    this.setState({
      visible2: false,
    });
  },

  onDestroyOnCloseChange(e) {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  },

  changeWidth() {
    this.setState({
      width: this.state.width === 600 ? 800 : 600,
    });
  },

  render() {
    let dialog;
    let dialog2;
    if (this.state.visible || !this.state.destroyOnClose) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          animation="zoom"
          maskAnimation="fade"
          onClose={this.onClose}
          style={{ width: this.state.width }}
          mousePosition={this.state.mousePosition}
          title={<div>第一个弹框</div>}
        >
          <input />
          <p>basic modal</p>
          <button onClick={this.onClick2}> Open Second Dialog</button>
          <div style={{ height: 200 }}></div>
        </Dialog>
      );
    }
    if (this.state.visible2) {
      dialog2 = (
        <Dialog
          visible={this.state.visible2}
          animation="zoom"
          maskAnimation="fade"
          onClose={this.onClose2}
          mousePosition={this.state.mousePosition}
          title={<div>第二个弹框</div>}
        >
          <input />
          <p> SecondModal </p>
        </Dialog>
      );
    }

    return (
      <div>
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
        {dialog2}
      </div>
    );
  },
});

ReactDOM.render(
  <div>
    <h2>ant-design dialog</h2>
    <MyControl />
  </div>,
  document.getElementById('__react-content')
);
