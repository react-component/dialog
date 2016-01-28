import 'rc-dialog/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import assign from 'object-assign';

const MyControl = React.createClass({
  getInitialState() {
    return {
      visible: false,
      width: 600,
      align: {
        points: ['tc', 'tc'],
        offset: [0, 100],
      },
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
      align: assign({}, this.state.align),
    });
  },

  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      dialog = (
        <Dialog visible={this.state.visible}
                align={this.state.align}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onClose}
                style={{width: this.state.width}}
                mousePosition={this.state.mousePosition} title={<div>第二个弹框</div>}>
          <input />
          <p>basic modal</p>
          <button onClick={this.changeWidth}>change width</button>
          <div style={{height: 200}}></div>
        </Dialog>
      );
    }
    return (
      <div>
        <p>
          <button className="btn btn-primary" onClick={this.onClick}>show dialog</button>
          &nbsp;
          <label>destroy on close: <input type="checkbox" checked={this.state.destroyOnClose}
                                          onChange={this.onDestroyOnCloseChange}/></label>
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
