import React from 'react';
import { createPortal } from 'react-dom';
import createReactClass from 'create-react-class';
import Dialog from './Dialog';
import getContainerRenderMixin from 'rc-util/lib/getContainerRenderMixin';
import Portal from 'rc-util/lib/Portal';
import IDialogPropTypes from './IDialogPropTypes';

const IS_REACT_16 = !!createPortal;

const mixins: any[] = [];

if (!IS_REACT_16) {
  mixins.push(
    getContainerRenderMixin({
      isVisible(instance) {
        return instance.props.visible;
      },
      autoDestroy: false,
      getContainer(instance) {
        return instance.getContainer();
      },
    }),
  );
};

const DialogWrap = createReactClass<IDialogPropTypes, any>({
  displayName: 'DialogWrap',

  mixins,

  getDefaultProps() {
    return {
      visible: false,
    };
  },

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  },

  componentWillUnmount() {
    if (IS_REACT_16) {
      return;
    }
    if (this.props.visible) {
      this.renderComponent({
        afterClose: this.removeContainer,
        onClose() {
        },
        visible: false,
      });
    } else {
      this.removeContainer();
    }
  },

  saveDialog(node) {
    this._component = node;
  },

  getComponent(extra) {
    return (
      <Dialog
        ref={this.saveDialog}
        {...this.props}
        {...extra}
        key="dialog"
      />
    );
  },

  getContainer() {
    if (this.props.getContainer) {
      return this.props.getContainer();
    }
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  },

  render() {
    const { visible } = this.props;

    let portal: any = null;

    if (!IS_REACT_16) {
      return portal;
    }

    if (visible || this._component) {
      portal = (
        <Portal getContainer={this.getContainer}>
          {this.getComponent()}
        </Portal>
      );
    }

    return portal;
  },
});

export default DialogWrap;
