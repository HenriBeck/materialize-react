import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Ripple from '../ripple';
import getNotDeclaredProps from '../../get-not-declared-props';
import { pipe } from '../../utils/functions';
import withKeyPress from '../../utils/with-key-press';
import withFocusedState from '../../utils/with-focused-state';

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
    isFocused: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    className: '',
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
    const offColor = {
      light: 'rgba(0, 0, 0, 0.54)',
      dark: 'rgba(255, 255, 255, 0.7)',
    };

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
        borderColor: offColor[theme.type],
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

  state = { selected: false };

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

  handlePress = () => this.context.radioButtonGroup.onChange(this.props.name);

  handleKeyDown = this.props.createKeyDownHandler(this.handlePress);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, RadioButton)}
        role="radio"
        tabIndex={this.props.disabled ? -1 : 0}
        className={`${this.props.classes.radioButton} ${this.props.className}`}
        aria-checked={this.state.selected === this.props.name}
        aria-disabled={this.props.disabled}
        onClick={this.handlePress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
      >
        <span className={this.props.classes.border} />

        <span className={this.props.classes.circle} />

        <Ripple
          round
          center
          isFocused={this.props.isFocused}
          nowaves={this.props.noink}
          className={this.props.classes.ripple}
        />
      </span>
    );
  }
}

export default pipe(
  injectSheet(RadioButton.styles),
  withFocusedState,
  withKeyPress({ keyCodes: RadioButton.changeOnKeyCodes }),
)(RadioButton);
