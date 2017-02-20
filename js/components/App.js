import React, {
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';

import '../libs';

import AppNavigator from './AppNavigator';
import URIWrapper from './URIWrapper';

const NavigationWrappedApp = URIWrapper(AppNavigator);

const App = (props) => {
  const {
    appReady,
    dispatch,
    nav,
  } = props;
  return (
    <NavigationWrappedApp
      dispatch={dispatch}
      state={nav}
      appReady={appReady}
    />
  );
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
