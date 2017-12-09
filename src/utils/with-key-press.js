import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import getDisplayName from 'react-display-name';
import hoistNonReactStatic from 'hoist-non-react-statics';

import getNotDeclaredProps from '../get-not-declared-props';

/**
 * Create a new Higher Order Component for key press utilities.
 *
 * @param {Object} options - Options for the Higher Order Component.
 * @param {Number[]} [options.keyCodes] - The key codes to only call the function.
 * @returns {Function} - Returns a function which takes the component to wrap.
 */
export default function withKeyPress({ keyCodes = null } = {}) {
  return (WrappedComponent) => {
    /**
     * The Higher Order Component for key press utilities.
     *
     * @class
     */
    class KeyEventHandler extends PureComponent {
      static displayName = `WithKeyPress(${getDisplayName(WrappedComponent)})`;

      static propTypes = {
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
      };

      static defaultProps = {
        onKeyDown: noop,
        onKeyUp: noop,
      };

      isFirstKeyPress = true;

      /**
       * Create a key down event handler.
       *
       * @param {Function} func - The function to call for the key press.
       * @returns {Function} - Returns the key down handler.
       */
      createKeyDownHandler = func => (ev) => {
        this.props.onKeyDown(ev);

        if (this.isFirstKeyPress) {
          this.isFirstKeyPress = false;

          if (keyCodes && !keyCodes.includes(ev.keyCode)) {
            return;
          }

          func(ev);
        }
      };

      /**
       * Call the onKeyUp prop and reset the isFirstKeyPress property.
       */
      handleKeyUp = (ev) => {
        this.props.onKeyUp(ev);

        this.isFirstKeyPress = true;
      };

      render() {
        return (
          <WrappedComponent
            {...getNotDeclaredProps(this.props, KeyEventHandler)}
            createKeyDownHandler={this.createKeyDownHandler}
            onKeyUp={this.handleKeyUp}
          />
        );
      }
    }

    hoistNonReactStatic(KeyEventHandler, WrappedComponent);

    return KeyEventHandler;
  };
}
