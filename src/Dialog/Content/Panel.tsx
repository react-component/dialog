import classNames from 'classnames';
import { useComposeRef } from 'rc-util/lib/ref';
import React, { useMemo, useRef } from 'react';
import { RefContext } from '../../context';
import type { IDialogPropTypes } from '../../IDialogPropTypes';
import MemoChildren from './MemoChildren';
import pickAttrs from 'rc-util/lib/pickAttrs';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };
const entityStyle = { outline: 'none' };

export interface PanelProps extends Omit<IDialogPropTypes, 'getOpenCount'> {
  prefixCls: string;
  ariaId?: string;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  holderRef?: React.Ref<HTMLDivElement>;
}

export type ContentRef = {
  focus: () => void;
  changeActive: (next: boolean) => void;
};

const Panel = React.forwardRef<ContentRef, PanelProps>((props, ref) => {
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

  const mergedRef = useComposeRef(holderRef, panelRef);

  const sentinelStartRef = useRef<HTMLDivElement>();
  const sentinelEndRef = useRef<HTMLDivElement>();

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      sentinelStartRef.current?.focus({ preventScroll: true });
    },
    changeActive: (next) => {
      const { activeElement } = document;
      if (next && activeElement === sentinelEndRef.current) {
        sentinelStartRef.current.focus({ preventScroll: true });
      } else if (!next && activeElement === sentinelStartRef.current) {
        sentinelEndRef.current.focus({ preventScroll: true });
      }
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
      <div className={`${prefixCls}-title`} id={ariaId}>
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
  const closeBtnIsDisabled = typeof(closable) === 'object' && closable.disabled;

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
      className={classNames(`${prefixCls}-content`, modalClassNames?.content)}
      style={modalStyles?.content}
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
    >
      <div ref={sentinelStartRef} tabIndex={0} style={entityStyle}>
        <MemoChildren shouldUpdate={visible || forceRender}>
          {modalRender ? modalRender(content) : content}
        </MemoChildren>
      </div>
      <div tabIndex={0} ref={sentinelEndRef} style={sentinelStyle} />
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Panel.displayName = 'Panel';
}

export default Panel;
