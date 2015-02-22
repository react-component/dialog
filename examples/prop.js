/** @jsx React.DOM */

require('bootstrap/dist/css/bootstrap.css');
require('rc-dialog/assets/bootstrap.css');
var React = require('react');
var Dialog = require('rc-dialog');

var MyControl = React.createClass({
  getInitialState: function () {
    return {
      showDialog : false
    };
  },

  _show : function(){
    this.setState({
      showDialog : true
    });
  },

  _hide : function(){
    this.setState({
      showDialog : false
    });
  },

  handleTrigger : function(){
    this._show();
  },

  handleSave : function(){
    this._hide();
  },

  handleClose : function(){
    this._hide();
  },

  onShow:function(){
    console.log(document.activeElement);
  },

  render : function(){
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleTrigger}>show dialog</button>
        <Dialog title="第二个弹框" visible={this.state.showDialog}
          onClose={this.handleClose}
          onShow={this.onShow}
          style={{width:600}}
        >
          <input/>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <div className="modal-footer">
            <button className="btn" onClick={this.handleClose} >Close</button>
            <button className="btn btn-primary" onClick={this.handleSave}>Save changes</button>
          </div>
        </Dialog>
      </div>
    );
  }
});

React.render(
  <div><h1>use props</h1><MyControl/></div>,
  document.getElementById('__react-content')
);
