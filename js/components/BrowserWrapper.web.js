import React, {
  Component,
  PropTypes,
} from 'react';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

function getAction(router, path, params) {
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

/**
 * Enables URL support in browser
 */
export default (NavigationAwareView) => {
  const initialAction = getAction(NavigationAwareView.router, window.location.pathname.substr(1));

  class NavigationContainer extends Component {
    static propTypes = {
      state: PropTypes.object,
      dispatch: PropTypes.func,
    }
    static childContextTypes = {
      getActionForPathAndParams: React.PropTypes.func.isRequired,
      getURIForAction: React.PropTypes.func.isRequired,
    };
    getChildContext() {
      return {
        getActionForPathAndParams: this.getActionForPathAndParams,
        getURIForAction: this.getURIForAction,
      };
    }
    componentWillMount() {
      // when component first mounts, app is ready. navigate to initial route.
      const {
        dispatch,
      } = this.props;
      dispatch(initialAction);
    }
    getURIForAction = (action) => {
      const state = NavigationAwareView.router.getStateForAction(action, this.state) || this.state;
      const { path } = NavigationAwareView.router.getPathAndParamsForState(state);
      return `/${path}`;
    }
    getActionForPathAndParams = (path, params) => {
      return NavigationAwareView.router.getActionForPathAndParams(path, params);
    }
    render() {
      const {
        state,
        dispatch,
      } = this.props;
      return (
        <NavigationAwareView
          navigation={addNavigationHelpers({
            state,
            dispatch,
          })}
        />
      );
    }
  }

  return NavigationContainer;
};
