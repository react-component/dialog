import * as React from 'react';
import Portal from '@rc-component/portal';
import Dialog from './Dialog';
import type { IDialogPropTypes } from './IDialogPropTypes';

// fix issue #10656
/*
 * getContainer remarks
 * Custom container should not be return, because in the Portal component, it will remove the
 * return container element here, if the custom container is the only child of it's component,
 * like issue #10656, It will has a conflict with removeChild method in react-dom.
 * So here should add a child (div element) to custom container.
 * */

const DialogWrap: React.FC<IDialogPropTypes> = (props: IDialogPropTypes) => {
  const { visible, getContainer, forceRender, destroyOnClose = false, afterClose } = props;
  const [animatedVisible, setAnimatedVisible] = React.useState<boolean>(visible);

  React.useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);

  // // 渲染在当前 dom 里；
  // if (getContainer === false) {
  //   return (
  //     <Dialog
  //       {...props}
  //       getOpenCount={() => 2} // 不对 body 做任何操作。。
  //     />
  //   );
  // }

  // Destroy on close will remove wrapped div
  if (!forceRender && destroyOnClose && !animatedVisible) {
    return null;
  }

  return (
    <Portal
      open={visible || forceRender || animatedVisible}
      autoDestroy={false}
      getContainer={getContainer}
      autoLock={visible || animatedVisible}
    >
      <Dialog
        {...props}
        destroyOnClose={destroyOnClose}
        afterClose={() => {
          afterClose?.();
          setAnimatedVisible(false);
        }}
      />
    </Portal>
  );
};

DialogWrap.displayName = 'Dialog';

export default DialogWrap;
