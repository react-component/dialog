import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

function noop() {
}

function copy(obj, fields) {
  const ret = {};
  fields.forEach((f) => {
    if (obj[f] !== undefined) {
      ret[f] = obj[f];
    }
  });
  return ret;
}

class DialogWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    ['onClose', 'cleanDialogContainer'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(props) {
    if ('visible' in props) {
      this.setState({
        visible: props.visible,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.visible || nextState.visible);
  }

  componentDidUpdate() {
    if (this.dialogRendered) {
      this.dialogInstance = ReactDOM.unstable_renderSubtreeIntoContainer(this,
        this.getDialogElement(), this.getDialogContainer());
    }
  }

  componentWillUnmount() {
    if (this.dialogContainer) {
      if (this.state.visible) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement({
          onAfterClose: this.cleanDialogContainer,
          onClose: noop,
          visible: false,
        }), this.dialogContainer);
      } else {
        this.cleanDialogContainer();
      }
    }
  }

  onClose(e) {
    this.props.onClose(e);
  }

  getDialogContainer() {
    if (!this.dialogContainer) {
      this.dialogContainer = document.createElement('div');
      const dialogProps = copy(this.props, ['prefixCls']);
      this.dialogContainer.className = `${dialogProps.prefixCls}-container`;
      document.body.appendChild(this.dialogContainer);
    }
    return this.dialogContainer;
  }

  getDialogElement(extra) {
    const props = this.props;
    let dialogProps = copy(props, [
      'className', 'closable', 'maskClosable',
      'title', 'footer', 'mask', 'keyboard',
      'animation', 'transitionName',
      'maskAnimation', 'maskTransitionName', 'mousePosition',
      'prefixCls', 'style', 'width',
      'height', 'zIndex', 'bodyStyle',
    ]);
    dialogProps = {
      ...dialogProps,
      onClose: this.onClose,
      visible: this.state.visible,
      ...extra,
    };
    return (<Dialog {...dialogProps} key="dialog">
      {props.children}
    </Dialog>);
  }

  getElement(part) {
    return this.dialogInstance.getElement(part);
  }

  cleanDialogContainer() {
    ReactDOM.unmountComponentAtNode(this.getDialogContainer());
    document.body.removeChild(this.dialogContainer);
    this.dialogContainer = null;
  }

  render() {
    this.dialogRendered = this.dialogRendered || this.state.visible;
    return null;
  }
}

DialogWrap.defaultProps = {
  className: '',
  mask: true,
  keyboard: true,
  closable: true,
  maskClosable: true,
  prefixCls: 'rc-dialog',
  onClose: noop,
};

DialogWrap.propTypes = {
  className: PropTypes.string,
  keyboard: PropTypes.bool,
  mask: PropTypes.bool,
  closable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DialogWrap;
