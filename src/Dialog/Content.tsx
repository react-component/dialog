import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { IDialogChildProps } from '.';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };

export interface ContentProps extends IDialogChildProps {
  motionName: string;
}

export default function Content(props: ContentProps) {
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
  } = props;

  const dest: React.CSSProperties = {};
  if (width !== undefined) {
    dest.width = width;
  }
  if (height !== undefined) {
    dest.height = height;
  }

  // ============================= Render =============================
  let footerNode: React.ReactNode;
  if (footer) {
    footerNode = (
      <div
        className={`${prefixCls}-footer`}
        // ref={this.saveRef('footer')}
      >
        {footer}
      </div>
    );
  }

  let headerNode: React.ReactNode;
  if (title) {
    headerNode = (
      <div
        className={`${prefixCls}-header`}
        // ref={this.saveRef('header')}
      >
        <div
          className={`${prefixCls}-title`}
          // id={this.titleId}
        >
          {title}
        </div>
      </div>
    );
  }

  let closer: React.ReactNode;
  if (closable) {
    closer = (
      <button
        type="button"
        // onClick={this.close}
        aria-label="Close"
        className={`${prefixCls}-close`}
      >
        {closeIcon || <span className={`${prefixCls}-close-x`} />}
      </button>
    );
  }

  const content = (
    <div className={`${prefixCls}-content`}>
      {closer}
      {headerNode}
      <div
        className={`${prefixCls}-body`}
        style={bodyStyle}
        // ref={this.saveRef('body')}
        {...bodyProps}
      >
        {children}
      </div>
      {footerNode}
    </div>
  );

  return (
    <CSSMotion
      visible={visible}
      // onLeave={this.onAnimateLeave}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          key="dialog-element"
          role="document"
          // ref={this.saveRef('dialog')}
          style={{ ...motionStyle, ...style, ...dest }}
          className={classNames(prefixCls, className, motionClassName)}
          // onMouseDown={this.onDialogMouseDown}
        >
          <div
            tabIndex={0}
            // ref={this.saveRef('sentinelStart')}
            style={sentinelStyle}
            aria-hidden="true"
          />
          {modalRender ? modalRender(content) : content}
          <div
            tabIndex={0}
            // ref={this.saveRef('sentinelEnd')}
            style={sentinelStyle}
            aria-hidden="true"
          />
        </div>
      )}
    </CSSMotion>
  );
}
