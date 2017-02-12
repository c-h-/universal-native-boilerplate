import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  connect,
} from 'react-redux';

import {
  getRandomNumber,
} from './actions';
import styles from '../../styles';

class Home extends Component {
  componentWillMount() {
    const {
      random,
      dispatch,
    } = this.props;
    if (!random) {
      dispatch(getRandomNumber());
    }
  }

  render() {
    const {
      random,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.*.js
        </Text>
        <Text>
          This random number should be the same across reloads:
        </Text>
        <Text>
          {random}
        </Text>
      </View>
    );
  }
}

Home.propTypes = {
  random: PropTypes.number,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    random: state.home.random,
  };
}

export default connect(mapStateToProps)(Home);
