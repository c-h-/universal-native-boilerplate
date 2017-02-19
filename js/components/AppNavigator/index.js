import {
  Platform,
} from 'react-native';
import TabNavigator from './TabNavigator';
import TabRoutes from './TabRoutes';
import sharedTabBarOptions from './sharedTabBarOptions';

const containerOptions = {};
switch (Platform.OS) {
  case 'android': {
    containerOptions.URIPrefix = 'unb://unb';
    break;
  }
  case 'ios': {
    containerOptions.URIPrefix = 'unb://';
    break;
  }
  default: {
    break;
  }
}

const AppNavigator = TabNavigator(TabRoutes, {
  initialRouteName: 'Home',
  tabBarOptions: sharedTabBarOptions,
}, {
  containerOptions,
});

export default AppNavigator;
