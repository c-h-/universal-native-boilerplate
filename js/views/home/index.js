import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';
import Random from './components/Random';

class Home extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.*.js
        </Text>
        <Random />
      </View>
    );
  }
}

export default Home;
