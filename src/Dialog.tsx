import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import Animate from 'rc-animate';
import LazyRenderBox from './LazyRenderBox';
import IDialogPropTypes from './IDialogPropTypes';

let uuid = 0;

/* eslint react/no-is-mounted:0 */

function getScroll(w: any, top?: boolean) {
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

function setTransformOrigin(node: any, value: string) {
  const { style } = node;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style.transformOrigin = value;
}

function offset(el: any) {
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

export interface IDialogChildProps extends IDialogPropTypes {
  getOpenCount: () => number;
  switchScrollingEffect?: () => void;
}

export default class Dialog extends React.Component<IDialogChildProps, any> {
  static defaultProps = {
    className: '',
    mask: true,
    visible: false,
    keyboard: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    prefixCls: 'rc-dialog',
    focusTriggerAfterClose: true,
  };

  private inTransition: boolean = false;

  private titleId: string;

  private openTime: number;

  private lastOutSideFocusNode: HTMLElement | null;

  private wrap: HTMLElement;

  private dialog: any;

  private sentinelStart: HTMLElement;

  private sentinelEnd: HTMLElement;

  private dialogMouseDown: boolean;

  private timeoutId: number;

  private switchScrollingEffect: () => void;

  constructor(props: IDialogChildProps) {
    super(props);
    this.titleId = `rcDialogTitle${uuid += 1}`;
    this.switchScrollingEffect = props.switchScrollingEffect || (() => {});
  }

  componentDidMount() {
    this.componentDidUpdate({});
    // if forceRender is true, set element style display to be none;
    if (
      (this.props.forceRender || (this.props.getContainer === false && !this.props.visible)) &&
      this.wrap
    ) {
      this.wrap.style.display = 'none';
    }
  }

  componentDidUpdate(prevProps: IDialogPropTypes) {
    const {visible, mask, focusTriggerAfterClose} = this.props;
    const { mousePosition } = this.props;
    if (visible) {
      // first show
      if (!prevProps.visible) {
        this.openTime = Date.now();
        this.switchScrollingEffect();
        this.tryFocus();
        const dialogNode = ReactDOM.findDOMNode(this.dialog);
        if (mousePosition) {
          const elOffset = offset(dialogNode);
          setTransformOrigin(
            dialogNode,
            `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`,
          );
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    } else if (prevProps.visible) {
      this.inTransition = true;
      if (mask && this.lastOutSideFocusNode && focusTriggerAfterClose) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  }

  componentWillUnmount() {
    const { visible, getOpenCount } = this.props;
    if ((visible || this.inTransition) && !getOpenCount()) {
      this.switchScrollingEffect();
    }
    clearTimeout(this.timeoutId);
  }

  tryFocus() {
    if (!contains(this.wrap, document.activeElement)) {
      this.lastOutSideFocusNode = document.activeElement as HTMLElement;
      this.sentinelStart.focus();
    }
  }

  onAnimateLeave = () => {
    const { afterClose, getOpenCount } = this.props;
    // need demo?
    // https://github.com/react-component/dialog/pull/28
    if (this.wrap) {
      this.wrap.style.display = 'none';
    }
    this.inTransition = false;
    // 如果没有打开的状态，则清除 effect 和 overflow: hidden;
    // https://github.com/ant-design/ant-design/issues/21539
    if (!getOpenCount()) {
      this.switchScrollingEffect();
    }
    if (afterClose) {
      afterClose();
    }
  }

  onDialogMouseDown = () => {
    this.dialogMouseDown = true;
  }

  onMaskMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    if (this.dialogMouseDown) {
      this.timeoutId = setTimeout(() => {
        this.dialogMouseDown = false;
      }, 0);
    }
  }

  onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // android trigger click on open (fastclick??)
    if (Date.now() - this.openTime < 300) {
      return;
    }
    if (e.target === e.currentTarget && !this.dialogMouseDown) {
      this.close(e);
    }
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyboard, visible } = this.props;
    if ( keyboard && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.close(e);
      return;
    }
    // keep focus inside dialog
    if (visible) {
      if (e.keyCode === KeyCode.TAB) {
        const { activeElement } = document;
        if (e.shiftKey) {
          if (activeElement === this.sentinelStart) {
            this.sentinelEnd.focus();
          }
        } else if (activeElement === this.sentinelEnd) {
          this.sentinelStart.focus();
        }
      }
    }
  }

  getDialogElement = () => {
    const { closable, prefixCls, width, height, footer, title, closeIcon, style, className, visible, forceRender, bodyStyle, bodyProps, children, destroyOnClose } = this.props;
    const dest: any = {};
    if (width !== undefined) {
      dest.width = width;
    }
    if (height !== undefined) {
      dest.height = height;
    }

    let footerNode;
    if (footer) {
      footerNode = (
        <div className={`${prefixCls}-footer`} ref={this.saveRef('footer')}>
          {footer}
        </div>
      );
    }

    let headerNode;
    if (title) {
      headerNode = (
        <div className={`${prefixCls}-header`} ref={this.saveRef('header')}>
          <div className={`${prefixCls}-title`} id={this.titleId}>
            {title}
          </div>
        </div>
      );
    }

    let closer;
    if (closable) {
      closer = (
        <button
          type="button"
          onClick={this.close}
          aria-label="Close"
          className={`${prefixCls}-close`}
        >
          {closeIcon || <span className={`${prefixCls}-close-x`} />}
        </button>
      );
    }

    const styleBox = { ...style, ...dest };
    const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };
    const transitionName = this.getTransitionName();
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        role="document"
        ref={this.saveRef('dialog')}
        style={styleBox}
        className={`${prefixCls} ${className || ''}`}
        visible={visible}
        forceRender={forceRender}
        onMouseDown={this.onDialogMouseDown}
      >
        <div
          tabIndex={0}
          ref={this.saveRef('sentinelStart')}
          style={sentinelStyle}
          aria-hidden="true"
        />
        <div className={`${prefixCls}-content`}>
          {closer}
          {headerNode}
          <div
            className={`${prefixCls}-body`}
            style={bodyStyle}
            ref={this.saveRef('body')}
            {...bodyProps}
          >
            {children}
          </div>
          {footerNode}
        </div>
        <div
          tabIndex={0}
          ref={this.saveRef('sentinelEnd')}
          style={sentinelStyle}
          aria-hidden="true"
        />
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
        {visible || !destroyOnClose ? dialogElement : null}
      </Animate>
    );
  }

  getZIndexStyle = () => {
    const style: any = {};
    const { zIndex } = this.props;
    if (zIndex !== undefined) {
      style.zIndex = zIndex;
    }
    return style;
  }

  getWrapStyle = (): any => {
    return { ...this.getZIndexStyle(), ...this.props.wrapStyle };
  }

  getMaskStyle = () => {
    return { ...this.getZIndexStyle(), ...this.props.maskStyle };
  }

  getMaskElement = () => {
    const { mask, prefixCls, visible, maskProps } = this.props;
    let maskElement;
    if (mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (
        <LazyRenderBox
          style={this.getMaskStyle()}
          key="mask"
          className={`${prefixCls}-mask`}
          hiddenClassName={`${prefixCls}-mask-hidden`}
          visible={visible}
          {...maskProps}
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
  }

  getMaskTransitionName = () => {
    const { maskTransitionName, maskAnimation, prefixCls } = this.props;
    let transitionName = maskTransitionName;
    const animation = maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}`;
    }

    return transitionName;
  }

  getTransitionName = () => {
    const { transitionName, animation, prefixCls } = this.props;
    let transitionNameResult = transitionName;
    if (!transitionName && animation) {
      transitionNameResult = `${prefixCls}-${animation}`;
    }
    return transitionNameResult;
  }

  close = (e: any) => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
  }

  saveRef = (name: string) => (node: any) => {
    (this as any)[name] = node;
  }

  render() {
    const { props } = this;
    const { prefixCls, maskClosable } = props;
    const style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (props.visible) {
      style.display = null;
    }
    return (
      <div className={`${prefixCls}-root`}>
        {this.getMaskElement()}
        <div
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
          ref={this.saveRef('wrap')}
          onClick={maskClosable ? this.onMaskClick : null}
          onMouseUp={maskClosable ? this.onMaskMouseUp : null}
          role="dialog"
          aria-labelledby={props.title ? this.titleId : null}
          style={style}
          {...props.wrapProps}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
