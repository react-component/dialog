/** @jsx React.DOM */

var React = require('react');

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
      closable: true,
      prefixCls: 'rc-dialog',
      visible: false,
      onBeforeClose: noop,
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

  requestClose: function () {
    if (this.props.onBeforeClose(this) !== false) {
      this.close();
    }
  },

  render: function () {
    var self = this;
    var props = this.props;
    var visible = self.state.visible;
    var prefixClsFn = this.prefixClsFn;
    var className = [prefixClsFn('wrap')];
    var closable = props.closable;

    if (!visible) {
      className.push(prefixClsFn('wrap-hidden'));
    }

    var maskProps = {};
    if (closable) {
      maskProps.onClick = this.requestClose;
    }

    return (
      <div className={className.join(' ')}>
        <div {...maskProps} className={prefixClsFn('mask')}></div>
        <div className={[prefixClsFn(''), props.className].join(' ')} tabIndex="0" role="dialog" ref='dialog' style={props.style}>
          <div className={prefixClsFn('content')}>
            <div className={prefixClsFn('header')}>
            {closable ?
              (<a tabIndex="0" onClick={this.requestClose} className={[prefixClsFn('close')].join('')}>
                <span className={prefixClsFn('close-x')}>×</span>
              </a>) :
              null}
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
