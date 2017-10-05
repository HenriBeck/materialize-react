import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import warning from 'warning';

import Ripple from '../ripple';
import Icon from '../icon';
import getNotDeclaredProps from '../../get-not-declared-props';
import EventHandler from '../event-handler';

/**
 * A component to render an icon button.
 *
 * @class
 * @extends PureComponent
 */
export class IconButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      iconButton: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    className: '',
    onPress: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static keyCodes = [13, 32];

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    return {
      iconButton: {
        composes: 'icon-button',
        position: 'relative',
        borderRadius: '50%',
        boxSizing: 'border-box',
        display: 'inline-block',
        outline: 0,
        border: 0,
        height: 48,
        width: 48,
        margin: 4,
        padding: 12,

        '&[aria-disabled=true]': { pointerEvents: 'none' },
      },

      icon: {
        composes: 'icon-button--icon',
        fontSize: 24,
      },

      ripple: {
        composes: 'icon-button--ripple',
        color: theme.iconColor,
      },
    };
  }

  state = { isFocused: false };

  /**
   * Warn against changing the icon prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.icon === this.props.icon,
      'You should not change the icon prop of a IconButton',
    );
  }

  /**
   * Handle the keyDown event.
   * Check if the button is either the space bar or the enter key.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (IconButton.keyCodes.includes(ev.keyCode)) {
      this.props.onPress();
    }
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
    const {
      disabled,
      classes,
      className,
      onPress,
      noink,
      icon,
      ...props
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(props, IconButton)}
        component="span"
        role="button"
        className={`${classes.iconButton} ${className}`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onPress={onPress}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          round
          center
          className="icon-button--ripple"
          focusOpacity={0.12}
          nowaves={noink}
          isFocused={this.state.isFocused}
        />

        <Icon
          className={classes.icon}
          icon={icon}
          disabled={disabled}
        />
      </EventHandler>
    );
  }
}

export default injectSheet(IconButton.styles)(IconButton);
