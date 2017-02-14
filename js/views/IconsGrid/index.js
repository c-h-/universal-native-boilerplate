import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <Text>Sup</Text>
        <Icon name="accessibility" size={30} color="#900" />
      </View>
    );
  }
}

export default IconsGrid;
