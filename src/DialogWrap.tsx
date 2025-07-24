import Portal from '@rc-component/portal';
import * as React from 'react';
import { RefContext } from './context';
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

const DialogWrap: React.FC<IDialogPropTypes> = (props) => {
  const {
    visible,
    getContainer,
    forceRender,
    destroyOnHidden = false,
    afterClose,
    closable,
    panelRef,
  } = props;
  const [animatedVisible, setAnimatedVisible] = React.useState<boolean>(visible);

  const refContext = React.useMemo(() => ({ panel: panelRef }), [panelRef]);

  React.useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);

  // Destroy on close will remove wrapped div
  if (!forceRender && destroyOnHidden && !animatedVisible) {
    return null;
  }

  return (
    <RefContext.Provider value={refContext}>
      <Portal
        open={visible || forceRender || animatedVisible}
        autoDestroy={false}
        getContainer={getContainer}
        autoLock={visible || animatedVisible}
      >
        <Dialog
          {...props}
          destroyOnHidden={destroyOnHidden}
          afterClose={() => {
            const closableObj = closable && typeof closable === 'object' ? closable : {};
            const { afterClose: closableAfterClose } = closableObj || {};
            closableAfterClose?.();
            afterClose?.();
            setAnimatedVisible(false);
          }}
        />
      </Portal>
    </RefContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  DialogWrap.displayName = 'Dialog';
}

export default DialogWrap;
