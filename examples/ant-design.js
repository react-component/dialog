/* eslint no-console:0 */

import 'rc-dialog/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';

const MyControl = React.createClass({
  getInitialState() {
    return {
      visible: false,
      width: 600,
      destroyOnClose: false,
      center: false,
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

  onClose(e) {
    console.log(e);
    this.setState({
      visible: false,
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

  center(e) {
    this.setState({
      center: e.target.checked,
    });
  },

  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      const style = {
        width: this.state.width,
      };
      let wrapClassName = '';
      if (this.state.center) {
        wrapClassName = 'center';
      }
      dialog = (
        <Dialog
          visible={this.state.visible}
          wrapClassName={wrapClassName}
          animation="zoom"
          maskAnimation="fade"
          onClose={this.onClose}
          style={style}
          mousePosition={this.state.mousePosition}
          title={<div>第二个弹框</div>}
        >
          <input />
          <p>basic modal</p>
          <button onClick={this.changeWidth}>change width</button>
          <div style={{ height: 200 }}></div>
        </Dialog>
      );
    }
    return (
      <div>
        <style>
          {
            `
            .center {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            `
          }
        </style>
        <p>
          <button
            className="btn btn-primary"
            onClick={this.onClick}
          >
            show dialog
          </button>

          &nbsp;
          <label>destroy on close:
            <input
              type="checkbox"
              checked={this.state.destroyOnClose}
              onChange={this.onDestroyOnCloseChange}
            />
          </label>

          &nbsp;
          <label>center
            <input
              type="checkbox"
              checked={this.state.center}
              onChange={this.center}
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
    <MyControl />
  </div>,
  document.getElementById('__react-content')
);
