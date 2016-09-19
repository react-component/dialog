import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Modal from '../../src/Modal';

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    width: 100,
    margin: 20,
  },
});


const Demo = React.createClass({
  getInitialState() {
    return {
      visible: false,
    };
  },
  open() {
    this.setState({
      visible: true,
    });
  },
  onClose() {
    this.setState({
      visible: false,
    });
  },
  render() {
    return (<View>
      <TouchableHighlight
        activeOpacity={0.5}
        style={[styles.button]}
        onPress={this.open}
        underlayColor="#a9d9d4"
      >
        <Text>show popup</Text>
      </TouchableHighlight>
      <Modal
        visible={this.state.visible}
        onClose={this.onClose}
        wrapStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          width: 300
        }}
      >
        <View style={{ padding: 100 }}>
          <Text>
            content
          </Text>
        </View>
      </Modal>
    </View>);
  },
});

AppRegistry.registerComponent('demo', () => Demo);
