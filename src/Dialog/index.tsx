import * as React from 'react';
import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import useId from 'rc-util/lib/hooks/useId';
import contains from 'rc-util/lib/Dom/contains';
import pickAttrs from 'rc-util/lib/pickAttrs';
import type ScollLocker from 'rc-util/lib/Dom/scrollLocker';
import type { IDialogPropTypes } from '../IDialogPropTypes';
import Mask from './Mask';
import { getMotionName } from '../util';
import Content from './Content';
import type { ContentRef } from './Content/Panel';

export type IDialogChildProps = {
  // zombieJ: This should be handle on top instead of each Dialog.
  // TODO: refactor to remove this.
  getOpenCount: () => number;
  scrollLocker?: ScollLocker;
} & IDialogPropTypes;

export default function Dialog(props: IDialogChildProps) {
  const {
    prefixCls = 'rc-dialog',
    zIndex,
    visible = false,
    keyboard = true,
    focusTriggerAfterClose = true,
    scrollLocker,

    // Wrapper
    wrapStyle,
    wrapClassName,
    wrapProps,
    onClose,
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
  } = props;

  const lastOutSideActiveElementRef = useRef<HTMLElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<ContentRef>();

  const [animatedVisible, setAnimatedVisible] = React.useState(visible);

  // ========================== Init ==========================
  const ariaId = useId();

  // ========================= Events =========================
  function onDialogVisibleChanged(newVisible: boolean) {
    if (newVisible) {
      // Try to focus
      if (!contains(wrapperRef.current, document.activeElement)) {
        lastOutSideActiveElementRef.current = document.activeElement as HTMLElement;
        contentRef.current?.focus();
      }
    } else {
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
  }

  function onInternalClose(e: React.SyntheticEvent) {
    onClose?.(e);
  }

  // >>> Content
  const contentClickRef = useRef(false);
  const contentTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // We need record content click incase content popup out of dialog
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current);
    contentClickRef.current = true;
  };

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = setTimeout(() => {
      contentClickRef.current = false;
    });
  };

  // >>> Wrapper
  // Close only when element not on dialog
  let onWrapperClick: (e: React.SyntheticEvent) => void = null;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (contentClickRef.current) {
        contentClickRef.current = false;
      } else if (wrapperRef.current === e.target) {
        onInternalClose(e);
      }
    };
  }

  function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (keyboard && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      onInternalClose(e);
      return;
    }

    // keep focus inside dialog
    if (visible) {
      if (e.keyCode === KeyCode.TAB) {
        contentRef.current.changeActive(!e.shiftKey);
      }
    }
  }

  // ========================= Effect =========================
  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
    return () => {};
  }, [visible]);

  // Remove direct should also check the scroll bar update
  useEffect(
    () => () => {
      clearTimeout(contentTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (animatedVisible) {
      scrollLocker?.lock();
      return scrollLocker?.unLock;
    }
    return () => {};
  }, [animatedVisible, scrollLocker]);

  // ========================= Render =========================
  return (
    <div
      className={classNames(`${prefixCls}-root`, rootClassName)}
      {...pickAttrs(props, { data: true })}
    >
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
        onKeyDown={onWrapperKeyDown}
        className={classNames(`${prefixCls}-wrap`, wrapClassName)}
        ref={wrapperRef}
        onClick={onWrapperClick}
        style={{ zIndex, ...wrapStyle, display: !animatedVisible ? 'none' : null }}
        {...wrapProps}
      >
        <Content
          {...props}
          onMouseDown={onContentMouseDown}
          onMouseUp={onContentMouseUp}
          ref={contentRef}
          closable={closable}
          ariaId={ariaId}
          prefixCls={prefixCls}
          visible={visible}
          onClose={onInternalClose}
          onVisibleChanged={onDialogVisibleChanged}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}
