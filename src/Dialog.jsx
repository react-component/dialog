import React, {findDOMNode} from 'react';
import Align from 'rc-align';
import {KeyCode, classSet} from 'rc-util';
import assign from 'object-assign';
import Animate from 'rc-animate';

function noop() {
}

function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  const method = 'scroll' + (top ? 'Top' : 'Left');
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
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix)=> {
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
    onAfterClose: React.PropTypes.func,
    onClose: React.PropTypes.func,
    closable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    mousePosition: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      onAfterClose: noop,
      onClose: noop,
    };
  },

  componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        findDOMNode(this.refs.dialog).focus();
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
    this.props.onAfterClose();
  },

  onMaskClick() {
    if (this.props.closable) {
      this.close();
    }
    findDOMNode(this.refs.dialog).focus();
  },

  onKeyDown(e) {
    const props = this.props;
    if (props.closable) {
      if (e.keyCode === KeyCode.ESC) {
        this.close();
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        const activeElement = document.activeElement;
        const dialogRoot = findDOMNode(this.refs.dialog);
        const sentinel = findDOMNode(this.refs.sentinel);
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

  onAlign(dialogNode) {
    const mousePosition = this.props.mousePosition;
    if (this.props.visible) {
      if (mousePosition) {
        const elOffset = offset(dialogNode);
        setTransformOrigin(dialogNode, `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
      } else {
        setTransformOrigin(dialogNode, '');
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
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    let footer;
    if (props.footer) {
      footer = (<div className={`${prefixCls}-footer`}>{props.footer}</div>);
    }

    let header;
    if (props.title || props.closable) {
      header = (<div className={`${prefixCls}-header`}>
        {closable ?
          (<a tabIndex="0" onClick={this.close} className={`${prefixCls}-close`}>
            <span className={`${prefixCls}-close-x`}></span>
          </a>) :
          null}
        <div className={`${prefixCls}-title`}>{props.title}</div>
      </div>);
    }

    const style = assign({}, props.style, dest);
    const dialogProps = {
      className: [props.prefixCls, props.className].join(' '),
      tabIndex: '0',
      role: 'dialog',
      ref: 'dialog',
      style: style,
      onKeyDown: this.onKeyDown,
    };
    const transitionName = this.getTransitionName();
    const dialogElement = (<div {...dialogProps}>
      <div className={`${prefixCls}-content`}>
        {header}
        <div className={`${prefixCls}-body`}>{props.children}</div>
        {footer}
      </div>
      <div tabIndex="0" ref="sentinel" style={{width: 0, height: 0, overflow: 'hidden'}}>sentinel</div>
    </div>);
    // add key for align to keep animate children stable
    return (<Animate key="dialog"
                     showProp="dialogVisible"
                     onLeave={this.onAnimateLeave}
                     transitionName={transitionName}
                     component=""
                     transitionAppear={true}>
      <Align align={props.align}
             key="dialog"
             onAlign={this.onAlign}
             dialogVisible={props.visible}
             monitorBufferTime={80}
             monitorWindowResize={true}
             disabled={!props.visible}>
        {dialogElement}
      </Align>
    </Animate>);
  },

  getMaskElement() {
    const props = this.props;
    const maskProps = {
      onClick: this.onMaskClick,
      'data-visible': props.visible,
    };

    if (props.zIndex) {
      maskProps.style = {zIndex: props.zIndex};
    }
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = <div {...maskProps} className={`${props.prefixCls}-mask`} key="mask"/>;
      if (maskTransition) {
        maskElement = (<Animate key="mask" showProp="data-visible" transitionAppear={true} component=""
                                transitionName={maskTransition}>{maskElement}</Animate>);
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

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const className = {
      [`${prefixCls}-wrap`]: 1,
      [`${prefixCls}-wrap-hidden`]: !props.visible,
    };

    return (<div className={classSet(className)}>
      {[this.getMaskElement(), this.getDialogElement()]}
    </div>);
  },

  close() {
    this.props.onClose();
  },
});

export default Dialog;
