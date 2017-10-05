import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import Label from '../label';
import Ripple from '../ripple';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The actual visual component of the checkbox.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Checkbox extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      checkbox: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      checkboxContainer: PropTypes.string.isRequired,
      checkmark: PropTypes.string.isRequired,
      labelLeft: PropTypes.string.isRequired,
    }).isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    labelPosition: PropTypes.string.isRequired,
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.checkbox - The actual theme for the checkbox component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';
    const disabledColor = isDark ? '#717171' : '#b0b0b0';

    return {
      '@keyframes checkbox--animate-in': {
        from: {
          opacity: 1,
          transform: 'scale(0) rotate(-45deg)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1) rotate(45deg)',
        },
      },

      '@keyframes checkbox--animate-out': {
        from: {
          opacity: 1,
          transform: 'scale(1) rotate(45deg)',
        },
        to: {
          opacity: 0,
          transform: 'scale(1) rotate(45deg)',
        },
      },

      checkbox: {
        composes: 'checkbox',
        boxSizing: 'border-box',
        outline: 'none',
        border: 0,
        backgroundColor: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        padding: 8,
        height: 48,

        '&[aria-disabled=false] $label': { cursor: 'pointer' },

        '&[aria-disabled=true]': {
          pointerEvents: 'none',

          '&[aria-checked=true] $checkboxContainer': { backgroundColor: disabledColor },
        },

        '&[aria-disabled=true] $checkboxContainer': {
          borderColor: disabledColor,
          backgroundColor: disabledColor,
        },

        '&[aria-disabled=false][aria-checked=true] $checkboxContainer': {
          borderColor: theme.primaryBase,
          backgroundColor: theme.primaryBase,
        },

        '&[aria-checked=true] $ripple': { color: theme.primaryBase },
      },

      container: {
        composes: 'checkbox--container',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        boxSizing: 'border-box',
        height: 48,
        width: 48,
      },

      label: { composes: 'checkbox--label' },

      ripple: {
        composes: 'checkbox--ripple',
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
      },

      checkboxContainer: {
        composes: 'checkbox--checkbox-container',
        display: 'inline-block',
        position: 'relative',
        border: 'solid 2px',
        boxSizing: 'border-box',
        margin: 15,
        height: 18,
        width: 18,
        borderRadius: 2,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
        transition: 'background-color, border-color, 160ms',
      },

      checkmark: {
        composes: 'checkbox--checkmark',
        width: '36%',
        height: '70%',
        position: 'absolute',
        border: '2.4px solid',
        left: -0.5,
        borderTop: 0,
        borderLeft: 0,
        transformOrigin: '97% 86%',
        willChange: 'opacity, transform',
        opacity: 0,
        boxSizing: 'content-box',
        animationDuration: 160,
        animationFillMode: 'forwards',
      },

      labelLeft: {
        composes: 'checkbox--label-left',
        flexDirection: 'row-reverse',
      },
    };
  }

  /**
   * Set the border color of the checkmark to the background-color from the root element.
   * If the checked props is initially true we want to animate the checkmark in.
   */
  componentDidMount() {
    this.setBgColor();
  }

  /**
   * Animate the checkmark bg color when the component prop changes.
   */
  componentDidUpdate() {
    this.setBgColor();
  }

  /**
   * Set the bg color for the checkmark.
   */
  setBgColor() {
    const bgColor = window.getComputedStyle(this.root)['background-color'];

    this.checkmark.style.borderColor = bgColor;
  }

  /**
   * A function which will be called with the element from EventHandler.
   *
   * @param {Object} element - The root element from EventHandler.
   */
  createRef = (element) => {
    this.root = element;
  };

  render() {
    const {
      disabled,
      classes,
      checked,
      isFocused,
      children,
      id,
      className,
      labelPosition,
      onKeyPress,
      onPress,
      onBlur,
      onFocus,
      ...props
    } = this.props;

    const classNames = classnames(
      className,
      classes.checkbox,
      labelPosition === 'left' && classes.labelLeft,
    );

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Checkbox)}
        component="span"
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={checked}
        className={classNames}
        createRef={this.createRef}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        onPress={onPress}
      >
        <span className={classes.container}>
          <span
            className={classes.checkboxContainer}
            ref={(element) => { this.checkbox = element; }}
          >
            <span
              className={classes.checkmark}
              style={{ animationName: `checkbox--animate-${checked ? 'in' : 'out'}` }}
              ref={(element) => { this.checkmark = element; }}
            />
          </span>

          <Ripple
            round
            center
            className={classes.ripple}
            isFocused={isFocused}
          />
        </span>

        <Label
          className={classes.label}
          htmlFor={id}
          disabled={disabled}
        >
          {children}
        </Label>
      </EventHandler>
    );
  }
}

export default injectSheet(Checkbox.styles)(Checkbox);
