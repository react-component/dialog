'use strict';

var React = require('react');
var domAlign = require('dom-align');
var RcUtil = require('rc-util');
var Dom = RcUtil.Dom;
var assign = require('object-assign');
var anim = require('css-animation');

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.map(function (s) {
    if (!s) {
      return prefixCls;
    }
    return prefixCls + '-' + s;
  }).join(' ');
}

function buffer(fn, ms) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, ms);
  };
}

var Dialog = React.createClass({
  align() {
    var align = this.props.align;
    domAlign(React.findDOMNode(this.refs.dialog), align.node || window, align);
  },

  monitorWindowResize() {
    if (!this.resizeHandler) {
      this.resizeHandler = Dom.addEventListener(window, 'resize', buffer(this.align, 80));
    }
  },

  anim(el, transitionName, animation, enter, fn) {
    if (!transitionName && animation) {
      transitionName = prefixClsFn(this.props.prefixCls, animation + (enter ? '-enter' : '-leave'));
    }
    if (transitionName) {
      anim(el, transitionName, fn);
    } else if (fn) {
      fn();
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

  componentDidUpdate(prevProps) {
    var props = this.props;
    var wrap = props.wrap;
    var dialogDomNode = React.findDOMNode(this.refs.dialog);
    var maskNode = React.findDOMNode(this.refs.mask);
    prevProps = prevProps || {};
    if (props.visible) {
      this.monitorWindowResize();
      // first show
      if (!prevProps.visible) {
        this.align();
        this.anim(maskNode, props.maskTransitionName, props.maskAnimation, true);
        this.anim(dialogDomNode, props.transitionName, props.animation, true, function () {
          wrap.props.onShow();
        });
        dialogDomNode.focus();
      } else if (props.align !== prevProps.align) {
        this.align();
      }
    } else {
      if (prevProps.visible) {
        this.anim(maskNode, props.maskTransitionName, props.maskAnimation);
        this.anim(dialogDomNode, props.transitionName, props.animation, false, function () {
          wrap.props.onClose();
        });
      }
      this.unMonitorWindowResize();
    }
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
    var footer;
    if (props.footer) {
      footer = <div className={prefixClsFn(prefixCls, 'footer')}>{props.footer}</div>;
    }
    return (<div className={className.join(' ')}>
    {props.mask !== false ? <div {...maskProps} className={prefixClsFn(prefixCls, 'mask')} ref="mask"/> : null}
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
        {footer}
        </div>
      </div>
    </div>);
  }
});

module.exports = Dialog;
