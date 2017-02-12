import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import Home from './views/home';

const App = (props) => {
  if (props.appReady) {
    return (
      <Home />
    );
  }
  else {
    return (
      <Text>Loading...</Text>
    );
  }
};

App.propTypes = {
  appReady: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    appReady: state.transient.appReady,
  };
}

export default connect(mapStateToProps)(App);
