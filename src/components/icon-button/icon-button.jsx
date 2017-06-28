import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ripple from '../ripple';
import Icon from '../icon';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import EventHandler from '../event-handler';

/**
 * A component to render an icon button.
 *
 * @class
 * @extends PureComponent
 */
export class IconButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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

  state = { isFocused: false };

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
      theme,
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(this.props, IconButton)}
        component="span"
        role="button"
        className={`${classes.iconButton} ${this.props.className}`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onPress={this.props.onPress}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          round
          center
          className="icon-button--ripple"
          color={theme.rippleColor}
          focusColor={theme.rippleColor}
          focusOpacity={0.12}
          nowaves={this.props.noink}
          isFocused={this.state.isFocused}
        />

        <Icon
          className={classes.icon}
          icon={this.props.icon}
          disabled={disabled}
        />
      </EventHandler>
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
    padding: props => (props.theme.size - props.theme.iconSize) / 2,

    '&[aria-disabled=true]': { pointerEvents: 'none' },
  },

  icon: {
    composes: 'icon-button--icon',
    display: 'inline-flex',
    fontSize: props => props.theme.iconSize,
  },
};

export default connectWithTheme(injectSheet(styles)(IconButton), 'iconButton');
