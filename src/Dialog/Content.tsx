import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { IDialogChildProps } from '.';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };

export interface ContentProps extends IDialogChildProps {
  motionName: string;
  ariaId: string;
  onLeaved: () => void;
}

export interface ContentRef {
  focus: () => void;
  getDOM: () => HTMLDivElement;
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
    onLeaved,
  } = props;

  const sentinelStartRef = useRef<HTMLDivElement>();
  const sentinelEndRef = useRef<HTMLDivElement>();
  const dialogRef = useRef<HTMLDivElement>();

  const dest: React.CSSProperties = {};
  if (width !== undefined) {
    dest.width = width;
  }
  if (height !== undefined) {
    dest.height = height;
  }

  // ============================== Ref ===============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      sentinelStartRef.current?.focus();
    },
    getDOM: () => dialogRef.current,
  }));

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
      onVisibleChanged={(changedVisible) => {
        if (!changedVisible) {
          onLeaved();
        }
      }}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          key="dialog-element"
          role="document"
          ref={dialogRef}
          style={{ ...motionStyle, ...style, ...dest }}
          className={classNames(prefixCls, className, motionClassName)}
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
