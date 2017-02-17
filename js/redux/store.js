import {
  Platform,
} from 'react-native';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middlewares/logger';
import workerMiddleware from './middlewares/worker';

import storageEngine from './storageEngine';
import reducer from './reducers';
import ActionTypes from './action_types.json';

const persistConfig = {
  keyPrefix: 'app:',
  // don't restore data from these reducers
  blacklist: [
    'transient',
    'nav',
  ],
};
if (Platform.OS !== 'web') {
  persistConfig.storage = storageEngine;
}

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
      applyMiddleware(workerMiddleware, thunkMiddleware, loggerMiddleware)
    )
  );
  persistStore(store, persistConfig, () => {
    // called when rehydration complete
    console.log('INIT STATE', store.getState());
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
