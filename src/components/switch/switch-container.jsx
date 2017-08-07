import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import Switch from './switch';
import getNotDeclaredProps from '../../get-not-declared-props';
import warning from 'warning';

/**
 * A component to render a switch component.
 *
 * @class
 */
export default class SwitchContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultToggled: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    labelPosition: PropTypes.string,
    noink: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    defaultToggled: false,
    className: '',
    labelPosition: 'right',
    disabled: false,
    noink: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static keyCodes = [13, 32];

  state = {
    isFocused: false,
    toggled: this.props.defaultToggled,
  };

  /**
   * Warn against changing the defaultToggled and the name prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.name === this.props.name,
      'You should not change the name prop of the Switch',
    );

    warning(
      nextProps.defaultToggled === this.props.defaultToggled,
      'You should not change the defaultToggled prop of the Switch',
    );
  }

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

  /**
   * Change the isFocused state to true.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * Set the isFocused state to false.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  render() {
    const {
      disabled,
      className,
      noink,
      labelPosition,
      children,
      ...props
    } = this.props;

    return (
      <Switch
        {...getNotDeclaredProps(props, SwitchContainer)}
        id={this.id}
        toggled={this.state.toggled}
        isFocused={this.state.isFocused}
        disabled={disabled}
        className={className}
        noink={noink}
        labelPosition={labelPosition}
        onPress={this.handlePress}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {children}
      </Switch>
    );
  }
}
