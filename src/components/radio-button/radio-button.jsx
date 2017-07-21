import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';
import injectSheet from 'react-jss';

import Ripple from '../ripple';
import EventHandler from '../event-handler';
import Label from '../label';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component to render a RadioButton.
 *
 * @class
 */
export class RadioButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    labelPosition: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    labelPosition: 'right',
    className: '',
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.radioButton - The actual theme for the radio button component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles({ radioButton: theme }) {
    return {
      radioButton: {
        composes: 'radio-button',
        display: 'inline-flex',
        alignItems: 'center',
        padding: 4,

        '&.radio-button--label-left': { flexDirection: 'row-reverse' },

        '&[aria-checked=true] $border': { borderColor: theme.checkedColor },

        '&[aria-checked=true] $circle': { transform: 'scale(0.5)' },

        '&[aria-disabled=true]': { pointerEvents: 'none' },

        '&[aria-disabled=true] $border': { borderColor: theme.disabledColor },

        '&[aria-disabled=true] $circle': { backgroundColor: theme.disabledColor },
      },

      container: {
        composes: 'radio-button--container',
        position: 'relative',
        borderRadius: '50%',
        boxSizing: 'border-box',
        margin: (theme.rippleSize - theme.size) / 2,
        height: theme.size,
        width: theme.size,
      },

      border: {
        composes: 'radio-button--border',
        position: 'absolute',
        borderRadius: '50%',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        transitionProperty: 'border-color',
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: theme.borderWidth,
        borderColor: theme.uncheckedColor,
        transitionDuration: theme.transitionDuration,
      },

      circle: {
        composes: 'radio-button--circle',
        position: 'absolute',
        transform: 'scale(0)',
        borderRadius: '50%',
        transitionProperty: 'transform',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transitionDuration: theme.transitionDuration,
        backgroundColor: theme.checkedColor,
      },

      label: {
        composes: 'radio-button--label',
        padding: 4,
      },

      ripple: {
        composes: 'radio-button--ripple',
        zIndex: 1,
        top: (theme.rippleSize - theme.size) / -2,
        left: (theme.rippleSize - theme.size) / -2,
        right: (theme.rippleSize - theme.size) / -2,
        bottom: (theme.rippleSize - theme.size) / -2,
      },
    };
  }

  id = randomstring.generate();

  render() {
    const {
      classes,
      checked,
      disabled,
      children,
      isFocused,
      onPress,
      noink,
      className,
      labelPosition,
      ...props
    } = this.props;
    const labelClass = labelPosition === 'left' && 'radio-button--label-left';

    return (
      <EventHandler
        {...getNotDeclaredProps(props, RadioButton)}
        component="span"
        role="radio"
        id={this.id}
        className={`${className} ${classes.radioButton} ${labelClass}`}
        aria-checked={checked}
        aria-disabled={disabled}
        onPress={onPress}
      >
        <span className={classes.container}>
          <Ripple
            round
            center
            isFocused={isFocused}
            nowaves={noink}
            className={classes.ripple}
          />

          <span className={classes.border} />

          <span className={classes.circle} />
        </span>

        <Label
          htmlFor={this.id}
          disabled={disabled}
          className={classes.label}
        >
          {children}
        </Label>
      </EventHandler>
    );
  }
}

export default injectSheet(RadioButton.styles)(RadioButton);
