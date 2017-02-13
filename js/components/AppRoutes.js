
import Home from '../views/Home';
import IconsGrid from '../views/IconsGrid';
import NotFound from '../views/NotFound';

const navigatorOptions = {
  Home: {
    screen: Home,
    path: 'home',
  },
  IconsGrid: {
    screen: IconsGrid,
    path: 'icons',
  },
  NotFound: {
    screen: NotFound,
    path: '404',
    navigationOptions: {
      title: 'Nothing Found',
    },
  },
};

export default navigatorOptions;
