import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from '../styles';

const HelloWorld = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.*.js
      </Text>
    </View>
  );
};

export default HelloWorld;
