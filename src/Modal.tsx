import React from 'react';
import {
  View, Modal, Animated,
  TouchableWithoutFeedback,
  StyleSheet, Dimensions,
  Easing,
} from 'react-native';
import TimingAnimationConfig = __React.Animated.TimingAnimationConfig;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: 'black',
    opacity: .5,
  },
  content: {
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const screen = Dimensions.get('window');

export type Entry = 'top'|'bottom';

export interface ModalPropTypes {
  wrapStyle?: {};
  maskStyle?: {};
  style?: {};
  entry?: Entry;
  animationDuration?: number;
  visible: boolean;
  animateAppear?: boolean;
  onClose?: () => void;
  onAnimationEnd?: (visible: boolean) => void;
}

const RCModal = React.createClass<ModalPropTypes, any>({
  getDefaultProps() {
    return {
      wrapStyle: styles.wrap,
      maskStyle: styles.mask,
      entry: 'bottom' as Entry,
      animateAppear: false,
      animationDuration: 300,
      visible: false,
      onClose() {
      },
      onAnimationEnd(visible: boolean) {

      },
    };
  },

  getInitialState() {
    const { visible } = this.props;
    return {
      position: new Animated.Value(this.getPosition(visible)),
      maskOpacity: new Animated.Value(this.getMaskOpacity(visible)),
      modalVisible: visible
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.shouldComponentUpdate(nextProps)) {
      this.setState({
        modalVisible: true,
      });
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible || this.props.visible !== nextProps.visible) {
      return true;
    }
    if (nextState) {
      if (nextState.modalVisible !== this.state.modalVisible) {
        return true;
      }
    }
    return false;
  },

  componentDidMount() {
    if (this.props.animateAppear) {
      this.componentDidUpdate({});
    }
  },

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.visible !== props.visible) {
      this.animateDialog(props.visible);
    }
  },

  animateMask(visible) {
    this.stopMaskAnim();
    this.state.maskOpacity.setValue(this.getMaskOpacity(!visible));
    this.animMask = Animated.timing(
      this.state.maskOpacity,
      {
        toValue: this.getMaskOpacity(visible),
        duration: this.props.animationDuration
      }
    );
    this.animMask.start(() => {
      this.animMask = null;
    });
  },

  stopMaskAnim() {
    if (this.animMask) {
      this.animMask.stop();
      this.animMask = null;
    }
  },

  stopDialogAnim() {
    if (this.animDialog) {
      this.animDialog.stop();
      this.animDialog = null;
    }
  },

  animateDialog(visible) {
    this.stopDialogAnim();
    this.animateMask(visible);

    this.state.position.setValue(this.getPosition(!visible));

    this.animDialog = Animated.timing(
      this.state.position,
      {
        toValue: this.getPosition(visible),
        duration: this.props.animationDuration,
        easing: (visible ? Easing.elastic(0.8) : undefined) as any,
      } as TimingAnimationConfig
    );
    this.animDialog.start(() => {
      this.animDialog = null;
      if (!visible) {
        this.setState({
          modalVisible: false,
        });
      }
      this.props.onAnimationEnd(visible);
    });
  },

  close() {
    this.animateDialog(false);
  },

  getPosition(visible) {
    if (visible) {
      return 0;
    }
    return this.props.entry === 'top' ? -screen.height : screen.height;
  },

  getMaskOpacity(visible) {
    return visible ? 1 : 0;
  },

  render() {
    const { props } = this;
    if (!this.state.modalVisible) {
      return null;
    }
    return (
      <Modal
        visible
        transparent
        onRequestClose={this.props.onClose}
      >
        <View style={[styles.wrap, props.wrapStyle]}>
          <TouchableWithoutFeedback
            onPress={this.props.onClose}
          >
            <Animated.View
              style={[styles.absolute, { opacity: this.state.maskOpacity }]}
            >
              <View style={[styles.absolute, props.maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[styles.content, props.style, { transform: [{ translateY: this.state.position }] }]}
          >
            {this.props.children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
});

export default RCModal;
