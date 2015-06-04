'use strict';

require('bootstrap/dist/css/bootstrap.css');
require('rc-dialog/assets/bootstrap.css');
var React = require('react');
var Dialog = require('rc-dialog');
var container;
var packageJson = require('../package.json');

var DialogContent = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  onChange(e) {
    this.props.onChange(e.target.value);
    this.setState({
      value: e.target.value
    });
  },

  render() {
    return <div>
      <input onChange={this.onChange} value={this.state.value}/>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <p>第二个弹出框内容</p>
      <div className="modal-footer">
        <button className="btn" onClick={this.props.handleClose} >Close</button>
        <button className="btn btn-primary" onClick={this.props.handleSave}>Save changes</button>
      </div>
    </div>;
  }
});

var MyControl = React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },

  onChange(v) {
    this.dialogContentInput = v;
  },

  handleClose() {
    this.setState({
      visible: false
    });
  },

  handleTrigger() {
    this.setState({
      visible: true
    });

    // test rerender
    setTimeout(()=> {
      this.setState({
        visible: true
      });
    }, 100);
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleTrigger}>show dialog</button>
        <Dialog
          ref='dialog'
          title= "第二个弹框"
          visible={this.state.visible}
          onClose={this.handleClose}
          style={{width: 600}}
        >
          <DialogContent onChange={this.onChange} handleClose={this.handleClose} handleSave={this.handleClose}/>
        </Dialog>
      </div>
    );
  }
});

React.render(
  <div>
    <h1>render dialog inside component {packageJson.name}@{packageJson.version}</h1>
    <MyControl/>
  </div>,
  document.getElementById('__react-content')
);
