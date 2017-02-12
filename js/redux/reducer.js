import {
  combineReducers,
} from 'redux';

import AppNavigator from '../navigation/AppNavigator';

import transient from './reducers/transient';
import home from '../views/Home/reducer';

export default combineReducers({
  transient,
  // nav: (state, action) => (
  //   AppNavigator.router.getStateForAction(action, state)
  // ),
  home,
});
