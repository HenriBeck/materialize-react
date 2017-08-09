import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import getNotDeclaredProps from '../../get-not-declared-props';
import Checkbox from './checkbox';
import warning from 'warning';

/**
 * A component to render a checkbox.
 *
 * @class
 * @extends PureComponent
 */
export default class CheckboxContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    labelPosition: PropTypes.string,
  };

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    className: '',
    labelPosition: 'right',
  };

  static keyCodes = [32];

  state = {
    checked: this.props.defaultChecked,
    isFocused: false,
  };

  /**
   * Warn against changing the name and the defaultChecked prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.name === this.props.name,
      'You should not change the name of a checkbox',
    );

    warning(
      nextProps.defaultChecked === this.props.defaultChecked,
      'Changing the defaultChecked prop has no effect on the component',
    );
  }

  id = randomstring.generate();

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
  handleKeyPress = (ev) => {
    if (CheckboxContainer.keyCodes.includes(ev.keyCode)) {
      this.toggle();
    }
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
  handlePress = () => {
    this.toggle();
  };

  render() {
    const {
      disabled,
      className,
      labelPosition,
      children,
      ...props
    } = this.props;

    return (
      <Checkbox
        {...getNotDeclaredProps(props, CheckboxContainer)}
        disabled={disabled}
        checked={this.state.checked}
        id={this.id}
        className={className}
        isFocused={this.state.isFocused}
        labelPosition={labelPosition}
        onPress={this.handlePress}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {children}
      </Checkbox>
    );
  }
}
