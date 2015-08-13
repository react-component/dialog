'use strict';

import React, {findDOMNode} from 'react';
import Align from 'rc-align';
import {KeyCode, classSet} from 'rc-util';
import assign from 'object-assign';
import Animate from 'rc-animate';

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
          (<a tabIndex="0" onClick={this.originClose} className={`${prefixCls}-close`}>
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
    var dialogElement = <div {...dialogProps}>
      <div className={`${prefixCls}-content`} >
        {header}
        <div className={`${prefixCls}-body`}>{props.children}</div>
        {footer}
      </div>
      <div tabIndex="0" ref='sentinel' style={{width: 0, height: 0, overflow: 'hidden'}}>sentinel</div>
    </div>;
    // add key for align to keep animate children stable
    return (<Animate key="dialog"
      showProp="dialogVisible"
      onEnd={this.handleAnimateEnd}
      transitionName={transitionName}
      component=""
      animateMount={true}>
      <Align align={props.align}
        key="dialog"
        dialogVisible={props.visible}
        monitorBufferTime={80}
        monitorWindowResize={true}
        disabled={!props.visible}>
        {dialogElement}
      </Align>
    </Animate>);
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
      maskElement = <div {...maskProps} className={`${props.prefixCls}-mask`} key="mask"/>;
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
        findDOMNode(this.refs.dialog).focus();
      }
      //更新时的配置中心点
      this.setDialogOrigin();
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
        this.originClose();
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        var activeElement = document.activeElement;
        var dialogRoot = findDOMNode(this.refs.dialog);
        var sentinel = findDOMNode(this.refs.sentinel);
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === findDOMNode(this.refs.sentinel)) {
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
      this.originClose();
    }
    findDOMNode(this.refs.dialog).focus();
  },

  setDialogOrigin() {
    var dom = findDOMNode(this.refs.dialog);
    var t = this.props.mousePosition;
    if (t && typeof t === 'object') {
      dom.style.transformOrigin =
        (t.x - dom.offsetLeft) + 'px ' +
        (t.y - dom.offsetTop) + 'px';
    }
  },

  originClose() {
    //关闭时重置中心点，避免窗口变化。
    this.setDialogOrigin();
    this.props.onRequestClose();
  },

  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var className = {
      [`${prefixCls}-wrap`]: 1,
      [`${prefixCls}-wrap-hidden`]: !props.visible
    };

    return (<div className={classSet(className)}>
      {[this.getMaskElement(), this.getDialogElement()]}
    </div>);
  }
});

export default Dialog;
