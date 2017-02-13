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
} from '../actions';

class Random extends Component {
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
      <View>
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

Random.propTypes = {
  random: PropTypes.number,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    random: state.home.random,
  };
}

export default connect(mapStateToProps)(Random);
