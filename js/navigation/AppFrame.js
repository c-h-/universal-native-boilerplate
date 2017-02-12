import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Platform,
  Text,
} from 'react-native';
import {
  addNavigationHelpers,
} from 'react-navigation';

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
      state: navigation.state.routes[navigation.state.index],
    });
    const {
      routes,
      index,
    } = navigation;
    const Scene = router.getComponentForRouteName(routes[index].routeName);
    return (
      <View>
        <Text>Hi</Text>
        {/*<Scene navigation={childNavigation} />*/}
        {/*<AppTabs navigation={navigation} />*/}
      </View>
    );
  }
}

export default AppFrame;
