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
 * exportable function for creating the store
 * (exported for use with server-side rendering)
 */
export function generateStore(initialState, hydrate = true) {
  // conditionally add args to store
  const args = [
    hydrate ? autoRehydrate() : null,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  ].filter(arg => arg !== null);

  // create the store
  return createStore(
    reducer,
    initialState,
    compose(
      ...args
    )
  );
}

/**
 *  start out the app with the stored state
 */
function init() {
  let preloadedState;
  if (
    typeof window !== 'undefined'
    && window.__PRELOADED_STATE__
  ) {
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
  }
  store = generateStore(preloadedState);
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
