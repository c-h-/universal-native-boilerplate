import React, {
  PropTypes,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const SceneContainer = (props) => {
  const {
    children,
  } = props;
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

SceneContainer.propTypes = {
  children: PropTypes.any,
};

export default SceneContainer;
