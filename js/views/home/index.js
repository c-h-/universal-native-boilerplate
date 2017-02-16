import React, {
  Component,
  PropTypes,
} from 'react';
import {
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import { add1Action } from './actions';
import styles from './styles';
import Random from './components/Random';

class Home extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };
  handlePress = () => {
    const {
      dispatch,
    } = this.context.store;
    const action = add1Action(50);
    if (action) {
      dispatch(action);
    }
  }
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
        <TouchableHighlight onPress={this.handlePress}>
          <Text>{'Dispatch worker action'}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Home;
