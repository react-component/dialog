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
    closable = true,
    destroyOnClose = false,
    focusTriggerAfterClose = true,

    // Wrapper
    title,
    wrapStyle,
    wrapClassName,
    wrapProps,

    // Dialog
    transitionName,
    animation,

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

  // ========================== Init ==========================
  const ariaIdRef = useRef<string>();
  if (!ariaIdRef.current) {
    ariaIdRef.current = `rcDialogTitle${getUUID()}`;
  }

  // ========================= Effect =========================
  React.useEffect(() => {
    if (visible) {
      if (!contains(wrapperRef.current, document.activeElement)) {
        lastOutSideElementRef.current = document.activeElement;
        contentRef.current?.focus();
      }
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
        // onClick={maskClosable ? this.onMaskClick : null}
        // onMouseUp={maskClosable ? this.onMaskMouseUp : null}
        role="dialog"
        aria-labelledby={title ? ariaIdRef.current : null}
        style={{ zIndex, ...wrapStyle }}
        {...wrapProps}
      >
        <Content
          {...props}
          ref={contentRef}
          ariaId={ariaIdRef.current}
          prefixCls={prefixCls}
          visible={visible}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}
