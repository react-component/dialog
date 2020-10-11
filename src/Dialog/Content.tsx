import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { IDialogChildProps } from '.';
import { offset } from '../util';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };

export interface ContentProps extends IDialogChildProps {
  motionName: string;
  ariaId: string;
  onVisibleChanged: (visible: boolean) => void;
  onClick: React.MouseEventHandler;
}

export interface ContentRef {
  focus: () => void;
  getDOM: () => HTMLDivElement;
  changeActive: (next: boolean) => void;
}

const Content = React.forwardRef<ContentRef, ContentProps>((props, ref) => {
  const {
    closable,
    prefixCls,
    width,
    height,
    footer,
    title,
    closeIcon,
    style,
    className,
    visible,
    forceRender,
    bodyStyle,
    bodyProps,
    children,
    destroyOnClose,
    modalRender,
    motionName,
    ariaId,
    onClose,
    onVisibleChanged,
    onClick,
    mousePosition,
  } = props;

  const sentinelStartRef = useRef<HTMLDivElement>();
  const sentinelEndRef = useRef<HTMLDivElement>();
  const dialogRef = useRef<HTMLDivElement>();

  // ============================== Ref ===============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      sentinelStartRef.current?.focus();
    },
    getDOM: () => dialogRef.current,
    changeActive: (next) => {
      const { activeElement } = document;
      if (next && activeElement === sentinelEndRef.current) {
        sentinelStartRef.current.focus();
      } else if (!next && activeElement === sentinelStartRef.current) {
        sentinelEndRef.current.focus();
      }
    },
  }));

  // ============================= Style ==============================
  const [transformOrigin, setTransformOrigin] = React.useState<string>();
  const contentStyle: React.CSSProperties = {};
  if (width !== undefined) {
    contentStyle.width = width;
  }
  if (height !== undefined) {
    contentStyle.height = height;
  }
  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }

  function onPrepare() {
    const elementOffset = offset(dialogRef.current);

    setTransformOrigin(
      mousePosition
        ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
        : '',
    );
  }

  // ============================= Render =============================
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
      {closer}
      {headerNode}
      <div className={`${prefixCls}-body`} style={bodyStyle} {...bodyProps}>
        {children}
      </div>
      {footerNode}
    </div>
  );

  return (
    <CSSMotion
      visible={visible}
      onVisibleChanged={onVisibleChanged}
      onAppearPrepare={onPrepare}
      onEnterPrepare={onPrepare}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnClose}
      ref={dialogRef}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => (
        <div
          key="dialog-element"
          role="document"
          ref={motionRef}
          style={{ ...motionStyle, ...style, ...contentStyle }}
          className={classNames(prefixCls, className, motionClassName)}
          onClick={onClick}
        >
          <div tabIndex={0} ref={sentinelStartRef} style={sentinelStyle} aria-hidden="true" />
          {modalRender ? modalRender(content) : content}
          <div tabIndex={0} ref={sentinelEndRef} style={sentinelStyle} aria-hidden="true" />
        </div>
      )}
    </CSSMotion>
  );
});

Content.displayName = 'Content';

export default Content;
