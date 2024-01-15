import classNames from 'classnames';
import { useComposeRef } from 'rc-util/lib/ref';
import React, { useRef } from 'react';
import { RefContext } from '../../context';
import type { IDialogPropTypes } from '../../IDialogPropTypes';
import MemoChildren from './MemoChildren';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };

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
      sentinelStartRef.current?.focus();
    },
    changeActive: (next) => {
      const { activeElement } = document;
      if (next && activeElement === sentinelEndRef.current) {
        sentinelStartRef.current.focus();
      } else if (!next && activeElement === sentinelStartRef.current) {
        sentinelEndRef.current.focus();
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
  let footerNode: React.ReactNode;
  if (footer) {
    footerNode = <div className={classNames(`${prefixCls}-footer`, modalClassNames?.footer)} style={{...modalStyles?.footer}}>{footer}</div>;
  }

  let headerNode: React.ReactNode;
  if (title) {
    headerNode = (
      <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={{...modalStyles?.header}}>
        <div className={`${prefixCls}-title`} id={ariaId}>
          {title}
        </div>
      </div>
    );
  }

  let closer: React.ReactNode;
  if (closable) {
    let icon: React.ReactNode, ariaLabel: string, title: string;
    if (typeof closable === 'object') {
      icon = closable.icon;
      ariaLabel = closable.ariaLabel;
      title = closable.title;
    } else {
      icon = closeIcon;
    }

    closer = (
      <button type="button" onClick={onClose} title={title} aria-label={ariaLabel ?? "Close"} className={`${prefixCls}-close`}>
        {icon || <span className={`${prefixCls}-close-x`} />}
      </button>
    );
  }

  const content = (
    <div className={classNames(`${prefixCls}-content`, modalClassNames?.content)} style={modalStyles?.content}>
      {closer}
      {headerNode}
      <div className={classNames(`${prefixCls}-body`, modalClassNames?.body)} style={{...bodyStyle, ...modalStyles?.body}} {...bodyProps}>
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
      style={{
        ...style,
        ...contentStyle,
      }}
      className={classNames(prefixCls, className)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div tabIndex={0} ref={sentinelStartRef} style={sentinelStyle} aria-hidden="true" />
      <MemoChildren shouldUpdate={visible || forceRender}>
        {modalRender ? modalRender(content) : content}
      </MemoChildren>
      <div tabIndex={0} ref={sentinelEndRef} style={sentinelStyle} aria-hidden="true" />
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Panel.displayName = 'Panel';
}

export default Panel;
