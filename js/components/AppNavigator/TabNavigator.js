import React, {
  PropTypes,
} from 'react';
import {
  TabRouter,
} from 'react-navigation';

import AppFrame from './AppFrame';

export default (tabRoutes, options) => {
  const Router = TabRouter(tabRoutes, options);

  const AppNavigator = ({ navigation }) => {
    return (
      <AppFrame
        router={Router}
        navigation={navigation}
        tabBarOptions={options.tabBarOptions}
      />
    );
  };
  AppNavigator.router = Router;

  AppNavigator.propTypes = {
    navigation: PropTypes.object,
  };

  return AppNavigator;
};
