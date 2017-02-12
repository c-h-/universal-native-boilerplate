import React, {
  PropTypes,
  Component,
} from 'react';
import {
  Text,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const Linkable = (Inner) => {
  class LinkableWrapped extends Component {
    static propTypes = {
      to: PropTypes.any,
      href: PropTypes.string,
    };
    static contextTypes = {
      dispatch: PropTypes.func.isRequired,
      getURIForAction: PropTypes.func.isRequired,
      getActionForPathAndParams: PropTypes.func.isRequired,
    };
    onClick = (e) => {
      const action = this.getAction();
      if (!isModifiedEvent(e) && action) {
        this.context.dispatch(action);
        e.preventDefault();
      }
    };
    getAction = () => {
      const {
        to,
        href,
      } = this.props;
      if (typeof to === 'string') {
        return NavigationActions.navigate({
          routeName: to,
        });
      }
      else if (typeof to === 'object' && typeof to.type === 'string') {
        return to;
      }
      else if (href) {
        const match = href.match(/^\/(.*)/);
        if (match) {
          const path = match[1];
          const action = this.context.getActionForPathAndParams(path);
          return action;
        }
        return null;
      }
      return null;
    }
    getURL() {
      const action = this.getAction();
      if (!action) {
        return '#';
      }
      return this.context.getURIForAction(action);
    }
    render() {
      return (
        <Inner
          href={this.getURL()}
          onClick={this.onClick}
          {...this.props}
        />
      );
    }
  }
  return LinkableWrapped;
};

const Link = Linkable(props => <Text {...props} />);

Link.Linkable = Linkable;

export default Link;
