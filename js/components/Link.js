import React, {
  PropTypes,
  Component,
} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

class Link extends Component {
  static contextTypes = {
    store: PropTypes.object,
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
  handlePress = () => {
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
    return (
      <TouchableHighlight
        onPress={this.handlePress}
        style={containerStyle}
      >
        { toRender }
      </TouchableHighlight>
    );
  }
}

export default Link;
