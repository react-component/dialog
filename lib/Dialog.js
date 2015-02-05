/** @jsx React.DOM */

var React = require('react');
var Mask = require('./Mask');

function noop() {
}

var Dialog = React.createClass({
  prefixClsFn: function () {
    var prefixCls = this.props.prefixCls;
    var args = Array.prototype.slice.call(arguments, 0);
    return args.map(function (s) {
      if (!s) {
        return prefixCls;
      }
      return prefixCls + '-' + s;
    }).join(' ');
  },

  getInitialState: function () {
    return {
      visible: this.props.visible
    };
  },

  getDefaultProps: function () {
    return {
      className: '',
      prefixCls: 'rc-dialog',
      visible: false,
      onShow: noop,
      onClose: noop
    };
  },

  componentWillReceiveProps: function (props) {
    if (this.state.visible !== props.visible) {
      if (props.visible) {
        this.show();
      } else {
        this.close();
      }
    }
  },

  show: function () {
    var self = this;
    if (!this.state.visible) {
      var props = this.props;
      this.setState({
        visible: true
      }, function () {
        self.refs.dialog.getDOMNode().focus();
        props.onShow();
      });
    }
  },

  close: function () {
    if (this.state.visible) {
      var props = this.props;
      this.setState({
        visible: false
      }, function () {
        props.onClose();
      });
    }
  },

  render: function () {
    var self = this;
    var props = this.props;
    var visible = self.state.visible;
    var prefixClsFn = this.prefixClsFn;
    var className = [prefixClsFn('wrap')];

    if (!visible) {
      className.push(prefixClsFn('wrap-hidden'));
    }

    return (
      <div className={className.join(' ')}>
        <Mask visible={this.state.visible}
          onClick={this.close}
          prefixClsFn = {prefixClsFn}/>
        <div className={[prefixClsFn(''), props.className].join(' ')} tabIndex="0" role="dialog" ref='dialog' style={props.style}>
          <div className={prefixClsFn('content')}>
            <div className={prefixClsFn('header')}>
              <a tabIndex="0" onClick={this.close} className={[prefixClsFn('close')].join('')}>
                <span className={prefixClsFn('close-x')}>×</span>
              </a>
              <div className={prefixClsFn('title')}>{props.title}</div>
            </div>
            <div className={prefixClsFn('body')}>{props.children}</div>
          </div>
        </div>
      </div>
    );
  },

  componentDidMount: function () {
    if (this.state.visible) {
      this.refs.dialog.getDOMNode().focus();
      this.props.onShow();
    }
  }
});

module.exports = Dialog;
