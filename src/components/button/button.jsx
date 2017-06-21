import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import injectSheet from '../../styles/jss';

import connectWithTheme from '../../styles/theme/connect-with-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import Ripple from '../ripple';
import typo from '../../styles/plugins/typo';
import elevation from '../../styles/plugins/elevation';
import EventHandler from '../event-handler';

/**
 * A material design button.
 *
 * @class
 * @extends PureComponent
 */
export class Button extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    disabled: false,
    raised: false,
    noink: false,
    className: '',
    onPress: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static normalRippleProps = {
    color: '#cccccc',
    initialOpacity: 0.25,
  };

  static raisedRippleProps = {
    focusColor: '#000000',
    focusOpacity: 0.12,
  };

  static keyCodes = [13, 32];

  state = {
    pressed: false,
    isFocused: false,
  };

  /**
   * Get the ripple props based on the props the user passed.
   *
   * @private
   * @returns {Object} - Returns the props.
   */
  get rippleProps() {
    return this.props.raised ? Button.raisedRippleProps : Button.normalRippleProps;
  }

  /**
   * Call the onPress handler and set the pressed state to true.
   *
   * @private
   */
  handlePress = () => {
    this.setState({ pressed: true });

    this.props.onPress();
  };

  /**
   * Toggle the pressed state when the user releases the button.
   *
   * @private
   */
  handleRelease = () => {
    this.setState({ pressed: false });
  };

  /**
   * Check if the user pressed a key that where we should emit an action.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (Button.keyCodes.includes(ev.keyCode)) {
      this.props.onPress();
    }
  };

  /**
   * When the button get's focused, we tell the ripple to visibly indicate that.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * When the button loses focus we want to remove the visible focus from the button.
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
    } = this.props;
    const className = classNames(
      classes.button,
      this.props.className,
      { [classes.buttonPressed]: this.state.pressed && !this.props.disabled },
    );
    const events = { onPress: this.props.raised ? this.handlePress : this.props.onPress };

    if (this.props.raised) {
      events.onRelease = this.handleRelease;
    }

    return (
      <EventHandler
        component="span"
        {...getNotDeclaredProps(this, Button)}
        role="button"
        className={className}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onKeyPress={this.handleKeyPress}
        onPress={this.handlePress}
        onRelease={this.handleRelease}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          className="button--ripple"
          isFocused={this.state.isFocused}
          nowaves={this.props.noink}
          {...this.rippleProps}
        />

        {this.props.children}
      </EventHandler>
    );
  }
}

const buttonTypo = typo('button');

const styles = {
  button: {
    ...buttonTypo,
    composes: 'button',
    userSelect: 'none',
    display: 'inline-block',
    position: 'relative',
    zIndex: 0,
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    borderRadius: 2,
    margin: '0 8px',
    cursor: props => (props.disabled ? 'auto' : 'pointer'),
    height: props => props.theme.height,
    minWidth: props => props.theme.minWidth,
    color: props => (props.disabled ? props.theme.disabledColor : props.theme.color),
    pointerEvents: props => (props.disabled ? 'none' : 'auto'),
    padding: props => `${(props.theme.height - buttonTypo.lineHeight) / 2}px 8px`,
    boxShadow(props) {
      return props.raised && !props.disabled ? elevation(props.theme.elevation) : 'none';
    },
    backgroundColor(props) {
      if (props.disabled) {
        return props.raised ? props.theme.raisedAndDisabledBgColor : props.theme.disabledBgColor;
      }

      return props.raised ? props.theme.raisedBgColor : props.theme.bgColor;
    },

    '&:hover': {
      boxShadow(props) {
        return props.raised && !props.disabled ? elevation(props.theme.pressedElevation) : 'none';
      },
    },
  },

  buttonPressed: { boxShadow: props => elevation(props.theme.pressedElevation) },
};

export default connectWithTheme(injectSheet(styles)(Button), 'button');
