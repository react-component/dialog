/** @jsx React.DOM */

var React = require('react');
var Mask = require('./mask');

var Dialog = React.createClass({

  getInitialState: function () {
    return {
      visible: this.props.visible
    };
  },
  componentWillReceiveProps: function  (props) {
    if (this.props.visible !== props.visible){
      if (props.visible){
        this.show();
      }else {
        this.hide();
      }
    }
  },
  show: function() {
    this.setState({
      visible: true
    });
    this.onShow();
  },
  hide: function() {
    this.setState({
      visible: false
    });
    this.onClose();
  },
  onShow: function () {
    if (this.props.onShow){
      this.props.onShow();
    }
  },
  onClose: function () {
    if (this.props.onClose){
      this.props.onClose(); 
    }
  },
  render: function () {
    var self = this;
    var visible = self.state.visible;
    var display = visible ? 'block' : 'none';
    var style = {display: display};

    return (
        <div className="modal rc-dialog" style={style}>
          <Mask visible={this.state.visible}/>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={this.hide} type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{this.props.title}</h4>
              </div>
              <div className="modal-body">{this.props.children}</div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Dialog;
