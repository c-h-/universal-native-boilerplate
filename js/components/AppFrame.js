import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Platform,
} from 'react-native';
import {
  addNavigationHelpers,
} from 'react-navigation';

import SceneContainer from './SceneContainer';
import AppTabs from './AppTabs';

class AppFrame extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    router: PropTypes.object,
  }
  componentWillReceiveProps(props) {
    if (this.props.navigation.state !== props.navigation.state) {
      if (Platform.OS === 'web') {
        window.scrollTo(0, 0);
      }
    }
  }
  render() {
    const {
      navigation,
      router,
    } = this.props;
    const childNavigation = addNavigationHelpers({
      ...navigation,
      state: navigation.state
        ? navigation.state.routes[navigation.state.index]
        : null,
    });
    const {
      routes,
      index,
    } = navigation.state;
    let Scene = null;
    if (routes) {
      Scene = router.getComponentForRouteName(routes[index].routeName);
    }
    return (
      <View>
        <SceneContainer>
          <Scene navigation={childNavigation} />
        </SceneContainer>
        <AppTabs navigation={navigation} />
      </View>
    );
  }
}

export default AppFrame;
