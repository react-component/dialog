'use strict';

var React = require('react');
var Dialog = require('./Dialog');
var assign = require('object-assign');

function noop() {
}

function copy(obj, fields) {
  var ret = {};
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
      visible: this.props.visible
    };
    ['cleanDialogContainer', 'requestClose', 'close', 'handleClose', 'handleShow'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillReceiveProps(props) {
    if (this.state.visible !== props.visible) {
      if (props.visible) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.visible && !nextState.visible) {
      return false;
    }
    return true;
  }

  show() {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    }
  }

  close() {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  }

  requestClose() {
    var onBeforeClose = this.props.onBeforeClose;
    var close = this.close;
    if (onBeforeClose) {
      if (onBeforeClose.length) {
        onBeforeClose(close);
      } else {
        var ret = onBeforeClose();
        if (ret && ret.then) {
          ret.then(close);
        } else {
          close();
        }
      }
    } else {
      close();
    }
  }

  getDialogContainer() {
    if (!this.dialogContainer) {
      this.dialogContainer = document.createElement('div');
      this.dialogContainer.className = `${this.props.prefixCls}-container`;
      document.body.appendChild(this.dialogContainer);
    }
    return this.dialogContainer;
  }

  handleClose() {
    this.props.onClose();
  }

  handleShow() {
    this.props.onShow();
  }

  getDialogElement(extra) {
    var props = this.props;
    var dialogProps = copy(props, [
      'className', 'closable', 'align',
      'title', 'footer',
      'animation', 'transitionName',
      'maskAnimation', 'maskTransitionName',
      'prefixCls', 'style', 'width',
      'height', 'zIndex'
    ]);

    assign(dialogProps, {
      onClose: this.handleClose,
      onShow: this.handleShow,
      visible: this.state.visible,
      onRequestClose: this.requestClose
    }, extra);

    return <Dialog {...dialogProps}>
    {props.children}
    </Dialog>;
  }

  render() {
    if (this.state.visible) {
      this.dialogRendered = true;
    }
    return this.props.renderToBody ? null : (this.dialogRendered ? this.getDialogElement() : null);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.renderToBody && this.dialogRendered) {
      React.render(this.getDialogElement(), this.getDialogContainer());
    }
  }

  cleanDialogContainer() {
    React.unmountComponentAtNode(this.getDialogContainer());
    document.body.removeChild(this.dialogContainer);
    this.dialogContainer = null;
  }

  componentWillUnmount() {
    if (this.dialogContainer) {
      if (this.state.visible) {
        React.render(this.getDialogElement({
          onClose: this.cleanDialogContainer,
          visible: false
        }), this.dialogContainer);
      } else {
        this.cleanDialogContainer();
      }
    }
  }
}

DialogWrap.defaultProps = {
  className: '',
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100]
  },
  renderToBody: true,
  closable: true,
  prefixCls: 'rc-dialog',
  visible: false,
  onShow: noop,
  onClose: noop
};

module.exports = DialogWrap;
