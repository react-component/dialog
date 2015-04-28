/** @jsx React.DOM */

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
  getDialogContainer() {
    if (!this.dialogContainer) {
      this.dialogContainer = document.createElement('div');
      document.body.appendChild(this.dialogContainer);
    }
    return this.dialogContainer;
  }

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
      var props = this.props;
      this.setState({
        visible: true
      }, ()=> {
        props.onShow();
      });
    }
  }

  close() {
    if (this.state.visible) {
      var props = this.props;
      this.setState({
        visible: false
      }, () => {
        props.onClose();
      });
    }
  }

  requestClose() {
    if (this.props.onBeforeClose(this) !== false) {
      this.close();
    }
  }

  renderDialog() {
    var props = this.props;
    var dialogProps = copy(props, ['className', 'closable', 'align',
      'prefixCls', 'style', 'width', 'height', 'zIndex']);
    var dialogElement = <Dialog
      visible={this.state.visible}
    {...dialogProps}
      onClose={this.requestClose}>
    {props.children}
    </Dialog>;
    this.dialogInstance = React.render(dialogElement, this.getDialogContainer());
  }

  render() {
    return null;
  }

  componentDidMount() {
    this.componentDidUpdate();
    if (this.state.visible) {
      this.props.onShow();
    }
  }

  componentDidUpdate() {
    if (this.dialogInstance || this.state.visible) {
      this.renderDialog();
    }
  }

  componentWillUnmount() {
    if (this.dialogContainer) {
      React.unmountComponentAtNode(this.getDialogContainer());
    }
  }
}

DialogWrap.defaultProps = {
  className: '',
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100]
  },
  closable: true,
  prefixCls: 'rc-dialog',
  visible: false,
  onBeforeClose: noop,
  onShow: noop,
  onClose: noop
};

module.exports = DialogWrap;
