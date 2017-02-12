import React, {
  PropTypes,
} from 'react';
import {
  TabRouter,
} from 'react-navigation';

import navigatorOptions from './AppRoutes';
import AppFrame from './AppFrame';

const Router = TabRouter(navigatorOptions);

const AppNavigator = ({ navigation }) => {
  return (
    <AppFrame
      router={Router}
      navigation={navigation}
    />
  );
};
AppNavigator.router = Router;

AppNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default AppNavigator;
