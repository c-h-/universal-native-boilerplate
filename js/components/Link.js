import React, {
  PropTypes,
  Component,
} from 'react';
import {
  Platform,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

/**
 * A "link" for wiring up buttons to routes and the internet
 */
class Link extends Component {
  static contextTypes = {
    store: PropTypes.object,
    getURIForAction: PropTypes.func,
  };
  static propTypes = {
    children: PropTypes.any,
    href: PropTypes.string,
    style: PropTypes.any,
    containerStyle: PropTypes.any,
  }
  getAction = () => {
    const {
      href,
    } = this.props;
    if (typeof href === 'string') {
      return NavigationActions.navigate({
        routeName: href,
      });
    }
    return null;
  }
  handlePress = (e) => {
    if (e && e.preventDefault) { // stop web links from changing page
      e.preventDefault();
    }
    const {
      dispatch,
    } = this.context.store;
    const action = this.getAction();
    if (action) {
      dispatch(action);
    }
  }
  render() {
    const {
      getURIForAction,
    } = this.context;
    const {
      children,
      style,
      containerStyle,
    } = this.props;
    let toRender = children;
    if (Array.isArray(children)) {
      toRender = (
        <View style={style}>
          {children}
        </View>
      );
    }
    else if (typeof children === 'string') {
      toRender = (
        <Text style={style}>
          {children}
        </Text>
      );
    }
    let CompToRender = TouchableHighlight;
    const extraProps = {};
    if (Platform.OS === 'web') {
      // see https://github.com/necolas/react-native-web/issues/65
      CompToRender = Text;
      extraProps.accessibilityRole = 'link';
      extraProps.href = getURIForAction(this.getAction());
    }
    return (
      <CompToRender
        onPress={this.handlePress}
        style={containerStyle}
        {...extraProps}
      >
        { toRender }
      </CompToRender>
    );
  }
}

export default Link;
