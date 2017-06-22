import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import Switch from './switch';

/**
 * A component to render a switch component.
 *
 * @class
 */
export default class SwitchContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    defaultToggled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultToggled: false,
    onChange: () => {},
  };

  static keyCodes = [13, 32];

  state = {
    isFocused: false,
    toggled: this.props.defaultToggled,
  };

  id = randomstring.generate();

  /**
   * Get the current toggled state.
   *
   * @returns {Boolean} - Returns the toggled state.
   */
  get toggled() {
    return this.state.toggled;
  }

  /**
   * Set the current toggled state.
   *
   * @param {Boolean} toggled - The new state.
   */
  set toggled(toggled) {
    if (toggled !== this.state.toggled) {
      this.setState({ toggled });
    }
  }

  /**
   * Toggle the current state and call the onChange prop.
   *
   * @private
   */
  toggle() {
    this.setState(({ toggled }) => {
      return { toggled: !toggled };
    }, () => this.props.onChange(this.props.name, this.state.toggled));
  }

  /**
   * Toggle the state upon a press.
   *
   * @private
   */
  handlePress = () => {
    this.toggle();
  };

  /**
   * Check if the user pressed a key where we should toggle the state.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (SwitchContainer.keyCodes.includes(ev.keyCode)) {
      this.toggle();
    }
  };

  render() {
    return (
      <Switch
        id={this.id}
        toggled={this.state.toggled}
        onPress={this.handlePress}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}
