import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';
import {
  connect,
} from 'react-redux';

import '../libs';

import AppNavigator from './AppNavigator';
import URIWrapper from './URIWrapper';

const ClientApp = URIWrapper(AppNavigator);

const App = (props) => {
  const {
    appReady,
    dispatch,
    nav,
  } = props;
  if (appReady) {
    return (
      <ClientApp
        dispatch={dispatch}
        state={nav}
      />
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
  nav: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    appReady: state.transient.appReady,
    nav: state.nav,
  };
}

export default connect(mapStateToProps)(App);
