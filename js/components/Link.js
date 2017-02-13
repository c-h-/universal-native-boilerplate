import React, {
  PropTypes,
  Component,
} from 'react';
import {
  View,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

class Link extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };
  static propTypes = {
    href: PropTypes.string,
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
  handleClick = () => {
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
    } = this.props;
    return (
      <View
        onClick={this.handleClick}
      >
        {children}
      </View>
    );
  }
}

Link.propTypes = {
  children: PropTypes.any,
};

export default Link;
