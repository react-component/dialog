import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './Dialog';
import Portal from 'rc-util/lib/PortalWrapper';
import IDialogPropTypes from './IDialogPropTypes';

// fix issue #10656
/*
* getContainer remarks
* Custom container should not be return, because in the Portal component, it will remove the
* return container element here, if the custom container is the only child of it's component,
* like issue #10656, It will has a conflict with removeChild method in react-dom.
* So here should add a child (div element) to custom container.
* */

export default (props: IDialogPropTypes) => {
  const { visible, getContainer } = props;

  return (
    <Portal
      visible={visible}
      getContainer={getContainer}
    >
      {({
        openCount,
        getContainer: getCurrentContainer,
      }: {
        openCount: number,
        getContainer: () => HTMLElement,
      }) => (
          <Dialog
            {...props}
            openCount={openCount}
            getContainer={getCurrentContainer}
          />
        )}
    </Portal>
  );
};
