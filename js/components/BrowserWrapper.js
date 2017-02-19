import React, {
  PropTypes,
} from 'react';
import {
  addNavigationHelpers,
} from 'react-navigation';

/**
 * No need for URL support outside browser
 */
export default (NavigationAwareView) => {
  const BrowserWrapper = ({ dispatch, state }) => {
    return (
      <NavigationAwareView
        navigation={addNavigationHelpers({
          dispatch,
          state,
        })}
      />
    );
  };
  BrowserWrapper.propTypes = {
    dispatch: PropTypes.func,
    state: PropTypes.object,
  };
  return BrowserWrapper;
};

