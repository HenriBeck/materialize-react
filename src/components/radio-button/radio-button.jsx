import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';

import Ripple from '../ripple';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Render a radio button and connect it to the RadioButtonGroup.
 *
 * @class
 */
export class RadioButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      radioButton: PropTypes.string.isRequired,
      border: PropTypes.string.isRequired,
      circle: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    className: '',
    onFocus: noop,
    onBlur: noop,
  };

  static contextTypes = {
    radioButtonGroup: PropTypes.shape({
      selected: PropTypes.shape({}).isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * The styles for the radio button component.
   *
   * @param {Object} theme - The theme supplied by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';

    return {
      radioButton: {
        composes: 'radio-button',
        position: 'relative',
        boxSizing: 'border-box',
        margin: '20px 24px',
        height: 16,
        width: 16,

        '&:focus': { outline: 0 },

        '&[aria-checked=true] $border': { borderColor: theme.primaryBase },

        '&[aria-checked=true] $circle': { transform: 'scale(0.5)' },

        '&[aria-disabled=true]': { pointerEvents: 'none' },

        '&[aria-disabled=true] $border': { borderColor: theme.disabledColor },

        '&[aria-disabled=true] $circle': { backgroundColor: theme.disabledColor },
      },

      border: {
        composes: 'radio-button--border',
        position: 'absolute',
        borderRadius: '50%',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
        transition: 'border-color 200ms',
      },

      circle: {
        composes: 'radio-button--circle',
        position: 'absolute',
        transform: 'scale(0)',
        borderRadius: '50%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'transform 200ms',
        backgroundColor: theme.primaryBase,
      },

      ripple: {
        composes: 'radio-button--ripple',
        top: -16,
        left: -16,
        right: -16,
        bottom: -16,
      },
    };
  }

  static changeOnKeyCodes = [13, 32];

  state = {
    selected: false,
    isFocused: false,
  };

  /**
   * Initially set the state and subscribe to changes.
   */
  componentWillMount() {
    this.updateState(this.context.radioButtonGroup.selected.getState());

    this.subId = this.context.radioButtonGroup.selected.subscribe(this.updateState);
  }

  /**
   * Unsubscribe to the changes.
   */
  componentWillUnmount() {
    this.context.radioButtonGroup.selected.unsubscribe(this.subId);
  }

  /**
   * Update the selected state.
   *
   * @private
   * @param {String} selected - The selected radio button name.
   */
  updateState = (selected) => {
    this.setState({ selected });
  };

  /**
   * Call the onChange context supplied by the RadioButtonGroup.
   *
   * @private
   */
  handlePress = () => {
    this.context.radioButtonGroup.onChange(this.props.name);
  };

  /**
   * Change the isFocused state to true when the button receives focus.
   *
   * @private
   */
  handleFocus = () => {
    this.props.onFocus();

    this.setState({ isFocused: true });
  };

  /**
   * Change the isFocused state to false when the button looses focus.
   *
   * @private
   */
  handleBlur = () => {
    this.props.onBlur();

    this.setState({ isFocused: false });
  };

  /**
   * Call the onChange context when a key with a special key code is pressed.
   */
  handleKeyPress = (ev) => {
    if (RadioButton.changeOnKeyCodes.includes(ev.keyCode)) {
      this.context.radioButtonGroup.onChange(this.props.name);
    }
  };

  render() {
    const {
      disabled,
      className,
      noink,
      name,
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(this.props, RadioButton)}
        component="span"
        role="radio"
        tabIndex={disabled ? -1 : 0}
        className={`${className} ${this.props.classes.radioButton}`}
        aria-checked={this.state.selected === name}
        aria-disabled={disabled}
        onPress={this.handlePress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
      >
        <span className={this.props.classes.border} />

        <span className={this.props.classes.circle} />

        <Ripple
          round
          center
          isFocused={this.state.isFocused}
          nowaves={noink}
          className={this.props.classes.ripple}
        />
      </EventHandler>
    );
  }
}

export default injectSheet(RadioButton.styles)(RadioButton);
