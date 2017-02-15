import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';
import Icon from '../../components/Icon';

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
        <Text>Sup</Text>
        <Icon name="person" />
      </View>
    );
  }
}

export default IconsGrid;
