import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Linking,
  Platform,
} from 'react-native';
import {
  addNavigationHelpers,
} from 'react-navigation';
import getAction from './getAction';

/**
 * No need for URL support outside browser
 */
export default (NavigationAwareView) => {
  class NavigationContainer extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      state: PropTypes.object,
    }
    state = {
      initUrl: null,
    };
    async componentDidMount() {
      const {
        dispatch,
      } = this.props;
      if (typeof Linking.getInitialURL === 'function') {
        const initURL = await Linking.getInitialURL();
        if (initURL && initURL.length) {
          const pathFromURL = initURL.slice(initURL.indexOf('://') + 3);
          const deepLinkAction = getAction(
            NavigationAwareView.router,
            // Android usually includes hostname so slice that out too
            Platform.OS === 'android'
              ? pathFromURL.slice(pathFromURL.indexOf('/') + 1)
              : pathFromURL
          );
          dispatch(deepLinkAction);
        }
      }
    }
    render() {
      const {
        dispatch,
        state,
      } = this.props;
      return (
        <NavigationAwareView
          navigation={addNavigationHelpers({
            dispatch,
            state,
          })}
        />
      );
    }
  }
  return NavigationContainer;
};

