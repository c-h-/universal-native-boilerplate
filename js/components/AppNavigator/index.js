import TabNavigator from './TabNavigator';
import TabRoutes from './TabRoutes';
import sharedTabBarOptions from './sharedTabBarOptions';

const AppNavigator = TabNavigator(TabRoutes, {
  initialRouteName: 'Home',
  tabBarOptions: sharedTabBarOptions,
});

export default AppNavigator;
