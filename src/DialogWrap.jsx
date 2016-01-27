import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';
import assign from 'object-assign';

function noop() {
}

function copy(obj, fields) {
  const ret = {};
  fields.forEach((f)=> {
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
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement(), this.getDialogContainer());
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
      this.dialogContainer.className = `${this.props.prefixCls}-container`;
      document.body.appendChild(this.dialogContainer);
    }
    return this.dialogContainer;
  }

  getDialogElement(extra) {
    const props = this.props;
    const dialogProps = copy(props, [
      'className', 'closable', 'align',
      'title', 'footer', 'mask',
      'animation', 'transitionName',
      'maskAnimation', 'maskTransitionName', 'mousePosition',
      'prefixCls', 'style', 'width',
      'height', 'zIndex',
    ]);

    assign(dialogProps, {
      onClose: this.onClose,
      visible: this.state.visible,
    }, extra);
    return (<Dialog {...dialogProps} key="dialog">
      {props.children}
    </Dialog>);
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
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100],
  },
  mask: true,
  closable: true,
  prefixCls: 'rc-dialog',
  onClose: noop,
};

DialogWrap.propTypes = {
  className: React.PropTypes.string,
  align: React.PropTypes.shape({
    align: React.PropTypes.array,
    offset: React.PropTypes.arrayOf(React.PropTypes.number),
  }),
  mask: React.PropTypes.bool,
  closable: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  visible: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};

export default DialogWrap;
