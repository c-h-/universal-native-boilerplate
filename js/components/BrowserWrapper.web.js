import React, {
  Component,
  PropTypes,
} from 'react';
import {
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

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
    componentDidMount() {
      const {
        dispatch,
        state,
      } = this.props;
      // set webpage title when page changes
      document.title = NavigationAwareView.router.getScreenConfig({
        state: state.routes[state.index],
        dispatch,
      }, 'title');
      // when url is changed, dispatch action to update view
      window.onpopstate = (e) => {
        e.preventDefault();
        const action = getAction(NavigationAwareView.router, window.location.pathname.substr(1));
        if (action) {
          dispatch(action);
        }
      };
    }
    componentWillUpdate(nextProps) {
      const {
        dispatch,
        state,
      } = nextProps;
      const {
        path,
      } = NavigationAwareView.router.getPathAndParamsForState(state);
      const uri = `/${path}`;
      // update url to match route state
      if (window.location.pathname !== uri) {
        window.history.pushState({}, state.title, uri);
      }
      // set webpage title when page changes
      document.title = NavigationAwareView.router.getScreenConfig({
        state: state.routes[state.index],
        dispatch,
      }, 'title');
    }
    getURIForAction = (action) => {
      const state = NavigationAwareView.router.getStateForAction(action, this.state) || this.state;
      const {
        path,
      } = NavigationAwareView.router.getPathAndParamsForState(state);
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
