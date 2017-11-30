import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import Home from '../views/Home';
import IconsGrid from '../views/IconsGrid';
import NotFound from '../views/NotFound';
import Translation from '../views/Translation';

export const notFoundKey = 'NotFound';

/**
 * Gets an Icon component.
 */
const getIcon = (name) => {
  const comp = ({ tintColor }) => (
    <Icon
      name={name}
      style={{
        color: tintColor,
      }}
    />
  );
  comp.propTypes = {
    tintColor: PropTypes.string,
  };
  return comp;
};

/**
 * The routes for the App
 */
export const AppRoutes = {
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: {
      title: 'Welcome',
      tabBarLabel: 'Welcome',
      tabBarIcon: getIcon('home'),
    },
  },
  IconsGrid: {
    screen: IconsGrid,
    path: 'icons',
    navigationOptions: {
      title: 'Icons',
      tabBarLabel: 'Icons',
      tabBarIcon: getIcon('view-module'),
    },
  },
  Translation: {
    screen: Translation,
    path: 'translation',
    navigationOptions: {
      title: 'Translation',
      tabBarLabel: 'Translation',
      tabBarIcon: getIcon('translate'),
    },
  },
  NotFound: {
    screen: NotFound,
    path: '404',
    navigationOptions: {
      title: 'Nothing Found',
    },
  },
};
