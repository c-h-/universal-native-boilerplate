import {
  TabNavigator,
} from 'react-navigation';

import navigatorOptions from './AppRoutes';

const AppNavigator = TabNavigator(navigatorOptions, {
  initialRouteName: 'Home',
});

export default AppNavigator;
