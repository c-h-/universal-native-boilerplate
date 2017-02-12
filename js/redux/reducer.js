import {
  combineReducers,
} from 'redux';

import transient from './reducers/transient';
import home from '../views/home/reducer';

export default combineReducers({
  transient,
  home,
});
