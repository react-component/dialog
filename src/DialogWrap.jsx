import React, { PropTypes } from 'react';
import Dialog from './Dialog';
import getContainerRenderMixin from 'rc-util/lib/getContainerRenderMixin';

function noop() {
}

function pick(obj, fields) {
  const ret = {};
  fields.forEach((f) => {
    if (obj[f] !== undefined) {
      ret[f] = obj[f];
    }
  });
  return ret;
}

const DialogWrap = React.createClass({
  propTypes: {
    className: PropTypes.string,
    keyboard: PropTypes.bool,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    mask: PropTypes.bool,
    children: PropTypes.any,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    prefixCls: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  },
  mixins: [
    getContainerRenderMixin({
      isVisible(instance) {
        return instance.state.visible;
      },
      autoDestroy: false,
      getComponent(instance, extra) {
        const props = instance.props;
        const dialogProps = pick(props, [
          'className', 'closable', 'maskClosable',
          'title', 'footer', 'mask', 'keyboard',
          'animation', 'transitionName',
          'maskAnimation', 'maskTransitionName', 'mousePosition',
          'prefixCls', 'style', 'width', 'wrapStyle',
          'height', 'zIndex', 'bodyStyle', 'wrapClassName',
        ]);
        return (
          <Dialog
            {...dialogProps}
            onClose={instance.onClose}
            visible={instance.state.visible}
            {...extra}
            key="dialog"
          >
            {props.children}
          </Dialog>
        );
      },
    }),
  ],

  getDefaultProps() {
    return {
      className: '',
      mask: true,
      keyboard: true,
      closable: true,
      maskClosable: true,
      prefixCls: 'rc-dialog',
      onClose: noop,
    };
  },

  getInitialState() {
    return {
      visible: this.props.visible,
    };
  },

  componentWillReceiveProps({ visible }) {
    if (visible !== undefined) {
      this.setState({
        visible,
      });
    }
  },

  shouldComponentUpdate(_, nextState) {
    return !!(this.state.visible || nextState.visible);
  },

  componentWillUnmount() {
    if (this.state.visible) {
      this.renderComponent({
        onAfterClose: this.removeContainer,
        onClose: noop,
        visible: false,
      });
    } else {
      this.removeContainer();
    }
  },

  onClose(e) {
    this.props.onClose(e);
  },

  getElement(part) {
    return this._component.getElement(part);
  },

  render() {
    return null;
  },
});

export default DialogWrap;
