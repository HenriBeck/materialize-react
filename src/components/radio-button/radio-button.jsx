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
    classes: PropTypes.shape({
      radioButton: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      border: PropTypes.string.isRequired,
      circle: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
      labelLeft: PropTypes.string.isRequired,
    }).isRequired,
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
  static styles(theme) {
    const isDark = theme.type === 'dark';

    return {
      radioButton: {
        composes: 'radio-button',
        display: 'inline-flex',
        alignItems: 'center',
        padding: 4,

        '&[aria-checked=true] $border': { borderColor: theme.primaryBase },

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
        margin: '16px 24px ',
        height: 16,
        width: 16,
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

      label: {
        composes: 'radio-button--label',
        padding: 4,
      },

      ripple: {
        composes: 'radio-button--ripple',
        top: -16,
        left: -16,
        right: -16,
        bottom: -16,
      },

      labelLeft: {
        composes: 'radio-button--label-left',
        flexDirection: 'row-reverse',
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
    const labelClass = labelPosition === 'left' && classes.labelLeft;

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
          <span className={classes.border} />

          <span className={classes.circle} />

          <Ripple
            round
            center
            isFocused={isFocused}
            nowaves={noink}
            className={classes.ripple}
          />
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
