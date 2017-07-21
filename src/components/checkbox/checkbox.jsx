import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import { easeInOutCubic } from '../../styles/timings';
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
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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
  static styles({ checkbox: theme }) {
    const { disabledCheckedBgColor } = theme;

    return {
      checkbox: {
        composes: 'checkbox',
        boxSizing: 'border-box',
        outline: 'none',
        border: 0,
        backgroundColor: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        padding: theme.padding,
        height: theme.rippleSize + (theme.padding * 2),

        '&[aria-disabled=false] $label': { cursor: 'pointer' },

        '&[aria-disabled=true]': {
          pointerEvents: 'none',

          '&[aria-checked=true] $checkboxContainer': { backgroundColor: disabledCheckedBgColor },
        },

        '&[aria-disabled=true] $checkboxContainer': {
          borderColor: theme.disabledBorderColor,
          backgroundColor: theme.disabledBgColor,
        },

        '&.checkbox--label-left': { flexDirection: 'row-reverse' },

        '&[aria-disabled=false][aria-checked=true] $checkboxContainer': {
          borderColor: theme.checkedBorderColor,
          backgroundColor: theme.checkedBgColor,
        },
      },

      container: {
        composes: 'checkbox--container',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        boxSizing: 'border-box',
        zIndex: 1,
        height: theme.rippleSize,
        width: theme.rippleSize,
      },

      label: { composes: 'checkbox--label' },

      checkboxContainer: {
        composes: 'checkbox--checkbox-container',
        display: 'inline-block',
        position: 'relative',
        borderStyle: 'solid',
        margin: (theme.rippleSize - theme.size) / 2,
        height: theme.size - theme.borderWidth * 2,
        width: theme.size - theme.borderWidth * 2,
        borderWidth: theme.borderWidth,
        borderRadius: theme.borderWidth,
        borderColor: theme.uncheckedBorderColor,
        backgroundColor: theme.uncheckedBgColor,
        transitionDuration: theme.animationDuration,
        transitionProperty: 'background-color, border-color',
      },

      checkmark: {
        composes: 'checkbox--checkmark',
        width: '36%',
        height: '70%',
        left: -1,
        position: 'absolute',
        border: `${8 / 3}px solid`,
        borderTop: 0,
        borderLeft: 0,
        transformOrigin: '97% 86%',
        boxSizing: 'content-box',
        willChange: 'opacity, transform',
        opacity: 0,
      },
    };
  }

  /**
   * Set the border color of the checkmark to the background-color from the root element.
   * If the checked props is initially true we want to animate the checkmark in.
   */
  componentDidMount() {
    const bgColor = window.getComputedStyle(this.root)['background-color'];

    this.checkmark.style.borderColor = bgColor;

    if (this.props.checked) {
      this.animateCheckmark();
    }
  }

  /**
   * Animate the checkmark when the checked prop changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.animateCheckmark();
    }
  }

  /**
   * Compute the color for the ripple and the focusColor based on the props.
   *
   * @returns {{ color: String, focusColor: String }} - Returns an object with the colors.
   */
  getRippleProps() {
    const {
      theme: { checkbox: theme },
      checked,
    } = this.props;

    return {
      color: checked ? theme.checkedBorderColor : theme.uncheckedBorderColor,
      focusColor: checked ? theme.checkedBorderColor : theme.uncheckedBorderColor,
    };
  }

  /**
   * Animate the checkmark either in or out.
   */
  animateCheckmark() {
    const animations = this.props.checked ? {
      opacity: [1, 1],
      transform: ['scale(0, 0) rotate(-45deg)', 'scale(1, 1) rotate(45deg)'],
    } : { opacity: [1, 0] };

    this.checkmark.animate(animations, {
      easing: easeInOutCubic,
      fill: 'forwards',
      duration: this.props.theme.checkbox.animationDuration,
    });
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
    } = this.props;

    const className = classnames(
      this.props.className,
      classes.checkbox,
      { 'checkbox--label-left': this.props.labelPosition === 'left' },
    );

    return (
      <EventHandler
        {...getNotDeclaredProps(this.props, Checkbox)}
        component="span"
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={checked}
        className={className}
        createRef={this.createRef}
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onPress={this.props.onPress}
      >
        <span className={classes.container}>
          <span
            className={classes.checkboxContainer}
            ref={(element) => { this.checkbox = element; }}
          >
            <span
              className={classes.checkmark}
              ref={(element) => { this.checkmark = element; }}
            />
          </span>

          <Ripple
            round
            center
            className={classes.ripple}
            isFocused={this.props.isFocused}
            {...this.getRippleProps()}
          />
        </span>

        <Label
          className={classes.label}
          htmlFor={this.props.id}
          disabled={disabled}
        >
          {this.props.children}
        </Label>
      </EventHandler>
    );
  }
}

export default injectSheet(Checkbox.styles)(Checkbox);
