import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './Dialog';
import ContainerRender from 'rc-util/lib/ContainerRender';
import Portal from 'rc-util/lib/Portal';
import IDialogPropTypes from './IDialogPropTypes';

const IS_REACT_16 = !!ReactDOM.createPortal;

class DialogWrap extends React.Component<IDialogPropTypes, any> {
  static defaultProps  = {
    visible: false,
  };

  _component: React.ReactElement<any>;

  renderComponent: (props: any) => void;

  removeContainer: () => void;

  shouldComponentUpdate({ visible }: { visible: boolean }) {
    return !!(this.props.visible || visible);
  }

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
  }

  saveDialog = (node: any) => {
    this._component = node;
 }

  getComponent = (extra = {}) => {
    return (
      <Dialog
        ref={this.saveDialog}
        {...this.props}
        {...extra}
        key="dialog"
      />
    );
  }

  getContainer = () => {
    if (this.props.getContainer) {
      return this.props.getContainer();
    }
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  render() {
    const { visible } = this.props;

    let portal: any = null;

    if (!IS_REACT_16) {
      return (
        <ContainerRender
          parent={this}
          visible={visible}
          autoDestroy={false}
          getComponent={this.getComponent}
          getContainer={this.getContainer}
        >
          {({ renderComponent, removeContainer }: { renderComponent: any, removeContainer: any }) => {
            this.renderComponent = renderComponent;
            this.removeContainer = removeContainer;
            return null;
          }}
        </ContainerRender>
      );
    }

    if (visible || this._component) {
      portal = (
        <Portal getContainer={this.getContainer}>
          {this.getComponent()}
        </Portal>
      );
    }

    return portal;
  }
}

export default DialogWrap;
