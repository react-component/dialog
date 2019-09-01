import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import switchScrollingEffect from 'rc-util/lib/switchScrollingEffect';
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
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
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

  constructor(props: IDialogChildProps) {
    super(props);
    this.titleId = `rcDialogTitle${uuid++}`;
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
    const props = this.props;
    const mousePosition = this.props.mousePosition;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.openTime = Date.now();
        this.addScrollingEffect();
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
      if (props.mask && this.lastOutSideFocusNode) {
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
      this.removeScrollingEffect();
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
    const { afterClose } = this.props;
    // need demo?
    // https://github.com/react-component/dialog/pull/28
    if (this.wrap) {
      this.wrap.style.display = 'none';
    }
    this.inTransition = false;
    this.removeScrollingEffect();
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
    const props = this.props;
    if (props.keyboard && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.close(e);
      return;
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        const activeElement = document.activeElement;
        const sentinelStart = this.sentinelStart;
        if (e.shiftKey) {
          if (activeElement === sentinelStart) {
            this.sentinelEnd.focus();
          }
        } else if (activeElement === this.sentinelEnd) {
          sentinelStart.focus();
        }
      }
    }
  }

  getDialogElement = () => {
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
        <div className={`${prefixCls}-footer`} ref={this.saveRef('footer')}>
          {props.footer}
        </div>
      );
    }

    let header;
    if (props.title) {
      header = (
        <div className={`${prefixCls}-header`} ref={this.saveRef('header')}>
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
          type="button"
          onClick={this.close}
          aria-label="Close"
          className={`${prefixCls}-close`}
        >
          {props.closeIcon || <span className={`${prefixCls}-close-x`} />}
        </button>
      );
    }

    const style = { ...props.style, ...dest };
    const sentinelStyle = { width: 0, height: 0, overflow: 'hidden' };
    const transitionName = this.getTransitionName();
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        role="document"
        ref={this.saveRef('dialog')}
        style={style}
        className={`${prefixCls} ${props.className || ''}`}
        visible={props.visible}
        forceRender={props.forceRender}
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
          {header}
          <div
            className={`${prefixCls}-body`}
            style={props.bodyStyle}
            ref={this.saveRef('body')}
            {...props.bodyProps}
          >
            {props.children}
          </div>
          {footer}
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
        {props.visible || !props.destroyOnClose ? dialogElement : null}
      </Animate>
    );
  }

  getZIndexStyle = () => {
    const style: any = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
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
          {...props.maskProps}
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
    const props = this.props;
    let transitionName = props.maskTransitionName;
    const animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }

    return transitionName;
  }

  getTransitionName = () => {
    const props = this.props;
    let transitionName = props.transitionName;
    const animation = props.animation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  }

  addScrollingEffect = () => {
    const { getOpenCount } = this.props;
    const openCount = getOpenCount();
    if (openCount !== 1) {
      return;
    }
    switchScrollingEffect();
    document.body.style.overflow = 'hidden';
  }

  removeScrollingEffect = () => {
    const { getOpenCount } = this.props;
    const openCount = getOpenCount();
    if (openCount !== 0) {
      return;
    }
    document.body.style.overflow = '';
    switchScrollingEffect(true);
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
      <div>
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
