import * as React from 'react';
import {} from 'react';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import LazyRenderBox from '../LazyRenderBox';
import { IDialogPropTypes } from '../IDialogPropTypes';
import Mask from './Mask';
import { getMotionName } from '../util/motionUtil';
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
    wrapStyle,
    wrapClassName,

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
        // aria-labelledby={props.title ? this.titleId : null}
        style={{ zIndex, ...wrapStyle }}
        {...props.wrapProps}
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
