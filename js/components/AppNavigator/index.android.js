import {
  TabNavigator,
} from 'react-navigation';

import TabRoutes from './TabRoutes';
import sharedTabBarOptions from './sharedTabBarOptions';

const AppNavigator = TabNavigator(TabRoutes, {
  initialRouteName: 'Home',
  tabBarPosition: 'top',
  tabBarOptions: sharedTabBarOptions,
}, {
  containerOptions: {
    URIPrefix: 'unb://unb',
  },
});

export default AppNavigator;
