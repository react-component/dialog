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
import Content from './Content';

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

  // ==================== Init ====================
  const titleRef = useRef();
  if (!titleRef.current) {
    titleRef.current = `rcDialogTitle${getUUID()}`;
  }

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
        // ref={this.saveRef('wrap')}
        // onClick={maskClosable ? this.onMaskClick : null}
        // onMouseUp={maskClosable ? this.onMaskMouseUp : null}
        role="dialog"
        aria-labelledby={title ? titleRef.current : null}
        style={{ zIndex, ...wrapStyle }}
        {...wrapProps}
      >
        <Content
          {...props}
          prefixCls={prefixCls}
          visible={visible}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}
