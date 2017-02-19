import React from 'react';
import {
  addNavigationHelpers,
} from 'react-navigation';

/**
 * No need for URL support outside browser
 */
export default (NavigationAwareView) => {
  return ({ dispatch, nav }) => {
    return (
      <NavigationAwareView
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
        })}
      />
    );
  };
};
