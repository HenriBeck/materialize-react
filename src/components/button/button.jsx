import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import warning from 'warning';
import getNotDeclaredProps from '../../get-not-declared-props';
import Ripple from '../ripple';
import { button as buttonTypo } from '../../styles/typography';
import elevation from '../../styles/elevation';
import EventHandler from '../event-handler';

/**
 * A material design button.
 *
 * @class
 * @extends PureComponent
 */
export class Button extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string.isRequired,
      buttonRaised: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
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
    color: '#999999',
    initialOpacity: 0.4,
  };

  static raisedRippleProps = {
    focusColor: '#000000',
    focusOpacity: 0.12,
  };

  static keyCodes = [13, 32];

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.button - The actual theme for the button component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles({ button: theme }) {
    return {
      button: {
        ...buttonTypo,
        composes: 'button',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        textTransform: 'uppercase',
        textAlign: 'center',
        outline: 0,
        border: 0,
        borderRadius: 2,
        margin: '0 8px',
        cursor: 'pointer',
        height: theme.height,
        minWidth: theme.minWidth,
        color: theme.color,
        padding: theme.padding,
        backgroundColor: theme.bgColor,

        '&[aria-disabled=true]': {
          cursor: 'auto',
          pointerEvents: 'none',
          color: theme.disabledColor,
          backgroundColor: theme.disabledBgColor,
        },
      },

      buttonRaised: {
        composes: 'button--raised',
        backgroundColor: theme.raisedBgColor,

        '&[aria-disabled=true]': { backgroundColor: theme.raisedAndDisabledBgColor },

        '&[aria-disabled=false]': {
          boxShadow: elevation(theme.elevation),

          '&:hover': { boxShadow: elevation(theme.pressedElevation) },
        },

        '&[aria-pressed=true]': { boxShadow: elevation(theme.pressedElevation) },
      },
    };
  }

  state = {
    pressed: false,
    isFocused: false,
  };

  /**
   * We should warn against changing the raised prop
   * because a button should be either raised or not raised from the beginning.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.raised === this.props.raised,
      'You should not change the raised prop of a button!',
    );
  }

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
      className,
      children,
      noink,
      raised,
      onPress,
      ...props
    } = this.props;
    const classNames = classnames(classes.button, className, raised && classes.buttonRaised);
    const events = { onPress: raised ? this.handlePress : onPress };

    if (raised) {
      events.onRelease = this.handleRelease;
    }

    return (
      <EventHandler
        component="span"
        {...getNotDeclaredProps(props, Button)}
        role="button"
        className={classNames}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-pressed={this.state.pressed && !disabled}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...events}
      >
        <Ripple
          className="button--ripple"
          isFocused={this.state.isFocused}
          nowaves={noink}
          {...this.rippleProps}
        />

        {children}
      </EventHandler>
    );
  }
}

export default injectSheet(Button.styles)(Button);
