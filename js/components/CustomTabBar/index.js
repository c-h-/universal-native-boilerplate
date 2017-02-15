import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import Link from '../Link';

import styles from './styles';

const CustomTabBar = ({ navigation, router, tabBarOptions }) => {
  const links = navigation.state ? [
    ...navigation.state.routes.map((route, i) => {
      if (route.routeName === 'NotFound') {
        return null;
      }
      const isActive = i === navigation.state.index;
      const nav = {
        state: route,
      };
      const tabBarConfig = router.getScreenConfig(nav, 'tabBar');
      let icon;
      if (typeof tabBarOptions.showIcon !== 'boolean' || tabBarOptions.showIcon) {
        icon = typeof tabBarConfig.icon === 'function'
          ? tabBarConfig.icon({
            tintColor: isActive ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor,
          })
          : tabBarConfig.icon;
      }
      let label;
      if (typeof tabBarOptions.showLabel !== 'boolean' || tabBarOptions.showLabel) {
        label = tabBarConfig.label;
      }
      const activeStyles = isActive ? {
        backgroundColor: tabBarOptions.activeBackgroundColor,
      } : {
        backgroundColor: tabBarOptions.inactiveBackgroundColor,
      };
      return (
        <Link
          href={route.routeName}
          key={route.routeName}
          style={styles.link}
          containerStyle={[
            styles.linkContainer,
            tabBarOptions.tabStyle,
            activeStyles,
          ]}
        >
          {icon}
          <Text
            style={tabBarOptions.labelStyle}
          >
            {label}
          </Text>
        </Link>
      );
    }),
  ] : [];
  return (
    <View
      style={[styles.customTabBar, tabBarOptions.style]}
    >
      {links}
    </View>
  );
};

CustomTabBar.propTypes = {
  navigation: PropTypes.object,
  router: PropTypes.object,
  tabBarOptions: PropTypes.object,
};

export default CustomTabBar;
