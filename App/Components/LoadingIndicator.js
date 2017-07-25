import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';

// Configs
// Redux
// Components
// Styles
import styles from './Styles/LoadingIndicatorStyles.js';
// Libs
// External Libs

class LoadingIndicator extends Component {
  render() {
    if (this.props.active) {
      return (
        <View style={styles.container} visible={this.props.active}>
          <View style={styles.indicatorView} >
            <ActivityIndicator color="white" />
            {this.props.text && <Text style={styles.loadingAlertText}>{this.props.text}</Text>}
          </View>
        </View>
      );
    } else {
      return (
        <View />
      )
    }
  }
}

LoadingIndicator.propTypes = {
  active: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string
};

export default LoadingIndicator;
