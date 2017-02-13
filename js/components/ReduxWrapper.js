import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  Platform,
} from 'react-native';

import {
  getStore,
} from '../redux/store';
import App from './App';

// enable offline support on web platform
if (Platform.OS === 'web') {
  require('../offline/pwa');
}

const Wrapper = () => {
  return (
    <Provider store={getStore()}>
      <App />
    </Provider>
  );
};

export default Wrapper;
