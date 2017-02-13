import React from 'react';
import {
  Provider,
} from 'react-redux';

import {
  getStore,
} from '../redux/store';
import App from './App';

const Wrapper = () => {
  return (
    <Provider store={getStore()}>
      <App />
    </Provider>
  );
};

export default Wrapper;
