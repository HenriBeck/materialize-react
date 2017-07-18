import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import injectSheet from '../../styles/jss';
import warning from '../../utils/warning';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import getNotDeclaredProps from '../../get-not-declared-props';
import Ripple from '../ripple';
import { button as buttonTypo } from '../../styles/typography';
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
   * We should warn against changing the raised prop
   * because a button should be either raised or not raised from the beginning.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.raised !== this.props.raised,
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
    } = this.props;
    const classNames = classnames(classes.button, className, this.props.raised && 'button--raised');
    const events = { onPress: this.props.raised ? this.handlePress : this.props.onPress };

    if (this.props.raised) {
      events.onRelease = this.handleRelease;
    }

    return (
      <EventHandler
        component="span"
        {...getNotDeclaredProps(this.props, Button)}
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
          nowaves={this.props.noink}
          {...this.rippleProps}
        />

        {this.props.children}
      </EventHandler>
    );
  }
}

const styles = {
  button: {
    ...buttonTypo,
    composes: 'button',
    userSelect: 'none',
    display: 'inline-block',
    position: 'relative',
    zIndex: 0,
    boxSizing: 'border-box',
    textTransform: 'uppercase',
    textAlign: 'center',
    outline: 0,
    border: 0,
    borderRadius: 2,
    margin: '0 8px',
    cursor: 'pointer',
    height: props => props.theme.height,
    minWidth: props => props.theme.minWidth,
    color: props => props.theme.color,
    padding: props => `${(props.theme.height - buttonTypo.lineHeight) / 2}px 8px`,
    backgroundColor: props => props.theme.bgColor,

    '&[aria-disabled=true]': {
      cursor: 'auto',
      pointerEvents: 'none',
      color: props => props.theme.disabledColor,
      backgroundColor: props => props.theme.disabledBgColor,

      '&.button--raised': { backgroundColor: props => props.theme.raisedAndDisabledBgColor },
    },

    '&.button--raised': {
      backgroundColor: props => props.theme.raisedBgColor,

      '&[aria-disabled=false]': {
        boxShadow: props => elevation(props.theme.elevation),

        '&:hover': { boxShadow: props => elevation(props.theme.pressedElevation) },
      },

      '&[aria-pressed=true]': { boxShadow: props => elevation(props.theme.pressedElevation) },
    },
  },
};

export default connectWithTheme(injectSheet(styles)(Button), 'button');
