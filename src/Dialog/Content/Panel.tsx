import classNames from 'classnames';
import { useComposeRef } from '@rc-component/util/lib/ref';
import { useLockFocus } from '@rc-component/util/lib/Dom/focus';
import React, { useMemo, useRef } from 'react';
import { RefContext } from '../../context';
import type { IDialogPropTypes } from '../../IDialogPropTypes';
import MemoChildren from './MemoChildren';
import pickAttrs from '@rc-component/util/lib/pickAttrs';

export interface PanelProps extends Omit<IDialogPropTypes, 'getOpenCount'> {
  prefixCls: string;
  ariaId?: string;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  holderRef?: React.Ref<HTMLDivElement>;
}

export type PanelRef = {
  focus: () => void;
};

const Panel = React.forwardRef<PanelRef, PanelProps>((props, ref) => {
  const {
    prefixCls,
    className,
    style,
    title,
    ariaId,
    footer,
    closable,
    closeIcon,
    onClose,
    children,
    bodyStyle,
    bodyProps,
    modalRender,
    onMouseDown,
    onMouseUp,
    holderRef,
    visible,
    forceRender,
    width,
    height,
    classNames: modalClassNames,
    styles: modalStyles,
  } = props;

  // ================================= Refs =================================
  const { panel: panelRef } = React.useContext(RefContext);
  const internalRef = useRef<HTMLDivElement>(null);
  const mergedRef = useComposeRef(holderRef, panelRef, internalRef);

  useLockFocus(visible, () => internalRef.current);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current?.focus({ preventScroll: true });
    },
  }));

  // ================================ Style =================================
  const contentStyle: React.CSSProperties = {};

  if (width !== undefined) {
    contentStyle.width = width;
  }
  if (height !== undefined) {
    contentStyle.height = height;
  }
  // ================================ Render ================================
  const footerNode = footer ? (
    <div
      className={classNames(`${prefixCls}-footer`, modalClassNames?.footer)}
      style={{ ...modalStyles?.footer }}
    >
      {footer}
    </div>
  ) : null;

  const headerNode = title ? (
    <div
      className={classNames(`${prefixCls}-header`, modalClassNames?.header)}
      style={{ ...modalStyles?.header }}
    >
      <div
        className={classNames(`${prefixCls}-title`, modalClassNames?.title)}
        id={ariaId}
        style={{ ...modalStyles?.title }}
      >
        {title}
      </div>
    </div>
  ) : null;

  const closableObj = useMemo(() => {
    if (typeof closable === 'object' && closable !== null) {
      return closable;
    }
    if (closable) {
      return { closeIcon: closeIcon ?? <span className={`${prefixCls}-close-x`} /> };
    }
    return {};
  }, [closable, closeIcon, prefixCls]);

  const ariaProps = pickAttrs(closableObj, true);
  const closeBtnIsDisabled = typeof closable === 'object' && closable.disabled;

  const closerNode = closable ? (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      {...ariaProps}
      className={`${prefixCls}-close`}
      disabled={closeBtnIsDisabled}
    >
      {closableObj.closeIcon}
    </button>
  ) : null;

  const content = (
    <div
      className={classNames(`${prefixCls}-container`, modalClassNames?.container)}
      style={modalStyles?.container}
    >
      {closerNode}
      {headerNode}
      <div
        className={classNames(`${prefixCls}-body`, modalClassNames?.body)}
        style={{ ...bodyStyle, ...modalStyles?.body }}
        {...bodyProps}
      >
        {children}
      </div>
      {footerNode}
    </div>
  );

  return (
    <div
      key="dialog-element"
      role="dialog"
      aria-labelledby={title ? ariaId : null}
      aria-modal="true"
      ref={mergedRef}
      style={{ ...style, ...contentStyle }}
      className={classNames(prefixCls, className)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={-1}
    >
      <MemoChildren shouldUpdate={visible || forceRender}>
        {modalRender ? modalRender(content) : content}
      </MemoChildren>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Panel.displayName = 'Panel';
}

export default Panel;
