import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import getDisplayName from 'react-display-name';
import hoistNonReactStatic from 'hoist-non-react-statics';

import getNotDeclaredProps from '../get-not-declared-props';

/**
 * Create a utility Higher Order Component for focus handling.
 *
 * @param {Function} WrappedComponent - The component to wrap.
 * @returns {Function} - Returns the wrapped component.
 */
export default function withFocusedState(WrappedComponent) {
  /**
   * The Higher Order Component for focus events.
   *
   * @class
   */
  class FocusHandler extends PureComponent {
    static displayName = `WithFocusedState(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
    };

    static defaultProps = {
      onFocus: noop,
      onBlur: noop,
    };

    state = { isFocused: false };

    /**
     * Change the isFocused state.
     */
    handleFocus = (ev) => {
      this.props.onFocus(ev);

      this.setState({ isFocused: true });
    };

    /**
     * Change the isFocused state.
     */
    handleBlur = (ev) => {
      this.props.onBlur(ev);

      this.setState({ isFocused: false });
    };

    render() {
      return (
        <WrappedComponent
          {...getNotDeclaredProps(this.props, FocusHandler)}
          isFocused={this.state.isFocused}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      );
    }
  }

  hoistNonReactStatic(FocusHandler, WrappedComponent);

  return FocusHandler;
}
