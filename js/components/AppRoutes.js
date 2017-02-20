import React, {
  PropTypes,
} from 'react';

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
      tabBar: {
        label: 'Welcome',
        icon: getIcon('home'),
      },
    },
  },
  IconsGrid: {
    screen: IconsGrid,
    path: 'icons',
    navigationOptions: {
      title: 'Icons',
      tabBar: {
        label: 'Icons',
        icon: getIcon('view-module'),
      },
    },
  },
  Translation: {
    screen: Translation,
    path: 'translation',
    navigationOptions: {
      title: 'Translation',
      tabBar: {
        label: 'Translation',
        icon: getIcon('translate'),
      },
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
