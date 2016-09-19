import React from 'react';
import Dialog from './Dialog';
import getContainerRenderMixin from 'rc-util/lib/getContainerRenderMixin';
import DialogPropTypes from './DialogPropTypes';

const DialogWrap = React.createClass<DialogPropTypes, any>({
  mixins: [
    getContainerRenderMixin({
      isVisible(instance) {
        return instance.props.visible;
      },
      autoDestroy: false,
      getComponent(instance, extra) {
        return (
          <Dialog
            {...instance.props}
            {...extra}
            key="dialog"
          />
        );
      },
    }),
  ],

  getDefaultProps() {
    return {
      visible: false,
    };
  },

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  },

  componentWillUnmount() {
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

  getElement(part) {
    return this._component.getElement(part);
  },

  render() {
    return null;
  },
});

export default DialogWrap;
