import React, { useRef } from 'react';
import classNames from 'classnames';
import MemoChildren from './MemoChildren';
import type { IDialogPropTypes } from '../../IDialogPropTypes';

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
    fullscreenIcon,
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
    fullscreenable
  } = props;

  // ================================= Refs =================================
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
  const [contentStyle, setContentStyle] = React.useState<React.CSSProperties>({
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {})
  });

  const toggleFullscreen = () => {
    if (width) {
      if (width === contentStyle.width) {
        setContentStyle({ width: '100%' });
      } else {
        setContentStyle({ width });
      }
    }
  };
  // ================================ Render ================================
  let footerNode: React.ReactNode;
  if (footer) {
    footerNode = <div className={`${prefixCls}-footer`}>{footer}</div>;
  }

  let headerNode: React.ReactNode;
  if (title) {
    headerNode = (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`} id={ariaId}>
          {title}
        </div>
      </div>
    );
  }

  let fullscreen: React.ReactNode;
  if (fullscreenable) {
    const isFullscreen = '100%' === contentStyle.width;
    fullscreen = (
      <button type="button" onClick={toggleFullscreen} aria-label="Fullscreen" className={`${prefixCls}-fullscreen`}>
        {fullscreenIcon(isFullscreen) || <span className={`${prefixCls}-fullscreen-${isFullscreen ? 'out' : 'in'}`} />}
      </button>
    );
  }

  let closer: React.ReactNode;
  if (closable) {
    closer = (
      <button type="button" onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
        {closeIcon || <span className={`${prefixCls}-close-x`} />}
      </button>
    );
  }

  const content = (
    <div className={`${prefixCls}-content`}>
      {fullscreen}
      {closer}
      {headerNode}
      <div className={`${prefixCls}-body`} style={bodyStyle} {...bodyProps}>
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
      ref={holderRef}
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
