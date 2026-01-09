import { clsx } from 'clsx';
import contains from '@rc-component/util/lib/Dom/contains';
import useId from '@rc-component/util/lib/hooks/useId';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import type { IDialogPropTypes } from '../IDialogPropTypes';
import { getMotionName } from '../util';
import Content, { type ContentRef } from './Content';
import Mask from './Mask';
import { warning } from '@rc-component/util/lib/warning';

const Dialog: React.FC<IDialogPropTypes> = (props) => {
  const {
    prefixCls = 'rc-dialog',
    zIndex,
    visible = false,
    focusTriggerAfterClose = true,
    wrapStyle,
    wrapClassName,
    wrapProps,
    onClose,
    afterOpenChange,
    afterClose,

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
    rootClassName,
    rootStyle,
    classNames: modalClassNames,
    styles: modalStyles,
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    ['wrapStyle', 'bodyStyle', 'maskStyle'].forEach((prop) => {
      warning(!(prop in props), `${prop} is deprecated, please use styles instead.`);
    });
    if ('wrapClassName' in props) {
      warning(false, `wrapClassName is deprecated, please use classNames instead.`);
    }
  }

  const lastOutSideActiveElementRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<ContentRef>(null);

  const [animatedVisible, setAnimatedVisible] = React.useState(visible);
  const [isFixedPos, setIsFixedPos] = React.useState(false);

  // ========================== Init ==========================
  const ariaId = useId();

  function saveLastOutSideActiveElementRef() {
    if (!contains(wrapperRef.current, document.activeElement)) {
      lastOutSideActiveElementRef.current = document.activeElement as HTMLElement;
    }
  }

  function focusDialogContent() {
    if (!contains(wrapperRef.current, document.activeElement)) {
      contentRef.current?.focus();
    }
  }

  // ========================= Events =========================
  // Close action will trigger by:
  //   1. When hide motion end
  //   2. Controlled `open` to `false` immediately after set to `true` which will not trigger motion
  function doClose() {
    // Clean up scroll bar & focus back
    setAnimatedVisible(false);

    if (mask && lastOutSideActiveElementRef.current && focusTriggerAfterClose) {
      try {
        lastOutSideActiveElementRef.current.focus({ preventScroll: true });
      } catch (e) {
        // Do nothing
      }
      lastOutSideActiveElementRef.current = null;
    }

    // Trigger afterClose only when change visible from true to false
    if (animatedVisible) {
      afterClose?.();
    }
  }

  function onDialogVisibleChanged(newVisible: boolean) {
    // Try to focus
    if (newVisible) {
      focusDialogContent();
    } else {
      doClose();
    }
    afterOpenChange?.(newVisible);
  }

  function onInternalClose(e: React.SyntheticEvent) {
    onClose?.(e);
  }

  // >>> Content
  const mouseDownOnMaskRef = useRef(false);
  const mouseUpOnMaskRef = useRef(false);



  // >>> Wrapper
  // Close only when element not on dialog
  let onWrapperClick: (e: React.SyntheticEvent) => void = null;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (
        onClose &&
        wrapperRef.current === e.target &&
        mouseDownOnMaskRef.current &&
        mouseUpOnMaskRef.current
      ) {
        onInternalClose(e);
      }
    };
  }

  function onModulesMouseDownCapture(e: React.MouseEvent) {
    if (e.target === wrapperRef.current) {
      mouseDownOnMaskRef.current = true;
    } else {
      mouseDownOnMaskRef.current = false;
    }
  }

  function onModulesMouseUpCapture(e: React.MouseEvent) {
    if (e.target === wrapperRef.current) {
      mouseUpOnMaskRef.current = true;
    } else {
      mouseUpOnMaskRef.current = false;
    }
  }

  // ========================= Effect =========================
  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
      saveLastOutSideActiveElementRef();

      // Calc the position style
      if (wrapperRef.current) {
        const computedWrapStyle = getComputedStyle(wrapperRef.current);
        setIsFixedPos(computedWrapStyle.position === 'fixed');
      }
    } else if (
      animatedVisible &&
      contentRef.current.enableMotion() &&
      !contentRef.current.inMotion()
    ) {
      doClose();
    }
  }, [visible]);



  const mergedStyle: React.CSSProperties = {
    zIndex,
    ...wrapStyle,
    ...modalStyles?.wrapper,
    display: !animatedVisible ? 'none' : null,
  };

  // ========================= Render =========================
  return (
    <div
      className={clsx(`${prefixCls}-root`, rootClassName)}
      style={rootStyle}
      {...pickAttrs(props, { data: true })}
    >
      <Mask
        prefixCls={prefixCls}
        visible={mask && visible}
        motionName={getMotionName(prefixCls, maskTransitionName, maskAnimation)}
        style={{ zIndex, ...maskStyle, ...modalStyles?.mask }}
        maskProps={maskProps}
        className={modalClassNames?.mask}
      />
      <div
        className={clsx(`${prefixCls}-wrap`, wrapClassName, modalClassNames?.wrapper)}
        ref={wrapperRef}
        onClick={onWrapperClick}
        onMouseDownCapture={onModulesMouseDownCapture}
        onMouseUpCapture={onModulesMouseUpCapture}
        style={mergedStyle}
        {...wrapProps}
      >
        <Content
          {...props}
          isFixedPos={isFixedPos}
          ref={contentRef}
          closable={closable}
          ariaId={ariaId}
          prefixCls={prefixCls}
          visible={visible && animatedVisible}
          onClose={onInternalClose}
          onVisibleChanged={onDialogVisibleChanged}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
};

export default Dialog;
