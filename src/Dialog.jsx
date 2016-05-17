import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import Animate from 'rc-animate';
import LazyRenderBox from './LazyRenderBox';
let uuid = 0;
let openCount = 0;

function noop() {
}

function getScroll(w, top) {
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
  pos.top += getScroll(w, 1);
  return pos;
}

const Dialog = React.createClass({
  propTypes: {
    onAfterClose: PropTypes.func,
    onClose: PropTypes.func,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    visible: PropTypes.bool,
    mousePosition: PropTypes.object,
    wrapStyle: PropTypes.object,
    wrapClassName: PropTypes.string,
  },

  getDefaultProps() {
    return {
      onAfterClose: noop,
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
        this.addScrollingClass();
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
        this.removeScrollingClass();
      }
    }
  },

  onAnimateLeave() {
    if (ReactDOM.findDOMNode(this.refs.wrap)) {
      this.refs.wrap.style.display = 'none';
    }
    this.props.onAfterClose();
  },

  onMaskClick(e) {
    if (e.target === e.currentTarget && this.props.closable && this.props.maskClosable) {
      this.close(e);
    }
  },

  onKeyDown(e) {
    const props = this.props;
    if (props.closable && props.keyboard) {
      if (e.keyCode === KeyCode.ESC) {
        this.close(e);
      }
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
    const dest = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }


    let footer;
    if (props.footer) {
      footer = (<div className={`${prefixCls}-footer`} ref="footer">
        {props.footer}
      </div>);
    }

    let header;
    if (props.title) {
      header = (<div className={`${prefixCls}-header`} ref="header">
        <div className={`${prefixCls}-title`} id={this.titleId}>
          {props.title}
        </div>
      </div>);
    }

    let closer;
    if (closable) {
      closer = (<button
        onClick={this.close}
        aria-label="Close"
        className={`${prefixCls}-close`}
      >
        <span className={`${prefixCls}-close-x`}/>
      </button>);
    }

    const style = {
      ...props.style,
      ...dest,
    };
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
    const style = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  },

  getWrapStyle() {
    return {
      ...this.getZIndexStyle(),
      ...this.props.wrapStyle,
    };
  },

  getMaskElement() {
    const props = this.props;
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (
        <LazyRenderBox
          style={this.getZIndexStyle()}
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

  addScrollingClass() {
    openCount++;
    if (openCount !== 1) {
      return;
    }
    const props = this.props;
    const scrollingClassName = `${props.prefixCls}-open`;
    document.body.className += ` ${scrollingClassName}`;
  },

  removeScrollingClass() {
    openCount--;
    if (openCount !== 0) {
      return;
    }
    const props = this.props;
    const scrollingClassName = `${props.prefixCls}-open`;
    const body = document.body;
    body.className = body.className.replace(scrollingClassName, '');
  },

  close(e) {
    this.props.onClose(e);
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
    return (<div>
      {this.getMaskElement()}
      <div
        tabIndex="-1"
        onKeyDown={this.onKeyDown}
        className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
        ref="wrap"
        onClick={this.onMaskClick}
        role="dialog"
        aria-labelledby={props.title ? this.titleId : null}
        style={style}
      >
        {this.getDialogElement()}
      </div>
    </div>);
  },
});

export default Dialog;
