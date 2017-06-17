import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import Checkbox from './checkbox';

/**
 * A component to render a checkbox.
 *
 * @class
 * @extends PureComponent
 */
export default class CheckboxContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
    onKeyUp: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {},
    className: '',
    children: '',
  };

  static keyCodes = [32];

  state = {
    checked: this.props.defaultChecked,
    isFocused: false,
  };

  id = randomstring.generate();
  isTouchEvent = false;
  isPressingKey = false;

  /**
   * Get the current checked state.
   *
   * @returns {Boolean} - Returns whether the checkbox is checked.
   */
  get checked() {
    return this.state.checked;
  }

  /**
   * Update the checked state only if a new state is passed.
   *
   * @param {Boolean} checked - The new checked state.
   */
  set checked(checked) {
    if (checked !== this.state.checked) {
      this.setState({ checked });
    }
  }

  /**
   * Toggle the checked state.
   */
  toggle() {
    this.setState(({ checked }) => {
      return { checked: !checked };
    }, () => this.props.onChange(this.props.name));
  }

  /**
   * Check if we should toggle the checkbox based on the keyCode and if it's the first key event.
   *
   * @private
   */
  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (!this.isPressingKey && CheckboxContainer.keyCodes.includes(ev.keyCode)) {
      this.isPressingKey = true;

      this.toggle();
    }
  };

  /**
   * Reset the isPressingKey attribute.
   *
   * @private
   */
  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.isPressingKey = false;
  };

  /**
   * Update the isFocused state to true when the elements receives focus.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * Update the isFocused state to false when the user removes the focus.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  /**
   * This will be called when the actual checkbox got clicked.
   * The mousedown event will also fire after a touch event.
   * We have to ignore the event because else wise we are toggling the checkbox
   * twice which results in quickly resetting the state.
   */
  handlePress = (ev) => {
    switch (ev.type) {
      case 'mousedown': {
        if (this.isTouchEvent) {
          this.isTouchEvent = false;

          return;
        }

        this.toggle();
        break;
      }
      case 'touchstart': {
        this.isTouchEvent = true;

        this.toggle();
        break;
      }
      default: break;
    }
  };

  render() {
    return (
      <Checkbox
        disabled={this.props.disabled}
        checked={this.state.checked}
        onPress={this.handlePress}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        id={this.id}
        className={this.props.className}
        isFocused={this.state.isFocused}
        {...getNotDeclaredProps(this, CheckboxContainer)}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}
