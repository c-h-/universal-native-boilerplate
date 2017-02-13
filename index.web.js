/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
} from 'react-native';

import Wrapper from './js/components/ReduxWrapper';

AppRegistry.registerComponent('UniversalNativeBoilerplate', () => Wrapper);

AppRegistry.runApplication('UniversalNativeBoilerplate', {
  rootTag: document.getElementById('container'),
});
