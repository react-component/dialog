import React from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import Animate from 'rc-animate';
import LazyRenderBox from './LazyRenderBox';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import DialogPropTypes from './DialogPropTypes';
import assign from 'object-assign';

let uuid = 0;
let openCount = 0;

/* eslint react/no-is-mounted:0 */

function noop() {
}

function getScroll(w, top?: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function setTransformOrigin(node, value) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}

const Dialog = React.createClass<DialogPropTypes, any>({
  getDefaultProps() {
    return {
      afterClose: noop,
      className: '',
      mask: true,
      visible: false,
      keyboard: true,
      closable: true,
      maskClosable: true,
      prefixCls: 'rc-dialog',
      onClose: noop,
    };
  },

  componentWillMount() {
    this.titleId = `rcDialogTitle${uuid++}`;
  },

  componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate(prevProps) {
    const props = this.props;
    const mousePosition = this.props.mousePosition;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        this.addScrollingEffect();
        this.refs.wrap.focus();
        const dialogNode = ReactDOM.findDOMNode(this.refs.dialog);
        if (mousePosition) {
          const elOffset = offset(dialogNode);
          setTransformOrigin(dialogNode,
            `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    } else if (prevProps.visible) {
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  },

  onAnimateLeave() {
    // need demo?
    // https://github.com/react-component/dialog/pull/28
    if (this.refs.wrap) {
      this.refs.wrap.style.display = 'none';
    }
    this.removeScrollingEffect();
    this.props.afterClose();
  },

  onMaskClick(e) {
    if (e.target === e.currentTarget && this.props.maskClosable) {
      this.close(e);
    }
  },
  onTouchStart(e) {
    // prevent ios background page scroll
    e.preventDefault();
  },

  onKeyDown(e) {
    const props = this.props;
    if (props.keyboard && e.keyCode === KeyCode.ESC) {
      this.close(e);
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        const activeElement = document.activeElement;
        const dialogRoot = this.refs.wrap;
        const sentinel = this.refs.sentinel;
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === this.refs.sentinel) {
          dialogRoot.focus();
        }
      }
    }
  },

  getDialogElement() {
    const props = this.props;
    const closable = props.closable;
    const prefixCls = props.prefixCls;
    const dest: any = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }


    let footer;
    if (props.footer) {
      footer = (
        <div className={`${prefixCls}-footer`} ref="footer">
          {props.footer}
        </div>
      );
    }

    let header;
    if (props.title) {
      header = (
        <div className={`${prefixCls}-header`} ref="header">
          <div className={`${prefixCls}-title`} id={this.titleId}>
            {props.title}
          </div>
        </div>
      );
    }

    let closer;
    if (closable) {
      closer = (
        <button
          onClick={this.close}
          aria-label="Close"
          className={`${prefixCls}-close`}
        >
          <span className={`${prefixCls}-close-x`} />
        </button>);
    }

    const style = assign({}, props.style, dest);
    const transitionName = this.getTransitionName();
    const dialogElement = (
      <LazyRenderBox
        role="document"
        ref="dialog"
        style={style}
        className={`${prefixCls} ${props.className || ''}`}
        visible={props.visible}
      >
        <div className={`${prefixCls}-content`}>
          {closer}
          {header}
          <div className={`${prefixCls}-body`} style={props.bodyStyle} ref="body">
            {props.children}
          </div>
          {footer}
        </div>
        <div tabIndex="0" ref="sentinel" style={{ width: 0, height: 0, overflow: 'hidden' }}>
          sentinel
        </div>
      </LazyRenderBox>
    );
    return (
      <Animate
        key="dialog"
        showProp="visible"
        onLeave={this.onAnimateLeave}
        transitionName={transitionName}
        component=""
        transitionAppear
      >
        {dialogElement}
      </Animate>
    );
  },

  getZIndexStyle() {
    const style: any = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  },

  getWrapStyle(): any {
    return assign({}, this.getZIndexStyle(), this.props.wrapStyle);
  },

  getMaskStyle() {
    return assign({}, this.getZIndexStyle(), this.props.maskStyle);
  },

  getMaskElement() {
    const props = this.props;
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (
        <LazyRenderBox
          style={this.getMaskStyle()}
          key="mask"
          className={`${props.prefixCls}-mask`}
          hiddenClassName={`${props.prefixCls}-mask-hidden`}
          visible={props.visible}
        />
      );
      if (maskTransition) {
        maskElement = (
          <Animate
            key="mask"
            showProp="visible"
            transitionAppear
            component=""
            transitionName={maskTransition}
          >
            {maskElement}
          </Animate>
        );
      }
    }
    return maskElement;
  },

  getMaskTransitionName() {
    const props = this.props;
    let transitionName = props.maskTransitionName;
    const animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    const animation = props.animation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },

  getElement(part) {
    return this.refs[part];
  },

  setScrollbar() {
    if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  },

  addScrollingEffect() {
    openCount++;
    if (openCount !== 1) {
      return;
    }
    this.checkScrollbar();
    this.setScrollbar();
    document.body.style.overflow = 'hidden';
    // this.adjustDialog();
  },

  removeScrollingEffect() {
    openCount--;
    if (openCount !== 0) {
      return;
    }
    document.body.style.overflow = '';
    this.resetScrollbar();
    // this.resetAdjustments();
  },

  close(e) {
    this.props.onClose(e);
  },

  checkScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    if (this.bodyIsOverflowing) {
      this.scrollbarWidth = getScrollBarSize();
    }
  },
  resetScrollbar() {
    document.body.style.paddingRight = '';
  },
  adjustDialog() {
    if (this.refs.wrap && this.scrollbarWidth !== undefined) {
      const modalIsOverflowing =
        this.refs.wrap.scrollHeight > document.documentElement.clientHeight;
      this.refs.wrap.style.paddingLeft =
        `${!this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : ''}px`;
      this.refs.wrap.style.paddingRight =
        `${this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''}px`;
    }
  },

  resetAdjustments() {
    if (this.refs.wrap) {
      this.refs.wrap.style.paddingLeft = this.refs.wrap.style.paddingLeft = '';
    }
  },

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (props.visible) {
      style.display = null;
    }
    return (
      <div>
        {this.getMaskElement()}
        <div
          tabIndex="-1"
          onKeyDown={this.onKeyDown}
          className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
          ref="wrap"
          onClick={this.onMaskClick}
          onTouchStart={this.onTouchStart}
          role="dialog"
          aria-labelledby={props.title ? this.titleId : null}
          style={style}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  },
});

export default Dialog;
