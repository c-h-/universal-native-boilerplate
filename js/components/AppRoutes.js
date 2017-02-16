import React from 'react';

import Icon from './Icon';
import Home from '../views/Home';
import IconsGrid from '../views/IconsGrid';
import NotFound from '../views/NotFound';
import Translation from '../views/Translation';

export const notFoundKey = 'NotFound';

export const AppRoutes = {
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: {
      title: 'Welcome',
      tabBar: {
        label: 'Welcome',
        icon: ({ tintColor }) => (
          <Icon
            name="home"
            style={{
              color: tintColor,
            }}
          />
        ),
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
        icon: ({ tintColor }) => (
          <Icon
            name="view-module"
            style={{
              color: tintColor,
            }}
          />
        ),
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
        icon: ({ tintColor }) => (
          <Icon
            name="translate"
            style={{
              color: tintColor,
            }}
          />
        ),
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
