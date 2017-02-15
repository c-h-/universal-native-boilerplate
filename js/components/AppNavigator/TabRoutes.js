import {
  notFoundKey,
  AppRoutes,
} from '../AppRoutes';

const TabRoutes = {};
for (const key in AppRoutes) {
  if (key !== notFoundKey) {
    TabRoutes[key] = AppRoutes[key];
  }
}

export default TabRoutes;
