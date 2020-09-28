import * as React from 'react';
import { useRef } from 'react';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import LazyRenderBox from '../LazyRenderBox';
import { IDialogPropTypes } from '../IDialogPropTypes';
import Mask from './Mask';
import { getMotionName, getUUID } from '../util';
import Content, { ContentRef } from './Content';

export interface IDialogChildProps extends IDialogPropTypes {
  getOpenCount: () => number;
  switchScrollingEffect?: () => void;
}

export default function Dialog(props: IDialogChildProps) {
  const {
    prefixCls = 'rc-dialog',
    zIndex,
    visible = false,
    keyboard = true,
    destroyOnClose = false,
    focusTriggerAfterClose = true,

    // Wrapper
    title,
    wrapStyle,
    wrapClassName,
    wrapProps,
    forceRender, // TODO: Handle this with correct motion state
    onClose,

    // Dialog
    transitionName,
    animation,
    closable = true,

    // Mask
    mask = true,
    maskTransitionName,
    maskAnimation,
    maskClosable = true,
    maskStyle,
    maskProps,
  } = props;

  const lastOutSideElementRef = useRef<Element>();
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<ContentRef>();

  const [animatedVisible, setAnimatedVisible] = React.useState(visible);

  // ========================== Init ==========================
  const ariaIdRef = useRef<string>();
  if (!ariaIdRef.current) {
    ariaIdRef.current = `rcDialogTitle${getUUID()}`;
  }

  // ========================= Events =========================

  function onDialogLeaved() {
    setAnimatedVisible(false);
  }

  function onInternalClose(e: React.SyntheticEvent) {
    onClose?.(e);
  }

  // Close only when element not on dialog
  let onWrapperClick: (e: React.SyntheticEvent) => void = null;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (!contains(contentRef.current.getDOM(), e.target as HTMLElement)) {
        onInternalClose(e);
      }
    };
  }

  // ========================= Effect =========================
  React.useEffect(() => {
    if (visible) {
      if (!contains(wrapperRef.current, document.activeElement)) {
        lastOutSideElementRef.current = document.activeElement;
        contentRef.current?.focus();
      }

      setAnimatedVisible(true);
    }
  }, [visible]);

  // ========================= Render =========================
  return (
    <div className={`${prefixCls}-root`}>
      <Mask
        prefixCls={prefixCls}
        visible={mask && visible}
        motionName={getMotionName(prefixCls, maskTransitionName, maskAnimation)}
        style={{
          zIndex,
          ...maskStyle,
        }}
        maskProps={maskProps}
      />
      <div
        tabIndex={-1}
        // onKeyDown={this.onKeyDown}
        className={classNames(`${prefixCls}-wrap`, wrapClassName)}
        ref={wrapperRef}
        onClick={onWrapperClick}
        role="dialog"
        aria-labelledby={title ? ariaIdRef.current : null}
        style={{ zIndex, ...wrapStyle, display: !animatedVisible ? 'none' : null }}
        {...wrapProps}
      >
        <Content
          {...props}
          ref={contentRef}
          closable={closable}
          ariaId={ariaIdRef.current}
          prefixCls={prefixCls}
          visible={visible}
          onClose={onInternalClose}
          onLeaved={onDialogLeaved}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}
