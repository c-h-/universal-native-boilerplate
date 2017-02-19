import {
  NavigationActions,
} from 'react-navigation';

export default function getAction(router, path, params) {
  const action = router.getActionForPathAndParams(path, params);
  if (action) {
    return action;
  }
  return NavigationActions.navigate({
    params: {
      path,
    },
    routeName: 'NotFound',
  });
}
