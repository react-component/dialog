/** @jsx React.DOM */

var React = require('react');
var domAlign = require('dom-align');
var RcUtil = require('rc-util');
var Dom = RcUtil.Dom;
var assign = require('object-assign');

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.map(function (s) {
    if (!s) {
      return prefixCls;
    }
    return prefixCls + '-' + s;
  }).join(' ');
}

var Dialog = React.createClass({
  align() {
    var align = this.props.align;
    domAlign(React.findDOMNode(this.refs.dialog), align.node || window, align);
  },

  monitorWindowResize() {
    if (!this.resizeHandler) {
      this.resizeHandler = Dom.addEventListener(window, 'resize', this.align);
    }
  },

  unMonitorWindowResize() {
    if (this.resizeHandler) {
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate() {
    var props = this.props;
    if (props.visible) {
      this.align();
      this.monitorWindowResize();
      if (!this.lastVisible) {
        React.findDOMNode(this.refs.dialog).focus();
      }
    } else {
      this.unMonitorWindowResize();
    }
    this.lastVisible = props.visible;
  },

  componentWillUnmount() {
    this.unMonitorWindowResize();
  },

  render() {
    var props = this.props;
    var visible = props.visible;
    var prefixCls = props.prefixCls;
    var className = [prefixClsFn(prefixCls, 'wrap')];
    var closable = props.closable;

    if (!visible) {
      className.push(prefixClsFn(prefixCls, 'wrap-hidden'));
    }

    var dest = {};

    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    var style = assign({}, props.style, dest);

    var maskProps = {};
    if (closable) {
      maskProps.onClick = this.props.onClose;
    }
    if (style.zIndex) {
      maskProps.style = {zIndex: style.zIndex};
    }
    return (<div className={className.join(' ')}>
      <div {...maskProps} className={prefixClsFn(prefixCls, 'mask')}/>
      <div className={[prefixClsFn(prefixCls, ''), props.className].join(' ')} tabIndex="0" role="dialog" ref='dialog' style={style}>
        <div className={prefixClsFn(prefixCls, 'content')}>
          <div className={prefixClsFn(prefixCls, 'header')}>
            {closable ?
              (<a tabIndex="0" onClick={this.props.onClose} className={[prefixClsFn(prefixCls, 'close')].join('')}>
                <span className={prefixClsFn(prefixCls, 'close-x')}>×</span>
              </a>) :
              null}
            <div className={prefixClsFn(prefixCls, 'title')}>{props.title}</div>
          </div>
          <div className={prefixClsFn(prefixCls, 'body')}>{props.children}</div>
        </div>
      </div>
    </div>);
  }
});

module.exports = Dialog;
