import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ripple from '../ripple';
import Icon from '../icon';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';

/**
 * A component to render an icon button.
 *
 * @class
 * @extends PureComponent
 */
export class IconButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onMouseDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    style: {},
    className: '',
    onPress: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onTouchStart: () => {},
    onMouseDown: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static keyCodes = [13, 32];

  state = { isFocused: false };

  keyDown = false;

  /**
   * Handle the keyDown event.
   * Check if the button is either the space bar or the enter key.
   *
   * @private
   */
  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (IconButton.keyCodes.includes(ev.keyCode) && !this.keyDown) {
      this.keyDown = true;

      this.props.onPress();
    }
  };

  /**
   * Reset the keyDown property to false.
   *
   * @private
   */
  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  /**
   * Call the onPress function.
   *
   * @private
   */
  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    this.props.onPress();
  };

  /**
   * Call the onPress function.
   *
   * @private
   */
  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.props.onPress();
  };

  /**
   * Set the isFocused state to true.
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
    const { disabled } = this.props;

    return (
      <span
        {...getNotDeclaredProps(this, IconButton)}
        role="button"
        className={`${this.props.classes.iconButton} ${this.props.className}`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onTouchStart={this.handleTouchStart}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          round
          center
          className="icon-button--ripple"
          color={this.context.theme.icon.color}
          focusColor={this.context.theme.icon.color}
          focusOpacity={0.12}
          nowaves={this.props.noink}
          isFocused={this.state.isFocused}
        />

        <Icon
          className={this.props.classes.icon}
          icon={this.props.icon}
          disabled={disabled}
        />
      </span>
    );
  }
}

const styles = {
  iconButton: {
    composes: 'icon-button',
    position: 'relative',
    backgroundColor: 'inherit',
    borderRadius: '50%',
    outline: 0,
    border: 0,
    height: props => props.theme.size,
    width: props => props.theme.size,
    margin: props => props.theme.margin,
    pointerEvents: props => props.disabled && 'none',
    padding: props => (props.theme.size - props.theme.iconSize) / 2,
  },

  icon: {
    composes: 'icon-button--icon',
    display: 'inline-flex',
    fontSize: props => props.theme.iconSize,
  },
};

export default connectWithTheme(injectSheet(styles)(IconButton), 'iconButton');
