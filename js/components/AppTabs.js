import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import Link from '../Link';

const AppTabs = ({ navigation }) => {
  const links = navigation.state ? [
    ...navigation.state.routes.map((route, i) => {
      if (route.routeName === 'NotFound') {
        return null;
      }
      const isActive = i === navigation.state.index;
      return (
        <Text>{route.routeName}</Text>
        
      );
      /**
       * <Link
          to={route.routeName}
          key={route.routeName}
        >
          {route.routeName}
        </Link>
       */
    }),
  ] : [];
  return (
    <View>
      {links}
    </View>
  );
};

AppTabs.propTypes = {
  navigation: PropTypes.object,
};

export default AppTabs;
