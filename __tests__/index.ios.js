/* global it:false */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ClientApp from '../js/components/ClientApp';


it('renders correctly', () => {
  renderer.create(
    <ClientApp />
  );
});
