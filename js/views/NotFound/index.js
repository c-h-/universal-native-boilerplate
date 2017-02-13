import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

class NotFound extends Component {
  static navigationOptions = {
    title: 'Not Found',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nothing found here
        </Text>
      </View>
    );
  }
}

export default NotFound;
