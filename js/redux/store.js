import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';

import logger from './middlewares/logger';
import storageEngine from './storageEngine';
import reducer from './reducer';
import ActionTypes from './action_types.json';

const persistConfig = {
  // storage: storageEngine,
  keyPrefix: 'app',
  // don't restore data from these reducers
  blacklist: [
    'transient',
  ],
};

let store;

/**
 *  start out the app with the stored state
 */
function init() {
  store = createStore(
    reducer,
    undefined,
    compose(
      autoRehydrate(),
      applyMiddleware(thunkMiddleware, logger)
    )
  );
  persistStore(store, persistConfig, () => {
    // called when rehydration complete
    store.dispatch({
      type: ActionTypes.SET_APP_READY,
      appReady: true,
    });
  });
  return store;
}

/**
 * Clear contents of store
 */
export function clearStore() {
  if (store) {
    persistStore(store, persistConfig).purge();
  }
}

/**
 * Get a reference to the store
 */
export function getStore() {
  if (!store) {
    store = init();
  }
  return store;
}
