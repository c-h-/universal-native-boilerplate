import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

class IconsGrid extends Component {
  static navigationOptions = {
    title: 'Icons',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Icons
        </Text>
      </View>
    );
  }
}

export default IconsGrid;
