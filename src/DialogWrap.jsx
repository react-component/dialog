'use strict';

var React = require('react');
var Dialog = require('./Dialog');

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
    this.requestClose = this.requestClose.bind(this);
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
    if (this.props.onBeforeClose(this) !== false) {
      this.close();
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

  getDialogElement() {
    var props = this.props;
    var dialogProps = copy(props, [
      'className', 'closable', 'align',
      'title', 'footer',
      'animation', 'transitionName',
      'maskAnimation', 'maskTransitionName',
      'prefixCls', 'style', 'width',
      'height', 'zIndex'
    ]);
    return <Dialog
      wrap={this}
      visible={this.state.visible}
    {...dialogProps}
      onClose={this.requestClose}>
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

  componentWillUnmount() {
    if (this.dialogContainer) {
      React.unmountComponentAtNode(this.getDialogContainer());
      document.body.removeChild(this.dialogContainer);
      this.dialogContainer = null;
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
  onBeforeClose: noop,
  onShow: noop,
  onClose: noop
};

module.exports = DialogWrap;
