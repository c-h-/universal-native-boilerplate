import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Platform,
  Dimensions,
} from 'react-native';
import {
  addNavigationHelpers,
} from 'react-navigation';

import SceneContainer from './SceneContainer';
import CustomTabBar from '../CustomTabBar';

class AppFrame extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    router: PropTypes.object,
    tabBarOptions: PropTypes.object,
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
      tabBarOptions,
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
      <View
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
      >
        <CustomTabBar
          navigation={navigation}
          router={router}
          tabBarOptions={tabBarOptions}
        />
        <SceneContainer>
          <Scene navigation={childNavigation} />
        </SceneContainer>
      </View>
    );
  }
}

export default AppFrame;
