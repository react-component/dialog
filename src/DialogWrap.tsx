import * as React from 'react';
import Portal from 'rc-util/lib/PortalWrapper';
import Dialog, { IDialogChildProps } from './Dialog';
import { IDialogPropTypes } from './IDialogPropTypes';

// fix issue #10656
/*
 * getContainer remarks
 * Custom container should not be return, because in the Portal component, it will remove the
 * return container element here, if the custom container is the only child of it's component,
 * like issue #10656, It will has a conflict with removeChild method in react-dom.
 * So here should add a child (div element) to custom container.
 * */

const DialogWrap = (props: IDialogPropTypes) => {
  const { visible, getContainer, forceRender } = props;
  // 渲染在当前 dom 里；
  if (getContainer === false) {
    return (
      <Dialog
        {...props}
        getOpenCount={() => 2} // 不对 body 做任何操作。。
      />
    );
  }

  return (
    <Portal visible={visible} forceRender={forceRender} getContainer={getContainer}>
      {(childProps: IDialogChildProps) => <Dialog {...props} {...childProps} />}
    </Portal>
  );
};

DialogWrap.displayName = 'Dialog';

export default DialogWrap;
