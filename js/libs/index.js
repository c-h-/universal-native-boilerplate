import {
  Platform,
} from 'react-native';

/**
 * Web only libs
 */
if (Platform.OS === 'web') {
  console.log('in 1');
  // enable icons fonts
  require('./fonts');

  // enable offline support on web platform
  require('./pwa');
}
