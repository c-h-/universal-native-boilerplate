import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';
import Icon from '../../components/Icon';

const IconsGrid = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Icons
      </Text>
      <Icon name="person" />
    </View>
  );
};

export default IconsGrid;
