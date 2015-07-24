'use strict';

var React = require('react');
var Align = require('rc-align');
var rcUtil = require('rc-util');
var KeyCode = rcUtil.KeyCode;
var assign = require('object-assign');
var Animate = require('rc-animate');

var Dialog = React.createClass({
  getDialogElement() {
    var props = this.props;
    var closable = props.closable;
    var prefixCls = props.prefixCls;
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

    var footer;
    if (props.footer) {
      footer = (<div className={`${prefixCls}-footer`}>{props.footer}</div>);
    }

    var header;
    if (props.title || props.closable) {
      header = <div className={`${prefixCls}-header`}>
        {closable ?
          (<a tabIndex="0" onClick={props.onRequestClose} className={`${prefixCls}-close`}>
            <span className={`${prefixCls}-close-x`}></span>
          </a>) :
          null}
        <div className={`${prefixCls}-title`}>{props.title}</div>
      </div>;
    }

    var style = assign({}, props.style, dest);
    var dialogProps = {
      className: [props.prefixCls, props.className].join(' '),
      tabIndex: '0',
      role: 'dialog',
      ref: 'dialog',
      style: style,
      onKeyDown: this.handleKeyDown
    };
    var transitionName = this.getTransitionName();
    var dialogElement = <div {...dialogProps} >
      <div className={`${prefixCls}-content`}>
        {header}
        <div className={`${prefixCls}-body`}>{props.children}</div>
        {footer}
      </div>
      <div tabIndex="0" ref='sentinel' style={{width: 0, height: 0, overflow: 'hidden'}}>sentinel</div>
    </div>;
    return <Animate key="dialog"
                    showProp="dialogVisible"
                    onEnd={this.handleAnimateEnd}
                    transitionName={transitionName}
                    component=""
                    animateMount={true}><Align align={props.align}
                                               dialogVisible={props.visible}
                                               monitorBufferTime={80}
                                               monitorWindowResize={true}
                                               disabled={!props.visible}>{dialogElement}</Align></Animate>;
  },

  getMaskElement() {
    var props = this.props;
    var maskProps = {
      onClick: this.handleMaskClick,
      'data-visible': props.visible
    };

    if (props.zIndex) {
      maskProps.style = {zIndex: props.zIndex};
    }
    var maskElement;
    if (props.mask) {
      var maskTransition = this.getMaskTransitionName();
      maskElement = <div {...maskProps} className={`${props.prefixCls}-mask`}/>;
      if (maskTransition) {
        maskElement = <Animate key="mask" showProp="data-visible" animateMount={true} component=""
                               transitionName={maskTransition}>{maskElement}</Animate>;
      }
    }
    return maskElement;
  },

  getMaskTransitionName() {
    var props = this.props;
    var transitionName = props.maskTransitionName;
    var animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },

  componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate(prevProps) {
    var props = this.props;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        React.findDOMNode(this.refs.dialog).focus();
      }
    } else if (prevProps.visible) {
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          // empty
        }
        this.lastOutSideFocusNode = null;
      }
    }
  },

  handleKeyDown(e) {
    var props = this.props;
    if (props.closable) {
      if (e.keyCode === KeyCode.ESC) {
        this.props.onRequestClose();
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        var activeElement = document.activeElement;
        var dialogRoot = React.findDOMNode(this.refs.dialog);
        var sentinel = React.findDOMNode(this.refs.sentinel);
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === React.findDOMNode(this.refs.sentinel)) {
          dialogRoot.focus();
        }
      }
    }
  },

  getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    var animation = props.animation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },

  handleShow() {
    this.props.onShow();
  },

  handleClose() {
    this.props.onClose();
  },

  handleAnimateEnd(key, visible) {
    if (visible) {
      this.handleShow();
    } else {
      this.handleClose();
    }
  },

  handleMaskClick() {
    if (this.props.closable) {
      this.props.onRequestClose();
    }
    React.findDOMNode(this.refs.dialog).focus();
  },

  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var className = {
      [`${prefixCls}-wrap`]: 1,
      [`${prefixCls}-wrap-hidden`]: !props.visible
    };

    return (<div className={rcUtil.classSet(className)}>
      {[this.getMaskElement(), this.getDialogElement()]}
    </div>);
  }
});

module.exports = Dialog;
